import NextLink from 'next/link'
import Head from 'next/head'
import ExtLink from './Extlink'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import $ from 'jquery'

import styled from '@emotion/styled'
import { useColorMode, Button, Flex, Box, IconButton } from '@chakra-ui/core'

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

const Header = ({ titlePre = '' }) => {
  const { pathname } = useRouter()
  const { colorMode, toggleColorMode }: color = useColorMode()

  useEffect(() => {
    var $q = e => document.getElementById(e),
      url = encodeURIComponent(window.location.href),
      newRequest = function(e = !0) {
        fetch('https://api.websitecarbon.com/b?url=' + url)
          .then(function(e: any) {
            if (!e.ok) throw Error(e)
            return e.json()
          })
          .then(function(n) {
            e && renderResult(n),
              (n.t = new Date().getTime()),
              localStorage.setItem('wcb_' + url, JSON.stringify(n))
          })
          .catch(function(e) {
            ;($q('wcb_g').innerHTML = 'No Result'),
              console.log(e),
              localStorage.removeItem('wcb_' + url)
          })
      },
      renderResult = function(e) {
        ;($q('wcb_g').innerHTML = e.c + 'g of CO<sub>2</sub>/view'),
          $q('wcb_2').insertAdjacentHTML(
            // @ts-ignore
            'beforeEnd',
            ''
          )
      },
      css =
        '<style>.carbonbadge{--b1:#0e11a8;--b2:#00ffbc;font-size:15px;line-height:1.15;text-align:center;color:var(--b1)}.carbonbadge sub{vertical-align:middle;position:relative;top:.3em;font-size:.7em}.carbonbadge a,.carbonbadge p{text-align:center;display:inline-flex;justify-content:center;align-items:center;font-size:1em;margin:.2em 0;line-height:1.15;font-family:-apple-system,BlinkMacSystemFont,sans-serif}#wcb_g,.carbonbadge a{padding:.3em .5em;background:#fff;border:.13em solid var(--b2);border-radius:.3em 0 0 .3em}#wcb_g{border-right:0;min-width:8.2em}.carbonbadge a{border-radius:0 .3em .3em 0;border-left:0;background:var(--b1);color:#fff;text-decoration:none;font-weight:700;border-color:var(--b1)}.wcb-d #wcb_2{color:#fff}.carbonbadge.wcb-d a{color:var(--b1);background:var(--b2);border-color:var(--b2)}</style>',
      badge = $q('wcb')
    if ('fetch' in window) {
      badge.insertAdjacentHTML(
        // @ts-ignore
        'beforeEnd',
        css
      ),
        badge.insertAdjacentHTML(
          // @ts-ignore
          'beforeEnd',
          '<div id="wcb_p"><p id="wcb_g">Measuring CO<sub>2</sub>&hellip;</p><a target="_blank" rel="noopener" href="https://websitecarbon.com">Carbon</a></div><p id="wcb_2"></p>'
        )
      let e = localStorage.getItem('wcb_' + url)
      var n = new Date().getTime()
      if (e) {
        var t = JSON.parse(e)
        renderResult(t), n - t.t > 864e5 && newRequest(!1)
      } else newRequest()
    }
  }, [])

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
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
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
      <div
        id="wcb"
        className={`wcb carbonbadge ${colorMode === 'light' ? '' : 'wcb-d'}`}
        style={{
          display: 'flex',
          margin: 'auto',
          position: 'absolute',
          top: '0',
          right: '0',
          padding: '.75rem',
        }}
      ></div>
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

export default Header
