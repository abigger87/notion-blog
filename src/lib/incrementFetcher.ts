import { useState } from 'react'
import loadDb from './db'

export default async (...args: any) => {
  const [views, setViews] = useState('')

  // @ts-ignore
  const res = await fetch(...args)

  const onViews = newViews => setViews(newViews.val())
  let db

  const fetchData = async () => {
    db = await loadDb()
    db.child(...args).on('value', onViews)
  }

  fetchData().then(() => {
    if (db) {
      db.child(...args).off('value', onViews)
    }
  })

  return res.json()
}
