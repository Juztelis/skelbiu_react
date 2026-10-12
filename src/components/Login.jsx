// import React from 'react'
// import { useState } from 'react'
// export const Login = () => {
// const [username, setUsername] = useState("")
// const [email, setEmail] = useState("")
// const [password, setPassword] = useState("")

// const handleSubmit = (e) => {
//     e.preventDefault()
// }
//   return (
//     <div>
//         <form onSubmit={handleSubmit}>
//             <input type='text' placeholder='username'></input>
//             <input type='email' placeholder='email'></input>
//             <input type='password' placeholder='password'></input>
//         </form>
//     </div>
//   )
// }
import React from 'react'
import { useState } from 'react'
const Login = () => {
const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const handleSubmit = (e) => {
    e.preventDefault()
}

const Clicked = (e) => {
    if(email === setEmail(e.target.value) && password === setPassword(e.target.value)){
        console.log(username),
        console.log(email),
        console.log(password)
    }
}
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} required></input><br></br>
            <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required></input><br></br>
            <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} required></input><br></br>
            <button type='submit' onClick={Clicked}>Log In</button>
        </form>
    </div>
  )
}

export default Login
