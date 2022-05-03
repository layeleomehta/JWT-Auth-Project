import React, {Fragment, useState, useEffect} from 'react'; 

function Dashboard({setAuth}) {
  const [name, setName] = useState(""); 

  async function getName() {
    try {
      const response = await fetch("http://localhost:4000/dashboard/", {
        method: "GET", 
        headers: {"token": localStorage.token}
      }); 
      const parsedRes = await response.json(); 
      console.log(parsedRes); 
      setName(parsedRes.user_name); 
    } catch (err) {
      console.error(err.message); 
    }
  }

  const logout = (e) => {
    e.preventDefault(); 
    localStorage.clear(); 
    setAuth(false);
  }

  useEffect(() => {
    getName(); 
  }, []) 

  return (
    <Fragment>
      <h1>Dashboard page for: {name}</h1>
      <button onClick={(e) => logout(e)}>Logout</button>
    </Fragment>
  ) 
}

export default Dashboard; 