import React, { useState } from 'react'
import { GetStaticProps } from 'next'
import { Header, Footer, BlogPost } from '../../components'
import useSWR from 'swr'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'

import { NextSeo } from 'next-seo'
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
} from '@chakra-ui/core'

import fetcher from '../../lib/fetcher'
import { postIsPublished } from '../../lib/blog-helpers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getBlogIndex from '../../lib/notion/getBlogIndex'

interface color {
  colorMode: 'light' | 'dark'
  toggleColorMode: any
}

export default ({
  posts = [],
  preview,
  file,
}: {
  file: any
  posts: Array<any>
  preview: boolean
}) => {
  // * Hooks
  const [searchValue, setSearchValue] = useState('')
  const { colorMode }: color = useColorMode()

  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400',
  }

  const formOptions = {
    label: 'Blogs Page',
    fields: [
      { name: 'Twitter', component: 'text' },
      { name: 'GitHub', component: 'text' },
      { name: 'LinkedIn', component: 'text' },
      { name: 'Email', component: 'text' },
      { name: 'URL', component: 'text' },
      { name: 'Title', component: 'text' },
      { name: 'Description', component: 'text' },
    ],
  }

  // * Registers a JSON Tina Form
  const [data] = useGithubJsonForm(file, formOptions)
  const twitter = data?.twitter ? data?.twitter : 'https://twitter.com/'
  const github = data?.github ? data?.github : 'https://github.com'
  const linkedin = data?.linkedin ? data?.linkedin : 'https://linkedin.com'
  const mail = data?.mail ? data?.mail : 'https://gmail.com'
  const url = data?.url ? data?.url : 'https://andreasbigger.com/'
  const title = data?.title ? data?.title : "Andreas Bigger's Blog"
  const description = data?.description
    ? data?.description
    : 'A personal blog based on https://leerob.io and notion-blog.'

  useGithubToolbarPlugins()

  const filteredBlogPosts = posts
    .sort(
      (a, b) => Number(new Date(a.Published)) - Number(new Date(b.Published))
    )
    .filter(
      frontMatter =>
        frontMatter.Page.toLowerCase().includes(searchValue.toLowerCase()) ||
        frontMatter.slug.toLowerCase().includes(searchValue.toLowerCase()) ||
        frontMatter?.preview?.[0]?.[0]?.[0]
          ?.toLowerCase()
          .includes(searchValue.toLowerCase())
    )

  posts.forEach((value, index) => {
    const { data } = useSWR(
      `/api/page-views?id=${posts[index].Page.replace(/\s/g, '-')}`,
      fetcher
    )
    posts[index].views = data?.total
  })

  const popularPosts = posts
    .sort((a, b) => Number(b.views) - Number(a.views))
    .slice(0, 3)

  return (
    <>
      <Header titlePre="Blog" />
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
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
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
        >
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            Blog
          </Heading>
          <Text color={secondaryTextColor[colorMode]}>
            {`This is a young student's exploration into innovation in the modern world.
              I've written ${posts.length} articles on this site, and my journey is just beginning.
                  Use the search below to filter my posts.`}
          </Text>
          <InputGroup my={4} mr={4} w="100%">
            <Input
              aria-label="Search articles"
              onChange={e => setSearchValue(e.target.value)}
              placeholder="Search articles"
            />
            <InputRightElement>
              <Icon name="search" color="gray.300" />
            </InputRightElement>
          </InputGroup>
        </Flex>
        {!searchValue && (
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
            mt={8}
          >
            <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
              Most Popular
            </Heading>
            {popularPosts.map(frontMatter => (
              <BlogPost
                key={frontMatter.Page.replace(/\s/g, '-')}
                {...frontMatter}
              />
            ))}
          </Flex>
        )}
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
          mt={8}
        >
          <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
            All Posts
          </Heading>
          {!filteredBlogPosts.length && 'No posts found.'}
          {filteredBlogPosts.map(frontMatter => (
            <BlogPost
              key={frontMatter.Page.replace(/\s/g, '-')}
              {...frontMatter}
            />
          ))}
        </Flex>
        <Footer
          twitter={twitter}
          github={github}
          linkedin={linkedin}
          mail={mail}
        />
      </Stack>
    </>
  )
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson,
    })
  }
  const postsTable = await getBlogIndex()

  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug]

      // * remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      post['slug'] = slug
      return post
    })
    .filter(Boolean)

  const { users } = await getNotionUsers([...authorsToGet])

  posts.map(post => {
    post.Authors = post.Authors.map(id => users[id].full_name)
  })

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: preview || false,
      posts,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../../content/home.json')).default,
      },
    },
    unstable_revalidate: 10,
  }
}
