import { useState } from 'react'
import { Spinner, useColorMode } from '@chakra-ui/core'
import { Box } from '@chakra-ui/core'

interface color {
  colorMode: 'light' | 'dark'
  toggleColorMode: any
}

const ThirtyDayChart = () => {
  const { colorMode }: color = useColorMode()
  const [loading, setLoading] = useState(true)

  const light_svg =
    'https://wakatime.com/share/@1258dd5f-7d07-4a86-be38-df8588fb2a29/5f2dce9b-d5bf-40cd-bb65-417443a2d9b3.svg'
  const dark_svg =
    'https://wakatime.com/share/@1258dd5f-7d07-4a86-be38-df8588fb2a29/bbb5032e-7358-4dcd-8115-03f99e986af4.svg'

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

export default ThirtyDayChart
