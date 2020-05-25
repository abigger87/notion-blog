import Header from '../components/header'
import ExtLink from '../components/ext-link'

import sharedStyles from '../styles/shared.module.css'
import contactStyles from '../styles/contact.module.css'

import GitHubCalendar from 'react-github-calendar'
import GitHub from '../components/svgs/github'
import Twitter from '../components/svgs/twitter'
import Envelope from '../components/svgs/envelope'
import LinkedIn from '../components/svgs/linkedin'

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

export default () => (
  <>
    <Header titlePre="About" />
    <div className={sharedStyles.layout}>
      <div className={contactStyles.avatar} style={{ display: 'none' }}>
        <img src="/avatar.png" alt="AB Castle Avatar" height="200vw" />
      </div>

      <h2 style={{ marginTop: 0 }}>About</h2>

      <div className={contactStyles.name}>
        Andreas Bigger - Viterbi Fellow @{' '}
        <ExtLink href="https://usc.edu">USC</ExtLink>
      </div>

      <GitHubCalendar
        username="abigger87"
        style={{
          textAlign: 'center',
          marginLeft: '10vw',
          marginRight: '10vw',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      />

      <div className={contactStyles.links}>
        {contacts.map(({ Comp, link, alt }) => {
          return (
            <ExtLink key={link} href={link} aria-label={alt}>
              <Comp height={32} />
            </ExtLink>
          )
        })}
      </div>
    </div>
  </>
)