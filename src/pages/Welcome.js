import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CredentialContext } from "../App";
import  Todos from "../components/Todos";

export default function Welcome() {
  const [credentials, setCredentials] = useContext(CredentialContext);
  const logout = () =>{
      setCredentials(null);
  }
    return (
        <div>
        {credentials && <button onClick={logout}>Log Out</button>}
          <h1>Welcome {credentials && credentials.username}</h1> 
          {!credentials && <Link to="/register">Register</Link>}
          <br/>
          {!credentials && <Link to="/login">Login</Link>}
          {credentials && <Todos/>}
        </div>
    )
}
