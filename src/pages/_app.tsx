// @ts-nocheck
//import '../styles/global.css'
import ExtLink from '../components/Extlink'
import App from 'next/app'
import { TinaCMS, TinaProvider } from 'tinacms'
import { GlobalStyles as TinaStyles } from '@tinacms/styles'
import {
  useGithubEditing,
  GithubClient,
  TinacmsGithubProvider,
} from 'react-tinacms-github'
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  useColorMode,
  Button,
} from '@chakra-ui/core'
import theme from '../styles/theme'
import { prismLightTheme, prismDarkTheme } from '../styles/prism'
import { Global, css } from '@emotion/core'
import { hotjar } from 'react-hotjar'
import $ from 'jquery'

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode()

  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          ${colorMode === 'light' ? prismLightTheme : prismDarkTheme};

          ::selection {
            background-color: #47a3f3;
            color: #fefefe;
          }

          html,
          body {
            padding: 0;
            margin: 0;
            height: max-content;
            min-height: 100vh;
          }

          body {
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
          }
        `}
      />
      {children}
    </>
  )
}

export default class Site extends App {
  cms: TinaCMS

  constructor(props) {
    super(props)
    this.cms = new TinaCMS({
      apis: {
        github: new GithubClient({
          proxy: '/api/proxy-github',
          authCallbackRoute: '/api/create-github-access-token',
          clientId: process.env.GITHUB_CLIENT_ID,
          baseRepoFullName: process.env.REPO_FULL_NAME,
        }),
      },
      sidebar: {
        hidden: !props.pageProps.preview,
      },
      toolbar: {
        hidden: !props.pageProps.preview,
      },
    })
  }

  componentDidMount() {
    // * Load Hotjar (Screw it... I'm hardcoding the hotjar id)
    hotjar.initialize(1824981, 6)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <ColorModeProvider value="light">
          <GlobalStyle>
            <TinaProvider cms={this.cms} styled={false}>
              <TinaStyles />
              <TinacmsGithubProvider
                editMode={pageProps.preview}
                enterEditMode={enterEditMode}
                exitEditMode={exitEditMode}
                error={pageProps.error}
              >
                <EditLink editMode={pageProps.preview} />
                <Component {...pageProps} />
              </TinacmsGithubProvider>
            </TinaProvider>
          </GlobalStyle>
        </ColorModeProvider>
      </ThemeProvider>
    )
  }
}

const enterEditMode = () => {
  return fetch(`/api/preview2`).then(() => {
    window.location.href = window.location.pathname
  })
}

const exitEditMode = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload()
  })
}

export interface EditLinkProps {
  editMode: boolean
}

export const EditLink = ({ editMode }: EditLinkProps) => {
  const github = useGithubEditing()

  return (
    <Button
      variantColor="gray"
      variant="outline"
      as="a"
      p={[1, 4]}
      style={{ padding: '.75rem', margin: '.75rem', zIndex: '999' }}
      onClick={editMode ? github.exitEditMode : github.enterEditMode}
    >
      {editMode ? 'Exit Edit Mode' : 'Edit This Site'}
    </Button>
  )
}
