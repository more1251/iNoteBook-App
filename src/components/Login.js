import React,{useState} from 'react'
import {useNavigate} from "react-router-dom";
import UserFetch from './UserFetch';

const Login = (props) => {
    

    const [credentials, setCredentials] = useState({email: "", password: ""})
    
    let navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{ 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json =  await response.json();
        console.log(json);

        if(json.success){

            //Redirect to Add Note and save the authtoken
            localStorage.setItem('token', json.authtoken);
            UserFetch();
            props.showAlert("User Logged in Successfully","success");
            navigate("/");
        }
        else{
            props.showAlert("Please Login with Correct Credentials","danger");
        }

    }

    const onChange =(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value });
    }
 
    
    return (
        <div>
            <form  className="position-absolute top-50 start-50 translate-middle my-auto" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} style={{width:"500px"}} aria-describedby="emailHelp"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" style={{width:"500px"}} id="password1" name="password" value={credentials.password} onChange={onChange}/>
                </div>

                
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
