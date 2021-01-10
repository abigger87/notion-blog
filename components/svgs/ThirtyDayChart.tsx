import * as React from 'react'
import { useColorMode } from '@chakra-ui/core'
import { Box } from '@chakra-ui/core'

interface color {
  colorMode: 'light' | 'dark'
  toggleColorMode: any
}

const ThirtyDayChart = () => {
  const { colorMode }: color = useColorMode()

  return colorMode === 'light' ? (
    <Box className="embedded">
      <figure>
        <embed src="https://wakatime.com/share/@1258dd5f-7d07-4a86-be38-df8588fb2a29/5f2dce9b-d5bf-40cd-bb65-417443a2d9b3.svg"></embed>
      </figure>
    </Box>
  ) : (
    <Box className="embedded">
      <figure>
        <embed src="https://wakatime.com/share/@1258dd5f-7d07-4a86-be38-df8588fb2a29/bbb5032e-7358-4dcd-8115-03f99e986af4.svg"></embed>
      </figure>
    </Box>
  )

  // * Blow Graphs include the title
  /* return colorMode === 'light' ? (
    <div className="embedded">
      <figure><embed src="https://wakatime.com/share/@1258dd5f-7d07-4a86-be38-df8588fb2a29/cbd544f2-f117-476e-b1c0-51e9396d4b32.svg"></embed></figure>
    </div>
  ) : (
      <div className="embedded">
        <figure><embed src="https://wakatime.com/share/@1258dd5f-7d07-4a86-be38-df8588fb2a29/60e4f71b-bc94-4b8c-8c2f-52ba7eaa29a9.svg"></embed></figure>
      </div>
    )*/
}

export default ThirtyDayChart
