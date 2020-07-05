import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

const AppLogin = ({loginSuccess,logInSystem}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [logIn, setLogIn] = useState('');

    function SignAccount() {
        setLogIn('');
        const body = new URLSearchParams();
        body.append("email", `${email}`);
        body.append("password", `${pass}`);

        fetch(`http://localhost:3001/login/loginAccount`,
        { 
            method: 'post', 
            body, 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        ).then((response) => {
            if(response.status === 200) {
                loginSuccess(response.status, email)
                setLogIn(true)
            } else {
                setLogIn(false)
            }
        });
        
    };

    if(logInSystem === true) {
        return(
            <div className="form-group row">
                <div className="col-sm-12">
                    <h3 className="text-success">You are registered</h3>
                    <NavLink className="btn btn-primary" to="/login" onClick={()=>loginSuccess(403,'')}>Exit</NavLink>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input 
                        type="email" 
                        className="form-control" 
                        id="inputEmail3" 
                        placeholder="Email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="inputPassword3" 
                        placeholder="Password"
                        value={pass}
                        onChange={event => setPass(event.target.value)}
                    />
                    {logIn === false &&
                        <span className="text-danger">Wrong login or password</span>
                    }
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-2">
                    <button type="submit" className="btn btn-primary" onClick={()=>SignAccount()}>Sign</button>
                </div>
                <div className="col-sm-10">
                    <NavLink type="submit" className="btn btn-link" to="/create-account">Create account</NavLink>
                </div>
            </div>
        </div>
    );
};

export default AppLogin;