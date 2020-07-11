// @ts-nocheck
import fetch from 'node-fetch'
import useSWR from 'swr'
import { NextSeo } from 'next-seo'
import fetcher from '../../lib/fetcher'
import format from 'comma-number'
import { useRouter } from 'next/router'
import {
  Header,
  Heading as MyHeading,
  Footer,
  components,
  Bookmark,
  FallbackBlogPage,
} from '../../components'
import Iframe from 'react-iframe'
import ReactJSXParser from '@zeit/react-jsx-parser'
import { textBlock } from '../../lib/notion/renderers'
import getPageData from '../../lib/notion/getPageData'
import React, { CSSProperties, useEffect, useState } from 'react'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import { getBlogLink, getDateStr } from '../../lib/blog-helpers'
import { GetStaticProps } from 'next'

import { Text, Stack, Heading, Divider, Box, Flex } from '@chakra-ui/core'
import styled from '@emotion/styled'

const SmallMBox = styled(Box)`
  margin-bottom: 0.5rem;
`

const MediumMBox = styled(Box)`
  margin-bottom: 1rem;
`

interface Params {
  slug: string
}

// * Function to extract hostname
const extractHostname = url => {
  var hostname
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }

  //find & remove port number
  hostname = hostname.split(':')[0]
  //find & remove "?"
  hostname = hostname.split('?')[0]

  return hostname
}

// Get the data for each blog post
export const getStaticProps: GetStaticProps = async function({
  params: { slug },
  preview,
}: {
  params: Params
  preview: boolean
}) {
  // load the postsTable so that we can get the page's ID
  const postsTable = await getBlogIndex()
  let post

  //const post = postsTable[slug]
  Object.values(postsTable).forEach((o: any) => {
    if (o.Page.replace(/\s/g, '-') === slug) {
      post = o
    }
  })

  // if we can't find the post or if it is unpublished and
  // viewed without preview mode then we just redirect to /blog
  if (!post || (post.Published !== 'Yes' && !preview)) {
    console.log(`Failed to find post for slug: ${slug}`)
    return {
      props: {
        redirect: '/blog',
        preview: false,
      },
    }
  }
  const postData = await getPageData(post.id)
  post.content = postData.blocks

  for (let i = 0; i < postData?.blocks?.length; i++) {
    const { value } = postData.blocks[i]
    const { type, properties } = value
    if (type == 'tweet') {
      const src = properties.source[0][0]
      // parse id from https://twitter.com/_ijjk/status/TWEET_ID format
      const tweetId = src.split('/')[5].split('?')[0]
      if (!tweetId) continue

      try {
        console.log(
          `https://api.twitter.com/1/statuses/oembed.json?id=${tweetId}`
        )
        const res = await fetch(
          `https://api.twitter.com/1/statuses/oembed.json?id=${tweetId}`
        )
        const json = await res.json()
        properties.html = json.html.split('<script')[0]
        post.hasTweet = true
      } catch (_) {
        console.log(`Failed to get tweet embed for ${src}`)
      }
    }
  }

  const { users } = await getNotionUsers(post.Authors || [])
  post.Authors = Object.keys(users).map(id => users[id].full_name)

  return {
    props: {
      post,
      sourceProvider: null,
      error: null,
      preview: preview || false,
      slug,
    },
  }
}

// Return our list of blog posts to prerender
export async function getStaticPaths() {
  const postsTable = await getBlogIndex()
  // we fallback for any unpublished posts to save build time
  // for actually published ones
  return {
    paths: Object.keys(postsTable)
      .filter(post => postsTable[post].Published === 'Yes')
      .map(slug => getBlogLink(slug)),
    fallback: true,
  }
}

const listTypes = new Set(['bulleted_list', 'numbered_list'])

const RenderPost = ({
  post,
  redirect,
  preview,
  slug,
}: {
  post: any
  redirect: string
  preview: boolean
  slug: string
}) => {
  const router = useRouter()
  const [firstView, setFirstView] = useState(true)

  const title = post?.Page
  const description = post?.preview?.[0]?.[0]?.[0]
  const posturl =
    'https://andreasbigger.com/blogs/' + post?.Page.replace(/\s/g, '-')

  let listTagName: string | null = null
  let listLastId: string | null = null
  let listMap: {
    [id: string]: {
      key: string
      isNested?: boolean
      nested: string[]
      children: React.ReactFragment
    }
  } = {}

  let views

  if (firstView) {
    let { data } = useSWR(
      `/api/increment-views?id=${post?.Page.replace(/\s/g, '-')}`,
      fetcher
    )
    if (data) {
      setFirstView(false)
    }
    views = data?.total
  } else {
    const { data } = useSWR(
      `/api/page-views?id=${post?.Page.replace(/\s/g, '-')}`,
      fetcher
    )
    views = data?.total
  }

  useEffect(() => {
    const twitterSrc = 'https://platform.twitter.com/widgets.js'
    // make sure to initialize any new widgets loading on
    // client navigation
    if (post && post.hasTweet) {
      if ((window as any)?.twttr?.widgets) {
        ;(window as any).twttr.widgets.load()
      } else if (!document.querySelector(`script[src="${twitterSrc}"]`)) {
        const script = document.createElement('script')
        script.async = true
        script.src = twitterSrc
        script.style.marginLeft = 'auto'
        script.style.marginRight = 'auto'
        script.style.marginTop = '2rem'
        script.style.marginBottom = '2rem'
        document.querySelector('body').appendChild(script)
      }
    }
  }, [])
  useEffect(() => {
    if (redirect && !post) {
      router.replace(redirect)
    }
  }, [redirect, post])

  if (router.isFallback) {
    return (
      <FallbackBlogPage
        title={title}
        description={description}
        posturl={posturl}
      />
    )
  }

  if (!post) {
    return (
      <Box mx="auto" p="5px">
        <Text fontSize="md">
          Woops! didn't find that post, redirecting you back to the blog index
        </Text>
      </Box>
    )
  }

  return (
    <>
      <Header titlePre={post.Page} />
      <NextSeo
        title={title}
        description={description}
        canonical={posturl}
        openGraph={{
          url: posturl,
          title,
          description,
        }}
      />
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 0 auto"
        px={6}
        maxWidth="700px"
      >
        <Heading mb={2} m={2} as="h1" size="md">
          {post.Page || ''}
        </Heading>
        {post?.Authors?.length > 0 && (
          <SmallMBox m={2}>By: {post.Authors.join(' ')}</SmallMBox>
        )}
        {post.Date && (
          <SmallMBox m={2}>Posted: {getDateStr(post.Date)}</SmallMBox>
        )}
        <MediumMBox m={2} mb={4}>
          {views ? format(views) : '–––'} views
        </MediumMBox>

        {(!post.content || post?.content?.length === 0) && (
          <Text>This post has no content</Text>
        )}

        {(post.content || []).map((block, blockIdx) => {
          const { value } = block
          const { type, properties, id, parent_id } = value
          const isLast = blockIdx === post?.content?.length - 1
          const isList = listTypes.has(type)
          let toRender = []

          if (isList) {
            listTagName = components[type === 'bulleted_list' ? 'ul' : 'ol']
            listLastId = `list${id}`
            listMap[id] = {
              key: id,
              nested: [],
              children: textBlock(properties.title, true, id),
            }

            if (listMap[parent_id]) {
              listMap[id].isNested = true
              listMap[parent_id].nested.push(id)
            }
          }

          if (listTagName && (isLast || !isList)) {
            toRender.push(
              React.createElement(
                listTagName,
                { key: listLastId! },
                Object.keys(listMap).map(itemId => {
                  if (listMap[itemId].isNested) return null

                  const createEl = item =>
                    React.createElement(
                      components.li || 'ul',
                      { key: item.key },
                      item.children,
                      item?.nested?.length > 0
                        ? React.createElement(
                            components.ul || 'ul',
                            { key: item + 'sub-list' },
                            item.nested.map(nestedId =>
                              createEl(listMap[nestedId])
                            )
                          )
                        : null
                    )
                  return createEl(listMap[itemId])
                })
              )
            )
            listMap = {}
            listLastId = null
            listTagName = null
          }

          const renderHeading = (Type: string | React.ComponentType) => {
            toRender.push(
              <MyHeading
                key={id}
                style={{
                  marginLeft: '0.5rem',
                  marginRight: '0.5rem',
                  marginTop: '1rem',
                  marginBottom: '0.5rem',
                }}
              >
                <Heading as={Type} size="md">
                  {textBlock(properties.title, true, id)}
                </Heading>
              </MyHeading>
            )
          }

          switch (type) {
            case 'page':
            case 'divider':
              return <Divider m={1} />
              break
            case 'text':
              return (
                <SmallMBox m={2}>
                  {properties
                    ? properties.title.map((text, index) => {
                        return (
                          <>
                            {text.map((text2, index2) => {
                              if (
                                index2 < text.length - 1 &&
                                Array.isArray(text[index2 + 1])
                              ) {
                                if (text[index2 + 1][0][0] === 'a') {
                                  let link = text[index2 + 1][0][1]
                                  text[index2 + 1] = ''
                                  return (
                                    <a key={text2} href={`${link}`}>
                                      {text2}
                                    </a>
                                  )
                                } else {
                                  let attribute = text[index2 + 1][0][0]
                                  let font_weight = 400
                                  let font_style = 'none'
                                  if (attribute == 'b') {
                                    font_weight = 700
                                  } else if (attribute == 'i') {
                                    font_style = 'italic'
                                  }
                                  text[index2 + 1] = ''
                                  return (
                                    <Box
                                      as="span"
                                      fontStyle={font_style}
                                      fontWeight={font_weight}
                                    >
                                      {text2}
                                    </Box>
                                  )
                                }
                              } else if (text2.length) {
                                console.log(text2)
                                return <Box as="span">{text2}</Box>
                              }
                              return <></>
                            })}
                          </>
                        )
                      })
                    : ''}
                </SmallMBox>
              )
              break
            case 'image':
              const { format = {} } = value
              const {
                block_width,
                block_height,
                display_source,
                properties: image_properties,
                block_aspect_ratio,
              } = format
              const baseBlockWidth = 768
              const roundFactor = Math.pow(10, 2)
              // calculate percentages
              const width = block_width
                ? `${Math.round(
                    (block_width / baseBlockWidth) * 100 * roundFactor
                  ) / roundFactor}%`
                : block_height || '100%'

              const useWrapper = block_aspect_ratio && !block_height
              const childStyle: CSSProperties = useWrapper
                ? {
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    position: 'absolute',
                    top: 0,
                    padding: '2rem',
                    paddingBottom: '0',
                  }
                : {
                    width,
                    border: 'none',
                    height: block_height,
                    display: 'block',
                    maxWidth: '100%',
                    padding: '2rem',
                    paddingBottom: '0',
                  }
              const caption = value?.properties?.caption[0][0]
              return (
                <>
                  <img
                    key={!useWrapper ? id : undefined}
                    src={`/api/asset?assetUrl=${encodeURIComponent(
                      value.properties.source[0][0] as string
                    )}&blockId=${id}`}
                    style={childStyle}
                  />
                  <Text mt={2} mb={4} textAlign="center" mx="auto">
                    {caption}
                  </Text>
                </>
              )
            case 'video':
            case 'embed': {
              const { format = {} } = value
              const {
                block_width,
                block_height,
                display_source,
                block_aspect_ratio,
              } = format
              const baseBlockWidth = 768
              const roundFactor = Math.pow(10, 2)
              // calculate percentages
              const width = block_width
                ? `${Math.round(
                    (block_width / baseBlockWidth) * 100 * roundFactor
                  ) / roundFactor}%`
                : block_height || '100%'
              const height = block_height
                ? `${Math.round(
                    (block_height / (baseBlockWidth / 2)) * 100 * roundFactor
                  ) / roundFactor}%`
                : block_height || '100%'
              const isImage = type === 'image'
              const Comp = isImage ? 'img' : 'video'
              let useWrapper = block_aspect_ratio && !block_height
              if (Comp == 'video') {
                useWrapper = false
              }
              const childStyle: CSSProperties = useWrapper
                ? {
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    position: 'absolute',
                    top: 0,
                    padding: '2rem',
                    margin: 'auto',
                    minWidth: 'auto !important',
                  }
                : {
                    width,
                    border: 'none',
                    height,
                    display: 'block',
                    maxWidth: '100%',
                    padding: '2rem',
                    margin: 'auto',
                    minWidth: 'auto !important',
                  }

              let child = null

              if (!isImage && !value.file_ids) {
                // external resource use iframe
                const StyledIframe = styled(Iframe)`
                  width: 60vw;
                  height: 30vw;
                  min-width: 100px;
                  min-height: 60px;
                  max-height: 300px;
                  max-width: 500px;
                `

                return (
                  <Box my={8} mx="auto">
                    <StyledIframe
                      url={display_source}
                      id={!useWrapper ? id : display_source}
                      className="asset-wrapper"
                      display="initial"
                      position="relative"
                    />
                  </Box>
                )
                break
              } else {
                // notion resource
                child = (
                  <Comp
                    key={!useWrapper ? id : undefined}
                    src={`/api/asset?assetUrl=${encodeURIComponent(
                      display_source as any
                    )}&blockId=${id}`}
                    controls={!isImage}
                    alt={`An ${isImage ? 'image' : 'video'} from Notion`}
                    loop={!isImage}
                    muted={!isImage}
                    autoPlay={!isImage}
                    style={{ padding: '2rem', ...childStyle }}
                  />
                )
              }

              toRender.push(
                useWrapper ? (
                  <Box
                    style={{
                      paddingTop: `${Math.round(block_aspect_ratio * 100)}%`,
                      position: 'relative',
                    }}
                    className="asset-wrapper"
                    key={id}
                  >
                    {child}
                  </Box>
                ) : (
                  child
                )
              )
              break
            }
            case 'header':
              renderHeading('h1')
              break
            case 'sub_header':
              renderHeading('h2')
              break
            case 'sub_sub_header':
              renderHeading('h3')
              break
            case 'code': {
              if (properties.title) {
                const content = properties.title[0][0]
                const language = properties.language[0][0]

                if (language === 'LiveScript') {
                  // this requires the DOM for now
                  toRender.push(
                    <ReactJSXParser
                      key={id}
                      jsx={content}
                      components={components}
                      componentsOnly={false}
                      renderInpost={false}
                      allowUnknownElements={true}
                      blacklistedTags={['script', 'style']}
                    />
                  )
                } else {
                  toRender.push(
                    <components.Code key={id} language={language || ''}>
                      {content}
                    </components.Code>
                  )
                }
              }
              break
            }
            case 'quote': {
              if (properties.title) {
                return (
                  <Flex mx={2} my={8}>
                    <Divider orientation="vertical" borderWidth="6px" />
                    <SmallMBox m={2}>
                      {properties.title
                        .join()
                        .split('\n')
                        .map(i => {
                          return <p>{i}</p>
                        })}
                    </SmallMBox>
                  </Flex>
                )
              }
              break
            }
            case 'callout': {
              toRender.push(
                <Box className="callout" key={id}>
                  {value.format?.page_icon && (
                    <Box>{value.format?.page_icon}</Box>
                  )}
                  <Box className="text">
                    {textBlock(properties.title, true, id)}
                  </Box>
                </Box>
              )
              break
            }
            case 'tweet': {
              if (properties.html) {
                toRender.push(
                  <Box
                    dangerouslySetInnerHTML={{ __html: properties.html }}
                    key={id}
                  />
                )
              }
              break
            }
            case 'bookmark': {
              return (
                <Box m={4}>
                  <Bookmark
                    icon={`http://www.google.com/s2/favicons?domain=${extractHostname(
                      properties.link[0][0]
                    )}`}
                    title={properties.title[0][0]}
                    description={properties.description[0][0]}
                    href={properties.link[0][0]}
                  />
                </Box>
              )
              break
            }
            case 'toggle': {
              return <Box m={4}></Box>
              break
            }
            default:
              if (
                process.env.NODE_ENV !== 'production' &&
                !listTypes.has(type)
              ) {
                console.log('unknown type', type)
              }
              break
          }
          return toRender
        })}
        <Box mx="auto" mt={4}>
          <Footer
            twitter={'https://twitter.com/abigger87'}
            github={'https://github.com/abigger87'}
            linkedin={'https://www.linkedin.com/in/andreasbigger/'}
            mail={"mailto:bigger@usc.edu?subject=Andreas Bigger's Notion Blog"}
          />
        </Box>
      </Stack>
    </>
  )
}

export default RenderPost
