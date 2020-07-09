import NextLink from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'
import React from 'react'

import styled from '@emotion/styled'
import { useColorMode, Button, Flex, Box, IconButton } from '@chakra-ui/core'
import styles from '../styles/header.module.css'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Home', page: '/' },
  { label: 'Dashboard', page: '/dashboard' },
  { label: 'Blog', page: '/blog' },
  { label: 'Projects', page: '/projects' },
  { label: 'About', page: '/about' },
  { label: 'Code', link: 'https://github.com/abigger87/notion-blog' },
]

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

interface color {
  colorMode: 'light' | 'dark'
  toggleColorMode: any
}

export default ({ titlePre = '' }) => {
  const { pathname } = useRouter()
  const { colorMode, toggleColorMode }: color = useColorMode()

  const bgColor = {
    light: 'white',
    dark: 'gray.900',
  }
  const primarytextColor = {
    light: 'black',
    dark: 'white',
  }
  const navBgColor = {
    light: 'rgba(255, 255, 255, 0.8)',
    dark: 'rgba(23, 25, 35, 0.8)',
  }

  const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  background: ${colorMode === 'light' ? 'white' : '#171923'};
          background-image: ${
            colorMode === 'light'
              ? `radial-gradient(#AAAAAA 1px, transparent 1px),
          radial-gradient(#AAAAAA 1px, transparent 1px);`
              : `radial-gradient(#DDDDDD 1px, transparent 1px),
          radial-gradient(#DDDDDD 1px, transparent 1px);`
          }
          background-position: 0 0, 25px 25px;
          background-attachment: fixed;
          background-size: 50px 50px;
  `

  return (
    <>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Andreas Bigger Notion Blog" />
        <meta
          name="keywords"
          content="Andreas Bigger Notion Blog Person Website Developer Viterbi USC"
        />
        <script src="/jquery.min.js"></script>
        <title>{titlePre ? `${titlePre} |` : ''} Andreas Bigger</title>
        <meta name="og:title" content="Andreas Bigger Notion Blog" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@abigger87" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="images/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="images/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="images/icons/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="images/icons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="images/icons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="images/icons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="images/icons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="images/icons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="images/icons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="images/icons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="images/icons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="images/icons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="images/icons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="images/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="images/icons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="images/icons/favicon-16x16.png"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="images/icons/ms-icon-144x144.png"
        />
      </Head>
      <StickyNav
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="900px"
        width="100%"
        as="nav"
        py={4}
        px={6}
        mt={[0, 8]}
        mb={8}
        mx="auto"
        style={{ marginTop: '1rem', marginBottom: '1rem' }}
      >
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'dark' ? 'sun' : 'moon'}
          onClick={toggleColorMode}
        />
        <Box style={{ textAlign: 'center' }}>
          {navItems.map(({ label, page, link }) =>
            page ? (
              <NextLink href={page} key={label} passHref>
                <Button
                  className={pathname === page ? 'active' : undefined}
                  as="a"
                  variant="ghost"
                  p={[1, 4]}
                  style={{ padding: '.75rem' }}
                >
                  {label}
                </Button>
              </NextLink>
            ) : (
              <ExtLink key={label} href={link}>
                <Button
                  className={pathname === page ? 'active' : undefined}
                  variant="ghost"
                  p={[1, 4]}
                  style={{ padding: '.75rem' }}
                >
                  {label}
                </Button>
              </ExtLink>
            )
          )}
        </Box>
      </StickyNav>
    </>
  )
}
