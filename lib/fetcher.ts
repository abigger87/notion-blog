const Fetcher = async (...args: any) => {
  let url = args?.length > 0 ? args[0] : ''
  let link = url

  if (url.includes('?')) {
    url = url.substring(0, url.indexOf('?'))
  }
  let options = {
    headers: {
      link: link?.includes('?link=')
        ? link?.substring(link?.indexOf('=') + 1)
        : '',
    },
  }
  // @ts-ignore
  const res = await fetch(...args, options)

  return res.json()
}

export default Fetcher
