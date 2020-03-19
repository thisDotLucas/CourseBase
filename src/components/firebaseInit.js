import firebase from "firebase"
import firebaseConfig from "./firebaseConfig"

const database = firebase.initializeApp(firebaseConfig)
export default database.database()