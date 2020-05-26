import { useColorMode } from '@chakra-ui/core'

interface color {
  colorMode: 'light' | 'dark'
  toggleColorMode: any
}

export default () => {
  const { colorMode }: color = useColorMode()

  return colorMode === 'light' ? (
    <div className="embedded">
      <figure>
        <embed src="https://wakatime.com/share/@1258dd5f-7d07-4a86-be38-df8588fb2a29/0e529d93-26c6-4bd8-959c-ed601b5a5cf4.svg"></embed>
      </figure>
    </div>
  ) : (
    <div className="embedded">
      <figure>
        <embed src="https://wakatime.com/share/@1258dd5f-7d07-4a86-be38-df8588fb2a29/7d3f5015-7da3-4bb5-97ba-2260c29bdfb6.svg"></embed>
      </figure>
    </div>
  )
}
