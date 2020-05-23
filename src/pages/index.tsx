import Header from '../components/header'
import sharedStyles from '../styles/shared.module.css'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { GetStaticProps } from 'next'
import React, { useEffect } from 'react'
import { hotjar } from 'react-hotjar'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'

export default function Home({ file }) {
  const formOptions = {
    label: 'Home Page',
    fields: [
      { name: 'Center Logo', component: 'text' },
      { name: 'Contact', component: 'text' },
      { name: 'Source', component: 'text' },
    ],
  }

  // * Registers a JSON Tina Form
  const [data, form] = useGithubJsonForm(file, formOptions)
  const logo = data?.logo ? data?.logo : '/avatar.png'

  useGithubToolbarPlugins()

  useEffect(() => {
    // * Load Hotjar
    hotjar.initialize(
      parseInt(
        process.env.HOTJAR_ID !== undefined ? process.env.HOTJAR_ID : ''
      ),
      6
    )
  }, [])

  return (
    <>
      <Header titlePre="Home" />
      <div className={sharedStyles.absolutecenter}>
        <img src={logo} alt="AB Castle Avatar" height="200vw" />
      </div>
    </>
  )
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson,
    })
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default,
      },
    },
  }
}
