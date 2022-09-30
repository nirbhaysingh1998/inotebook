import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {

    const [creadentials, setcreadentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    let history = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        // with the help of destructuring taking our name email password so instead of credentials.name simply write name
        const { name, email, password } = creadentials
        // fetch("http://localhost:5000/api/auth/login")

        const response = await fetch('http://localhost:5000/api/auth/createuser', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json',

            },
            // jo api ke body me send karna hai usme ham email aur pass assign kar rahe hai
            body: JSON.stringify({ name, email, password })

        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // save the token  and redirect
            localStorage.setItem('token', json.authToken);
            history("/home");
            props.showAlert("Account created successfully", "success");
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
                <div className="mb-3">
                    <label htmlFor="name" class="form-label">Name</label>
                    <input type="name" class="form-control" id="name" onChange={onChange} name="name" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" class="form-label">Password</label>
                    <input type="password" class="form-control" onChange={onChange} id="password" name="password" required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" class="form-label"> Confirm Password</label>
                    <input type="password" class="form-control" onChange={onChange} id="cpassword" name="cpassword" required minLength={5} />
                </div>


                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
