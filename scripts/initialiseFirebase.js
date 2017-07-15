import admin from 'firebase-admin'
import serviceAccount from '../serviceAccount'
import config from './config'

export default admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebaseUrl
})

