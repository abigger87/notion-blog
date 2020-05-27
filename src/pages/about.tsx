import { GetStaticProps } from 'next'

import { Header, ExtLink, Subscribe, Footer } from '../components'
import { ThirtyDayChart, CodingLanguages } from '../components/svgs'

import GitHubCalendar from 'react-github-calendar'
import { Text, Heading, Stack, useColorMode } from '@chakra-ui/core'

import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'

interface color {
  colorMode: 'light' | 'dark'
  toggleColorMode: any
}

export default ({ file }: { file: any }) => {
  const { colorMode }: color = useColorMode()

  const formOptions = {
    label: 'About Page',
    fields: [
      { name: 'Twitter', component: 'text' },
      { name: 'GitHub', component: 'text' },
      { name: 'LinkedIn', component: 'text' },
      { name: 'Email', component: 'text' },
    ],
  }

  // * Registers a JSON Tina Form
  const [data] = useGithubJsonForm(file, formOptions)
  const twitter = data?.twitter ? data?.twitter : 'https://twitter.com/'
  const github = data?.github ? data?.github : 'https://github.com'
  const linkedin = data?.linkedin ? data?.linkedin : 'https://linkedin.com'
  const mail = data?.mail ? data?.mail : 'https://gmail.com'

  useGithubToolbarPlugins()

  return (
    <>
      <Header titlePre="About" />
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="700px"
      >
        <Heading mx="auto" textAlign="center" as="h2" size="lg">
          Andreas Bigger - Viterbi Fellow @{' '}
          <ExtLink href="https://usc.edu">USC</ExtLink>
        </Heading>

        <Subscribe />

        <div className="embedded">
          <GitHubCalendar username="abigger87" />
        </div>

        <ThirtyDayChart />

        <CodingLanguages />

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
        data: (await import('../content/home.json')).default,
      },
    },
  }
}
