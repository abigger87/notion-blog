import React from 'react'
import { GetStaticProps } from 'next'
import { useColorMode, Heading, Text, Flex, Stack } from '@chakra-ui/core'

import { Subscribe, ProjectCard, Header, Footer } from '@/components'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'
import { NFTE } from '@nfte/react'

const NFTs = ({ file }: { file: any }) => {
  const { colorMode } = useColorMode()

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
  const nft_dark: boolean = colorMode === 'dark' ? false : true

  useGithubToolbarPlugins()

  return (
    <>
      <Header titlePre="Projects" />
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
          minWidth="300px"
        >
          <Heading letterSpacing="tight" mb={8} size="xl" fontWeight={700}>
            Projects
          </Heading>
          <NFTE
            darkMode={nft_dark}
            contract="0x495f947276749ce646f68ac8c248420045cb7b5e"
            tokenId="70574172497146085816534331865891401397573257058257273740299993196798500929537"
          />
        </Flex>
        <Subscribe />
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
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('@/content/home.json')).default,
      },
    },
  }
}

export default NFTs
