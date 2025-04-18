import React, { useEffect, useState } from 'react'

const About = () => {

  const [name, setName] = useState("");

  useEffect(() => {
    trial();
  }, [])

  const trial = async() => {
    if(localStorage.getItem('token')){
      const response = await fetch(`http://localhost:3600/api/auth/getuser`, {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
          }
      });

      const Capitalize = (word) => {
        const lower = word.toLowerCase()
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }

      const json = await response.json();
      setName(Capitalize(json.name));
    }
  }

  return (
    <div className='container'>
      <header><h1 className='fst-italic fw-semibold text-center'>Oops! {name !== "" ? `${name}, ` : ""}Your Opinion is Invalid!</h1></header>
      <img style={{marginLeft: '369px'}} src="https://i.pinimg.com/474x/ce/50/bb/ce50bbda82a740097a27c64eaa2e7830.jpg" alt="" />
    </div>
  )
}

export default About;