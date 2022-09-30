import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    // using use state we are setting the values to credentails
    const [creadentials, setcreadentials] = useState({ email: "", password: "" });

    let history = useNavigate()
    // on chnage in fields it will send the the va;lues to email and password
    //credentails.email and creaditials.password kyuki email aur pass credentails object ka  key hai

    const handleSubmit = async (e) => {
        e.preventDefault();

        // fetch("http://localhost:5000/api/auth/login")
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',

            },
            // jo api ke body me send karna hai usme ham email aur pass assign kar rahe hai
            body: JSON.stringify({ email: creadentials.email, password: creadentials.password })

        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // save the token  and redirect
            localStorage.setItem('token', json.authToken);
            history("/home");
            props.showAlert("Logged in Successfully", "info");
        }
        else {
            props.showAlert("invalid credentials", "danger");
        }
    }
    const onChange = (e) => {
        //  e.preventDefault();
        console.log("working");
        setcreadentials({ ...creadentials, [e.target.name]: e.target.value })

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label htmlFor="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" name="email" value={creadentials.email} aria-describedby="emailHelp" onChange={onChange} />

                </div>
                <div class="mb-3">
                    <label htmlFor="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" value={creadentials.password} name="password" onChange={onChange} />
                </div>

                <button type="submit" class="btn btn-primary" >Submit</button>
            </form>
        </div >
    )
}

export default Login
