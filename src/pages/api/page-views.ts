import db from '../../lib/db-admin'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.id) {
    return db.ref('views').once('value', (snapshot: any) => {
      const views = snapshot.val()
      const allViews = Object.values(views).reduce(
        (total: any, value: any) => total + value
      )

      return res.status(200).json({
        total: allViews,
      })
    })
  }

  const ref = db.ref('views').child(req.query.id)

  return ref.once('value', (snapshot: any) => {
    res.status(200).json({
      total: snapshot.val(),
    })
  })
}
