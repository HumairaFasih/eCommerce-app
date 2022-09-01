import React, { useEffect } from 'react'
import { signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { auth, provider, createUserDocFromAuth } from '../../utils/firebase/firebase'
import SignUpForm from '../../components/sign-up-form/SignUpForm'

const SignIn = () => {

  useEffect(() => {
    setUser()
  }, [])

  const googleRedirectSignIn = async () => {
    await signInWithRedirect(auth, provider) 
  }

  const setUser = async () => {
    const resultObj = await getRedirectResult(auth)
    if (resultObj) {
      createUserDocFromAuth(resultObj.user)
    }
  }
  
  return (
    <div>
      <h1>This is the Sign In page</h1>
      <button onClick={() => googleRedirectSignIn()}>Sign In With Google</button>
      <SignUpForm/>
    </div>
  )
}

export default SignIn