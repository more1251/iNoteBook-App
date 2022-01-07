import React,{useState} from 'react'
import {useNavigate} from "react-router-dom";

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword: ""})
    
    let navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser",{ 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
        });
        const json =  await response.json();
        // console.log(json);

        if(json.success){

            //Redirect to login and save the authtoken
            localStorage.setItem('token', json.authtoken);
            props.showAlert("User Registered Successfully","success");
            navigate("/login");
        }
        else{
            props.showAlert("User with this E-mail Already Exists","danger");
        }

    }

    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <form  className="position-absolute top-50 start-50 translate-middle my-auto" onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Your Name</label>
                    <input type="text" className="form-control" id="name" name="name"  onChange={onChange}  required minLength={3} style={{width:"500px"}} aria-describedby="emailHelp"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email"  onChange={onChange} required style={{width:"500px"}} aria-describedby="emailHelp"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" style={{width:"500px"}} id="password1" name="password" required minLength={5} onChange={onChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" style={{width:"500px"}} id="cpassword1" name="cpassword" required onChange={onChange}/>
                </div>

                
                <button type="submit" className="btn btn-primary">SignUp</button>
            </form>
        </div>
    )
}

export default Signup
