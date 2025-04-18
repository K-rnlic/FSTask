import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [user, setUser] = useState({email: "", password: ""});
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
            e.preventDefault();
            const response = await fetch(`http://localhost:3600/api/auth/login`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({email: user.email, password: user.password}),
            });

            const json = await response.json();
            json.success ? (() => {localStorage.setItem('token', json.auth_token); props.showAlert("Login Successful", "success", true); navigate("/");})() : (() => props.showAlert(`Error: ${json.error ? json.error : "Internal Server Error"}`, "danger", false))()
     }

    const onChange = (e) => {
        setUser({...user , [e.target.name]: e.target.value})
      }

  return (
    <div className='container my-3'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fst-italic">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1"  name="email" aria-describedby="emailHelp" value={user.email} onChange={onChange} required placeholder='example@email.com'/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label fst-italic">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={user.password} onChange={onChange} required minLength={9} placeholder='Password'/>
        </div>
        <button disabled={user.password.length < 9} type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  );
}

export default Login;
