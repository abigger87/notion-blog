// @ts-nocheck
import '../styles/global.css'
import ExtLink from '../components/ext-link'
import App from 'next/app'
import { TinaCMS, TinaProvider } from 'tinacms'
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
} from '@chakra-ui/core'
import theme from '../styles/theme'
import { prismLightTheme, prismDarkTheme } from '../styles/prism'
import { Global, css } from '@emotion/core'
import { hotjar } from 'react-hotjar'

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

          #__next {
            background: ${colorMode === 'light' ? 'white' : '#171923'};
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
            <TinaProvider cms={this.cms}>
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
    <button
      className="edit_button"
      onClick={editMode ? github.exitEditMode : github.enterEditMode}
    >
      {editMode ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}
