import React, { useState, useEffect } from "react";
import { auth, createUserDocFromAuth } from "../../utils/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"
import FormField from "../form-field/FormField";

const SignUpForm = () => {
  const defaultFormFields = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, confirmPassword } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  useEffect(() => {
    console.log(formFields);
  }, [formFields]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match")
    }

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      createUserDocFromAuth(response.user, name)
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create account, email already in use")
      } else {
        console.log(`Error while creating user credentials: ${error}`)
      }
    }

    setFormFields(defaultFormFields)
  }

  return (
    <div>
      <h1>I don't have an account</h1>
      <form onSubmit={handleSubmit}>
        
        <FormField
          label="Name"
          inputOptions={{
            type: "text",
            name: "name",
            required: true,
            autoComplete: "name",
            onChange: handleChange,
            value: name
          }}
        />
        <FormField
          label="Email Address"
          inputOptions={{
            type: "email",
            name: "email",
            required: true,
            autoComplete: "email",
            onChange: handleChange,
            value: email
          }}
        />
        <FormField
          label="Password"
          inputOptions={{
            type: "password",
            name: "password",
            required: true,
            autoComplete: "new-password",
            onChange: handleChange,
            value: password
          }}
        />

        <FormField
          label="Confirm Password"
          inputOptions={{
            type: "password",
            name: "confirmPassword",
            required: true,
            autoComplete: "new-password",
            onChange: handleChange,
            value: confirmPassword
          }}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
