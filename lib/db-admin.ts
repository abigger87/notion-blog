const admin = require('firebase-admin')
require('dotenv').config()

try {
  const priv_key =
    process.env.FIREBASE_PRIVATE_KEY !== undefined
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : ''
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: priv_key,
      project_id: 'notion-blog-a3d01',
    }),
    databaseURL: 'https://notion-blog-a3d01.firebaseio.com',
  })
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    // eslint-disable-next-line no-console
    console.error('Firebase admin initialization error', error.stack)
  }
}

module.exports = admin.database()
export default admin.database()
