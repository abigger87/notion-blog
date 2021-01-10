import React from '@/lib/node_modules/react'
import { GetStaticProps } from 'next'
import { useColorMode, Heading, Text, Flex, Stack } from '@chakra-ui/core'

import { Subscribe, ProjectCard, Header, Footer } from '../components'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'

export default ({ file }: { file: any }) => {
  const { colorMode } = useColorMode()
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
        >
          <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
            Projects
          </Heading>
          <ProjectCard
            title="HackSC 2021"
            description="As Head Engineer, I build and direct my team to create an animation-based, responsive static website to drive interest and market HackSC 2021."
            href="https://2021.hacksc.com/"
            icon="hacksc"
          />
          <ProjectCard
            title="CME Group 2020"
            description="Worked on Platform Engineering (DevOps) to migrate legacy docker images from docker swarm to Kubernetes. Built a Groovy/Java Framework to create application repositories flushed with webhooks to trigger Jenkins Pipelines. The Framework automated the process of deploying an app into Kubernetes. Also, created a Groovy Framework to lint and validate Dockerfiles on the opening of a pull request."
            href="https://cmegroup.com/"
            icon="cmegroup"
          />
          <ProjectCard
            title="HackSC 2020"
            description="As a member of the engineering team, I built the HackSC static landing page as well as lay the infrastructure for the fullstack Node.js, Express, MySQL, Next.js application to provide a dashboard for hackers, judges, sponsors, volunteers, and admin."
            href="https://2020.hacksc.com/"
            icon="hacksc"
          />
          <ProjectCard
            title="District 2 Capital Fund, LP"
            description="Developed investment fund’s web dashboard using MongoDB, Express, React, and Node.js to screen, retrieve, and collect SEC filing data of public companies of interest. I also built D2C's static website at https://district2capital.com"
            href="https://district2capital.com/"
            icon="d2c"
          />
          <ProjectCard
            title="Spatial Computing Lab"
            description="Undergraduate research researching traffic analytics and developing a web
            dashboard for real-time visualization under Professor Yao-Yi Chiang."
            href="https://adms.usc.edu/app"
            icon="adms"
          />
          <ProjectCard
            title="HackSC 2019"
            description="As part of Hacker Experience, I built relationships between our team and sponsors as well as perform a massive outreach campaign, garnering over 15 CEOs to attend, speak, and judge at our event."
            href="https://2019.hacksc.com/"
            icon="hacksc"
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
        data: (await import('../content/home.json')).default,
      },
    },
  }
}
