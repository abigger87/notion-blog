import Link from 'next/link'
import Header from '../../components/header'

import blogStyles from '../../styles/blog.module.css'
import sharedStyles from '../../styles/shared.module.css'

import {
  getBlogLink,
  getDateStr,
  postIsPublished,
} from '../../lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import fetcher from '../../lib/fetcher'
import format from 'comma-number'
import useSWR from 'swr'

import { useColorMode } from '@chakra-ui/core'

interface color {
  colorMode: 'light' | 'dark'
  toggleColorMode: any
}

export async function getStaticProps({ preview }) {
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
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  }
}

export default ({ posts = [], preview }) => {
  let views = []

  posts.forEach((value, index) => {
    const { data } = useSWR(
      `/api/page-views?id=${posts[index].Page.replace(/\s/g, '-')}`,
      fetcher
    )
    views.push(data?.total)
  })

  const { colorMode, toggleColorMode }: color = useColorMode()

  return (
    <>
      <Header titlePre="Blog" />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}
        {posts.map((post, index) => {
          return (
            <div
              className={blogStyles.postPreview}
              key={post.Page.replace(/\s/g, '-')}
              style={
                colorMode === 'dark'
                  ? {
                      borderBottom: '1px solid #FFFFFF',
                      marginTop: '2em',
                      marginBottom: '1em',
                    }
                  : {
                      borderBottom: '1px solid rgba(0, 0, 0, 0.8)',
                      marginTop: '2em',
                      marginBottom: '1em',
                    }
              }
            >
              <h3 className={blogStyles.cursorpointer}>
                <Link
                  href="/blog/[slug]"
                  as={getBlogLink(post.Page.replace(/\s/g, '-'))}
                >
                  <div className={blogStyles.titleContainer}>
                    {!post.Published && (
                      <span className={blogStyles.draftBadge}>Draft</span>
                    )}
                    <a>{post.Page}</a>
                  </div>
                </Link>
              </h3>
              {post.Authors.length > 0 && (
                <div className="authors">By: {post.Authors.join(' ')}</div>
              )}
              {post.Date && (
                <div className="posted">Posted: {getDateStr(post.Date)}</div>
              )}
              <>
                {views.length > index && views[index]
                  ? format(views[index])
                  : '–––'}{' '}
                views
              </>
              <p style={{ marginBottom: '1em' }}>
                {(!post.preview || post.preview.length === 0) &&
                  'No preview available'}
                {(post.preview || []).map((block, idx) =>
                  textBlock(block, true, `${post.Slug}${idx}`)
                )}
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}
