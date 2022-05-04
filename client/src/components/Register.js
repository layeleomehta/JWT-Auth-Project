import React, {Fragment, useState} from 'react'
import { toast } from 'react-toastify';

function Register({setAuth}) {
  const [inputs, setinputs] = useState({
    username: "", 
    email: "", 
    password: ""
  })


  const onChange = (e) => {
    setinputs({...inputs, [e.target.name]: e.target.value}); 
  }

  const onSubmitForm = async (e) => {
    e.preventDefault(); 

    try {
      const {username, email, password} = inputs; 
      const body = {username, email, password}; 
      const response = await fetch(
        "http://localhost:4000/authentication/register", 
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
        toast.success("You have successfully registered!")
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
      <h1 className='text-center my-5'>Register</h1>
      <form onSubmit={onSubmitForm}>
      <div className="mb-3">
          <label className="form-label">Username</label>
          <input name='username' type="text" className="form-control" onChange={(e) => onChange(e)}/>
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => onChange(e)}/>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input name='password' type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => onChange(e)}/>
        </div>
        <button type="submit" className="btn btn-success mb-1">Submit</button>
      </form>
    </Fragment>
  )
}

export default Register; 