import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import { CredentialContext } from "../App";
import {handleErrors} from './Login';

export default function Register() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [ ,setCredentials] = useContext(CredentialContext);

    const register = (e)=>{
        e.preventDefault();
        fetch("http://localhost:4000/register",{
            method: "POST",
            headers: {
                "Content-type":"application/json",
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(handleErrors)
        .then(()=>{
            setCredentials({
                username,
                password,
            });
            history.push('/');
        })
        .catch((error)=>{
          setError(error.message);  
        })
    }

    const history = useHistory();
    return (
        <div>
        <h1 className="text-center text-dark">Register</h1>
            <form onSubmit={register}>
            {!!error && <span style={{color: "red"}}>{error}</span>}<br/>
           <input onChange={(e)=>setUsername(e.target.value)} placeholder="username"></input>
              <br/>
              <input type="password" onChange={(e)=> setPassword(e.target.value)} placeholder="password"></input>
              <br />
              <button type="submit">Register</button>
            </form>
        </div>
    )
}
