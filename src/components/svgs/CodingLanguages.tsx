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
        <embed src="https://wakatime.com/share/@1258dd5f-7d07-4a86-be38-df8588fb2a29/9712e4f4-75ff-479f-a9c8-89f3bbbedf4a.svg"></embed>
      </figure>
    </div>
  ) : (
    <div className="embedded">
      <figure>
        <embed src="https://wakatime.com/share/@1258dd5f-7d07-4a86-be38-df8588fb2a29/5aef348b-e535-4f11-b3b2-3fcd36e22c33.svg"></embed>
      </figure>
    </div>
  )
}
