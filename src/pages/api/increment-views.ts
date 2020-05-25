import db from '../../lib/db-admin'
import { NextApiRequest, NextApiResponse } from 'next'

const incrementViews = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.id) {
    return res.status(400).json({
      error: 'Missing "id" query parameter',
    })
  }

  const ref = db.ref('views').child(req.query.id)
  const { snapshot } = await ref.transaction((currentViews: any) => {
    if (currentViews === null) {
      return 1
    }

    return currentViews + 1
  })

  return res.status(200).json({
    total: snapshot.val(),
  })
}

export default incrementViews
