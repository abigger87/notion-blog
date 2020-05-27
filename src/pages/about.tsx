import { Header, ExtLink, Subscribe } from '../components'
import {
  GitHub,
  Twitter,
  Envelope,
  LinkedIn,
  ThirtyDayChart,
  CodingLanguages,
} from '../components/svgs'

import sharedStyles from '../styles/shared.module.css'
import contactStyles from '../styles/contact.module.css'

import GitHubCalendar from 'react-github-calendar'
import { Text, Heading, Stack, useColorMode } from '@chakra-ui/core'

const contacts = [
  {
    Comp: Twitter,
    alt: 'twitter icon',
    link: 'https://twitter.com/abigger87',
  },
  {
    Comp: GitHub,
    alt: 'github icon',
    link: 'https://github.com/abigger87',
  },
  {
    Comp: LinkedIn,
    alt: 'linkedin icon',
    link: 'https://www.linkedin.com/in/andreasbigger/',
  },
  {
    Comp: Envelope,
    alt: 'envelope icon',
    link: "mailto:bigger@usc.edu?subject=Andreas Bigger's Notion Blog",
  },
]

interface color {
  colorMode: 'light' | 'dark'
  toggleColorMode: any
}

export default () => {
  const { colorMode, toggleColorMode }: color = useColorMode()

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
        <Heading as="h2" size="lg">
          About
        </Heading>

        <Text fontSize="lg">
          Andreas Bigger - Viterbi Fellow @{' '}
          <ExtLink href="https://usc.edu">USC</ExtLink>
        </Text>

        <Subscribe />

        <div className="embedded">
          <GitHubCalendar username="abigger87" />
        </div>

        <ThirtyDayChart />

        <CodingLanguages />

        <div className={contactStyles.links}>
          {contacts.map(({ Comp, link, alt }) => {
            return (
              <ExtLink key={link} href={link} aria-label={alt}>
                <Comp
                  fill={colorMode === 'dark' ? 'white' : 'black'}
                  height={32}
                />
              </ExtLink>
            )
          })}
        </div>
      </Stack>
    </>
  )
}
