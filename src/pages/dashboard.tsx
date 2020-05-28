//@ts-nocheck
import React from 'react'
import { NextSeo } from 'next-seo'
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  SimpleGrid,
  Link,
} from '@chakra-ui/core'

import { GetStaticProps } from 'next'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'

import { Header, Footer } from '../components'
import {
  Analytics,
  Buttondown,
  GitHub,
  Gumroad,
  Unsplash,
  YouTube,
  Wakatime,
} from '../components/metrics'

const url = 'https://andreasbigger.com/dashboard'
const title = 'Dashboard – Andreas Bigger'
const description =
  'My personal dashboard built using a combination of Next.js notion-blog and https://leerob.io.'

interface color {
  colorMode: 'light' | 'dark'
  toggleColorMode: any
}

const Dashboard = ({ file, homefile }) => {
  const { colorMode }: color = useColorMode()
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400',
  }

  // * Registers a JSON Tina Form
  let [metricsdata] = useGithubJsonForm(homefile, {
    label: 'Dashboard',
    fields: [
      { name: 'Twitter', component: 'text' },
      { name: 'GitHub', component: 'text' },
      { name: 'LinkedIn', component: 'text' },
      { name: 'Email', component: 'text' },
      { name: 'URL', component: 'text' },
      { name: 'Title', component: 'text' },
      { name: 'Description', component: 'text' },
    ],
  })

  const twitter = metricsdata?.twitter
    ? metricsdata?.twitter
    : 'https://twitter.com/'
  const github = metricsdata?.github
    ? metricsdata?.github
    : 'https://github.com'
  const linkedin = metricsdata?.linkedin
    ? metricsdata?.linkedin
    : 'https://linkedin.com'
  const mail = metricsdata?.mail ? metricsdata?.mail : 'https://gmail.com'

  // * Registers a JSON Tina Form
  let [data] = useGithubJsonForm(file, {
    label: 'Dashboard',
    fields: [
      { name: 'YouTube Channel', component: 'text' },
      { name: 'Contact', component: 'text' },
      { name: 'Source', component: 'text' },
    ],
  })

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
            Dashboard
          </Heading>
          <Text color={secondaryTextColor[colorMode]}>
            This is a personal dashboard based on{' '}
            <Link color="teal.500" href="https://leerob.io" isExternal>
              leerob.io
            </Link>{' '}
            and{' '}
            <Link
              color="teal.500"
              href="https://notion-blog.now.sh/"
              isExternal
            >
              notion-blog
            </Link>
            , built with Next.js API routes deployed as serverless functions and
            Notion as a CMS. This dashboard page tracks metrics across social
            media platforms including Unsplash, YouTube, GitHub, Instagram, and
            more.
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
          my={4}
          mx="auto"
        >
          {/*<Unsplash link={data?.unsplash ? data?.unsplash : ''} />
          <YouTube link={data?.youtube ? data?.youtube : ''} />*/}
          {/*<Gumroad link={data?.gumroad ? data?.gumroad : ''} />*/}
          <SimpleGrid columns={[1, 1, 2]} spacing={4} mb={4}>
            <Analytics link={data?.analytics ? data?.analytics : ''} />
            <GitHub link={data?.github ? data?.github : ''} />
          </SimpleGrid>
          <Wakatime
            link={data?.wakatime ? data?.wakatime : ''}
            range="last_year"
          >
            <Buttondown link={data?.buttondown ? data?.buttondown : ''} />
          </Wakatime>
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
      homefile: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default,
      },
    },
  }
}
