import { NextSeo } from 'next-seo'
import styled, { StyledComponent } from '@emotion/styled'
import { Stack, Heading, Box, BoxProps } from '@chakra-ui/core'

// * Importing custom components
import { Header, SkeletonBlock, Heading as MyHeading } from '.'

const SmallMBox: any = styled(Box)`
  margin-bottom: 0.5rem;
`

const MediumMBox: any = styled(Box)`
  margin-bottom: 1rem;
`

const FallbackBlogPage = ({ title, description, posturl }) => {
  let skeleton_blocks = [...Array(20).keys()]

  return (
    <>
      <Header titlePre={'Loading'} />
      <NextSeo
        title={title}
        description={description}
        canonical={posturl}
        openGraph={{
          url: posturl,
          title,
          description,
        }}
      />
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 0 auto"
        px={6}
        maxWidth="700px"
      >
        <Heading mb={2} m={2} as="h1" size="md">
          {'Loading Page'}
        </Heading>
        <SmallMBox m={2}>By: ––––</SmallMBox>
        <SmallMBox m={2}>Posted: ––––</SmallMBox>
        <MediumMBox m={2} mb={4}>
          views: ––––
        </MediumMBox>

        <MyHeading
          key={'loading-heading'}
          style={{
            marginLeft: '0.5rem',
            marginRight: '0.5rem',
            marginTop: '1rem',
            marginBottom: '0.5rem',
          }}
        >
          <h1 key={'loading-heading'}>
            Please wait a moment while this page is dynamically fetched from
            Notion
          </h1>
        </MyHeading>

        {skeleton_blocks.map(n => {
          return <SkeletonBlock key={n} />
        })}
      </Stack>
    </>
  )
}

export default FallbackBlogPage
