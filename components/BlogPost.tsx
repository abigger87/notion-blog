import React from 'react'
import NextLink from 'next/link'
import useSWR from 'swr'
import format from 'comma-number'
import { useColorMode, Heading, Text, Flex, Box, Link } from '@chakra-ui/core'

import { getDateStr } from '../lib/blog-helpers'
import fetcher from '../lib/fetcher'

interface color {
  colorMode: 'light' | 'dark'
}

const BlogPost = (frontMatter: any) => {
  const { Page, preview, Date: postdate } = frontMatter
  const { colorMode }: color = useColorMode()
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400',
  }

  const slug = Page.replace(/\s/g, '-')

  const { data } = useSWR(`/api/page-views?id=${slug}`, fetcher)
  const views = data?.total

  return (
    <NextLink href={`blog/${slug}`} passHref>
      <Link w="100%" _hover={{ textDecoration: 'none' }}>
        <Box mb={8} display="block" width="100%">
          <Flex
            width="100%"
            align="flex-start"
            justifyContent="space-between"
            flexDirection={['column', 'row']}
          >
            <Heading size="md" as="h3" mb={1} fontWeight="medium">
              {Page}
            </Heading>
            <Text
              color="gray.500"
              minWidth="105px"
              textAlign={['left', 'right']}
              mb={2}
            >
              {`${views ? format(views) : '–––'} views`}
            </Text>
          </Flex>
          <Flex
            width="100%"
            align="flex-start"
            justifyContent="space-between"
            flexDirection={['column', 'row']}
          >
            <Text mb={1} color={secondaryTextColor[colorMode]}>
              {preview}
            </Text>
            <Text
              color="gray.500"
              minWidth="150px"
              textAlign={['left', 'right']}
            >
              {getDateStr(postdate)}
            </Text>
          </Flex>
        </Box>
      </Link>
    </NextLink>
  )
}

export default BlogPost
