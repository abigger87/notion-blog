import React from 'react'
import { useColorMode, Heading, Text, Flex, Stack } from '@chakra-ui/core'

import { Subscribe, ProjectCard, Header } from '../components'

export default () => {
  const { colorMode } = useColorMode()
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400',
  }

  return (
    <>
      <Header titlePre="Projects" />
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
          <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
            Projects
          </Heading>
          <ProjectCard
            title="HackSC 2021"
            description="As Head Engineer, I helped build and direct my team to create an animation-based, responsive static website to drive interest and market HackSC 2021."
            href="https://2021.hacksc.com/"
            icon="hacksc2021"
          />
          <ProjectCard
            title="HackSC 2020"
            description="As a member of the engineering team, I contributed to the static HackSC 2020 website."
            href="https://2020.hacksc.com/"
            icon="hacksc2020"
          />
          <ProjectCard
            title="HackSC 2019"
            description="As a team member of Hacker Experience, I built relationships between our team and sponsors as well as perform a massive campaign, garnering over 15 CEOs to attend, speak, and judge at our event."
            href="https://2019.hacksc.com/"
            icon="hacksc2019"
          />
        </Flex>
        <Subscribe />
      </Stack>
    </>
  )
}
