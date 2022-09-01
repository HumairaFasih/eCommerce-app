import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc} from "firebase/firestore"

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJawvUfWO7ws3afnZSM1mjyOyFoBAECNo",
  authDomain: "clothing-store-17c79.firebaseapp.com",
  projectId: "clothing-store-17c79",
  storageBucket: "clothing-store-17c79.appspot.com",
  messagingSenderId: "999761808138",
  appId: "1:999761808138:web:ad8e8a4b3a51d61f0388f3"
};

// Initialize Firebase App. The CRUD operations will be performed on this instance.
// Config details provided by taking them directly from firebase. Unique to this project.
const firebaseApp = initializeApp(firebaseConfig);

// Other providers like Facebook, Github etc do exist as well
export const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"
})


// points to cloud firestore database that can be viewed in the firebase console
const db = getFirestore()

// PopUp version.
// export const googleSignIn = async () => {
    //     const {user} = await signInWithPopup(auth, provider)
    //     createUserDocFromAuth(user)
    // }
    
export const auth = getAuth()

    // Creating the users doc in firestore. Passing the pointer to database +
    // the user auth object received as response from the request made to
    // google's servers to authenticate the user trying to sign in to application
export const createUserDocFromAuth = async (userAuthObj, userName=null) => {

    const {uid, displayName, email} = userAuthObj

    // Even though we do not have a document reference or users collection inside database,
    // google will still create a unique specific path to store doc in the database. 
    // And it will return a document reference object containing info related to that document reference
    // There currently won't be anything at that point, hence .exists() will return false
    const userDocRef = doc(db, 'users', uid)
    const userDocSnapShot = await getDoc(userDocRef)

    // when false returned, this is executed
    if (!userDocSnapShot.exists()) {

        const createdAt = new Date()
        try {
                await setDoc(userDocRef, {
                userName: userName ? userName : displayName,
                userEmail: email,
                createdAt
            })
        } catch(error) {
            console.log("The following error occurred while setting the doc ref:", error)
        }
    }

    return userDocSnapShot
}
