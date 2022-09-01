import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./routes/Home/Home.jsx"
import Shop from "./routes/Shop/Shop.jsx"
import NavBar from "./components/navbar/NavBar.jsx"
import SignIn from "./routes/SignIn/SignIn.jsx"

const App = () => {
  return (
    <Routes>
    
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home/>} />
        <Route path="shop" element={<Shop />}/>
        <Route path="login" element={<SignIn />}/>
      </Route>
       
    </Routes>
  )
}

export default App