import { useState, useEffect } from 'react'
import format from 'comma-number'

import loadDb from '../lib/db'

const ViewCounter = ({ id }) => {
  const [views, setViews] = useState('')

  const onViews = newViews => setViews(newViews.val())
  let db

  const fetchData = async () => {
    db = await loadDb()
    db.child(id).on('value', onViews)
  }

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/increment-views?id=${encodeURIComponent(id)}`)

    registerView().then(res => {
      if (res.status === 200) {
        res.json().then(r => setViews(r.total))
      }
    })

    fetchData()

    return () => {
      if (db) {
        db.child(id).off('value', onViews)
      }
    }
  }, [id])

  return <>{views ? format(views) : '–––'} views</>
}

export default ViewCounter
