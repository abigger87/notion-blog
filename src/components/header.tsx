import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Home', page: '/' },
  { label: 'Blog', page: '/blog' },
  { label: 'About', page: '/about' },
  { label: 'Code', link: 'https://github.com/abigger87/notion-blog' },
]

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

export default ({ titlePre = '' }) => {
  const { pathname } = useRouter()

  return (
    <header className={styles.header}>
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
        <title>{titlePre ? `${titlePre} |` : ''} Andreas Bigger</title>
        <meta name="og:title" content="Andreas Bigger Notion Blog" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@abigger87" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/icons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/icons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/icons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/icons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/icons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      </Head>
      <ul>
        {navItems.map(({ label, page, link }) => (
          <li key={label}>
            {page ? (
              <Link href={page}>
                <a className={pathname === page ? 'active' : undefined}>
                  {label}
                </a>
              </Link>
            ) : (
              <ExtLink href={link}>{label}</ExtLink>
            )}
          </li>
        ))}
      </ul>
    </header>
  )
}
