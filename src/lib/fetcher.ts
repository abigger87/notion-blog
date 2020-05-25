export default async (...args: any) => {
  // @ts-ignore
  const res = await fetch(...args)

  return res.json()
}
