// @ts-nocheck
import Header from '../components/header'
//import sharedStyles from '../styles/shared.module.css'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { GetStaticProps } from 'next'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'
import { Image, useColorMode, Box } from '@chakra-ui/core'

interface color {
  colorMode: 'light' | 'dark'
  toggleColorMode: any
}

export default function Home({ file }: { file: any }) {
  const formOptions = {
    label: 'Home Page',
    fields: [
      { name: 'Center Logo', component: 'text' },
      { name: 'Contact', component: 'text' },
      { name: 'Source', component: 'text' },
    ],
  }

  const { colorMode, toggleColorMode }: color = useColorMode()

  // * Registers a JSON Tina Form
  const [data, form] = useGithubJsonForm(file, formOptions)
  const darklogo = data?.darklogo ? data?.darklogo : '/darkavatar.png'
  const lightlogo = data?.lightlogo ? data?.lightlogo : '/lightavatar.png'
  const logo = colorMode === 'dark' ? lightlogo : darklogo

  useGithubToolbarPlugins()

  return (
    <>
      <Header titlePre="Home" />
      <Box
        position="absolute"
        p="5em 0"
        d="flex"
        top="0px"
        width="100%"
        height="100%"
      >
        <Image
          src={logo}
          alt="AB Castle Avatar"
          m="auto"
          alignSelf="center"
          style={{ zIndex: 999 }}
          height="8em"
        />
      </Box>
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
        data: (await import('../content/home.json')).default,
      },
    },
  }
}
