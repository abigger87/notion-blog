import React from 'react'
import { NextSeo } from 'next-seo'
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  SimpleGrid,
} from '@chakra-ui/core'

import { GetStaticProps } from 'next'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'

import { Header } from '../components'
import {
  Analytics,
  Buttondown,
  GitHub,
  Gumroad,
  Unsplash,
  YouTube,
} from '../components/metrics'

const url = 'https://andreasbigger.com/dashboard'
const title = 'Dashboard – Andreas Bigger'
const description =
  'My personal dashboard built using a combination of Next.js notion-blog and https://leerob.io.'

interface color {
  colorMode: 'light' | 'dark'
  toggleColorMode: any
}

const Dashboard = ({ file }) => {
  const { colorMode }: color = useColorMode()
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400',
  }

  const formOptions = {
    label: 'Dashboard',
    fields: [
      { name: 'YouTube Channel', component: 'text' },
      { name: 'Contact', component: 'text' },
      { name: 'Source', component: 'text' },
    ],
  }

  // * Registers a JSON Tina Form
  const [data, form] = useGithubJsonForm(file, formOptions)

  useGithubToolbarPlugins()

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
          images: [
            {
              url: 'https://andreasbigger.com/static/images/dashboard.jpg',
              alt: description,
              width: 1280,
              height: 720,
            },
          ],
        }}
      />
      <Header titlePre="Dashboard" key="dash" />
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="700px"
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
        >
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            Dashboard
          </Heading>
          <Text color={secondaryTextColor[colorMode]}>
            This is a personal dashboard based on https://leerob.io dashboard,
            built with Next.js API routes deployed as serverless functions. This
            dashboard page tracks metrics across social media platforms
            including Unsplash, YouTube, GitHub, Instagram, and more.
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
          mt={8}
        >
          <Unsplash link={data?.unsplash ? data?.unsplash : ''} />
          <YouTube link={data?.youtube ? data?.youtube : ''} />
          <SimpleGrid columns={[1, 1, 2]} spacing={4} mb={4}>
            <Analytics link={data?.analytics ? data?.analytics : ''} />
            <GitHub link={data?.github ? data?.github : ''} />
          </SimpleGrid>
          <SimpleGrid columns={[1, 1, 2]} spacing={4} mb={4}>
            <Gumroad link={data?.gumroad ? data?.gumroad : ''} />
            <Buttondown link={data?.buttondown ? data?.buttondown : ''} />
          </SimpleGrid>
        </Flex>
      </Stack>
    </>
  )
}

export default Dashboard

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
      fileRelativePath: 'content/metrics.json',
      parse: parseJson,
    })
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/metrics.json',
        data: (await import('../content/metrics.json')).default,
      },
    },
  }
}
