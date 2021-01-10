import { useState } from 'react'
import { Spinner, useColorMode } from '@chakra-ui/core'
import { Box } from '@chakra-ui/core'

interface color {
  colorMode: 'light' | 'dark'
  toggleColorMode: any
}

const CodingLanguages = () => {
  const { colorMode }: color = useColorMode()
  const [loading, setLoading] = useState(true)

  const light_svg =
    'https://wakatime.com/share/@1258dd5f-7d07-4a86-be38-df8588fb2a29/9712e4f4-75ff-479f-a9c8-89f3bbbedf4a.svg'
  const dark_svg =
    'https://wakatime.com/share/@1258dd5f-7d07-4a86-be38-df8588fb2a29/5aef348b-e535-4f11-b3b2-3fcd36e22c33.svg'

  return (
    <Box className="embedded" style={{ width: '100%', padding: '1rem' }}>
      {loading ? <Spinner /> : ''}
      <img
        alt="accessible text"
        src={colorMode === 'light' ? light_svg : dark_svg}
        style={{ width: '100%' }}
        onLoad={() => setLoading(false)}
      />
    </Box>
  )
}

export default CodingLanguages
