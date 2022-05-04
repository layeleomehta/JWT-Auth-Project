import React, {Fragment, useState} from 'react'
import {useNavigate} from 'react-router-dom'; 
import { toast } from 'react-toastify';

function Login({setAuth}) {
  let navigate = useNavigate(); 

  const [inputs, setinputs] = useState({
    email: "", 
    password: ""
  }); 

  const {email, password} = inputs; 

  const onChange = (e) => {
    setinputs({...inputs, [e.target.name] : e.target.value})
  }; 

  const onSubmitForm = async (e) => {
    e.preventDefault(); 

    try {
      const body = {email, password}; 
      const response = await fetch(
        "http://localhost:4000/authentication/login", 
        {
          method: "POST", 
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      ); 

      const parseRes = await response.json(); 
      if(parseRes.jwtToken){
        setAuth(true);
        localStorage.setItem("token", parseRes.jwtToken); 
        toast.success("You have logged in!")
      } else{
        setAuth(false); 
        toast.error(parseRes)
      }

    } catch (err) {
      console.error(err.message); 
      
    }
  }

  return (
    <Fragment>
      <h1 className='text-center my-5'>Login</h1>

      <form onSubmit={onSubmitForm}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          name='email'  onChange={e => onChange(e)} />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"
          name='password' onChange={e => onChange(e)}/>
        </div>
        <button type="submit" className="btn btn-success mb-1">Submit</button>
      </form>

      <button className='btn btn-primary' onClick={() => navigate("/register")}>Don't have an account? Click here to register!</button>
    </Fragment>
  )
}

export default Login; 