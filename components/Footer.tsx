// @ts-nocheck
import React from 'react'
import { Flex, Link, IconButton } from '@chakra-ui/core'

const Footer = ({
  github,
  twitter,
  linkedin,
  mail,
}: {
  github: string
  twitter: string
  linkedin: string
  mail: string
}) => (
  <Flex justify="center" mx="auto" mt={4} mb={8}>
    <Link href={twitter} title="Twitter" isExternal>
      <IconButton
        aria-label="Twitter"
        icon="twitter"
        size="lg"
        color="gray.500"
        variant="ghost"
      />
    </Link>
    <Link href={github} title="GitHub" isExternal>
      <IconButton
        aria-label="GitHub"
        icon="github"
        size="lg"
        color="gray.500"
        variant="ghost"
      />
    </Link>
    <Link href={linkedin} title="LinkedIn" isExternal>
      <IconButton
        aria-label="LinkedIn"
        icon="linkedin"
        size="lg"
        color="gray.500"
        variant="ghost"
      />
    </Link>
    <Link href={mail} title="Email" isExternal>
      <IconButton
        aria-label="Email"
        icon="mail"
        size="lg"
        color="gray.500"
        variant="ghost"
      />
    </Link>
  </Flex>
)

export default Footer
