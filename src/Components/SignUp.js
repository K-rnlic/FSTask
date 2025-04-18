import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {

    const [user, setUser] = useState({firstName: "", lastName: "", email: "", dateOfBirth: "", zipCode: "", password: "", cpassword: ""});
    let navigate = useNavigate();
    const {firstName, lastName, email, dateOfBirth, zipCode, password} = user;
    const handleSubmit = async (e) => {
            e.preventDefault();
            const response = await fetch(`http://localhost:3600/api/auth/createuser`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({firstName, lastName, email, dateOfBirth, zipCode, password}),
            });

            const json = await response.json();
            (json.success && dtCheck(dateOfBirth)) ? (() => {localStorage.setItem('token', json.auth_token); props.showAlert("Account Created Successfully", "success", true); navigate("/");})() : (() => {props.showAlert(`Error: ${json.errors ? json.errors[0].msg : "Internal Server Error"}`, "danger", false)})()
    }

    const onChange = (e) => {
        setUser({...user , [e.target.name]: e.target.value})
        }

    const dtCheck = (value) => {
            const dob = new Date(value);
            const today = new Date();
            const ageDiff = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            const dayDiff = today.getDate() - dob.getDate();
            let age = ageDiff;
            if(monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)){ age--; }
            if(age < 18){ throw new Error("You must be atleast 18 years old to register!"); }
            return true;
        };

  return (
    <div className='container my-3'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label fst-italic">First Name</label>
            <input type="text" className="form-control" id="exampleInputName1"  name="firstName" aria-describedby="nameHelp" value={user.firstName} onChange={onChange} required minLength={3} placeholder='Alex'/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputName2" className="form-label fst-italic">Last Name</label>
            <input type="text" className="form-control" id="exampleInputName2"  name="lastName" aria-describedby="nameHelp" value={user.lastName} onChange={onChange} required minLength={3} placeholder='Prince'/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fst-italic">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1"  name="email" aria-describedby="emailHelp" value={user.email} onChange={onChange} required placeholder='example@email.com'/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputDate" className="form-label fst-italic">Date of Birth</label>
            <input type="date" className="form-control" id="exampleInputDate"  name="dateOfBirth" aria-describedby="dateHelp" value={user.dateOfBirth} onChange={onChange} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label fst-italic">Zip Code</label>
            <input type="text" className="form-control" id="exampleInputAddress"  name="zipCode" aria-describedby="zipCodeHelp" value={user.zipCode} onChange={onChange} required placeholder='000000' minLength={6} maxLength={6}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label fst-italic">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={user.password} onChange={onChange} required minLength={9} placeholder='Password'/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputCPassword1" className="form-label fst-italic">Confirm Password</label>
            <input type="password" className="form-control" id="exampleInputCPassword1" name="cpassword" value={user.cpassword} onChange={onChange} required minLength={9} placeholder='Confirm Password'/>
            <div id="passwordHelpBlock" className="form-text text-warning">
                {user.password===user.cpassword ? "" : "Password and Confirm Password must be matching!"}
            </div>
        </div>
        <button disabled={user.password.length < 9 || user.firstName.length < 3 || user.lastName.length < 3 || user.zipCode.length !== 6 || user.password!==user.cpassword} type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  );
}

export default SignUp;
