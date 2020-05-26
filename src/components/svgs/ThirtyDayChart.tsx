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
        <embed src="https://wakatime.com/share/@1258dd5f-7d07-4a86-be38-df8588fb2a29/67cc9fd6-e9b2-449a-b0fb-2d7c65b4b8ba.svg"></embed>
      </figure>
    </div>
  ) : (
    <div className="embedded">
      <figure>
        <embed src="https://wakatime.com/share/@1258dd5f-7d07-4a86-be38-df8588fb2a29/266cda6c-f847-433d-a92b-ea1852fe12f7.svg"></embed>
      </figure>
    </div>
  )
}
