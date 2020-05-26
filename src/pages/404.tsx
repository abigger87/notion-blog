import React from 'react'
import NextLink from 'next/link'
import Header from '../components/header'
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Button,
} from '@chakra-ui/core'

interface color {
  colorMode: 'light' | 'dark'
}

const Error = () => {
  const { colorMode }: color = useColorMode()
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400',
  }

  return (
    <>
      <Header titlePre="" />
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
            451 – Unavailable For Legal Reasons
          </Heading>
          <Text color={secondaryTextColor[colorMode]} my={4}>
            You have stumbled upon a missing link. Would you mind double
            checking that URL or navigating through the navigation bar above?
          </Text>
          <NextLink href="/" passHref>
            <Button
              as="a"
              p={[1, 4]}
              w="250px"
              fontWeight="bold"
              m="3rem auto 0"
            >
              Return Home
            </Button>
          </NextLink>
        </Flex>
      </Stack>
    </>
  )
}

export default Error
