import React, {useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { AlertContext } from '../../context/alert/alertContext';

const AppReg = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [status, setStatus] = useState(0);
    const history  = useHistory();
    const alert = useContext(AlertContext);

    function RegAccount() {
        setStatus(0);
        const body = new URLSearchParams();
        body.append("email", `${email}`);
        body.append("password", `${pass}`);

        fetch(`http://localhost:3001/login/register`,
        { 
            method: 'post', 
            body, 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then((response) => {
            if(response.status === 200) {
                alert.show('Account has been created','success');
                setTimeout(alert.hide, 2000);
                history.push("/login");
            } else {
                setStatus(response.status)
            }
        });
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
                    {status === 403 &&
                        <span className="text-danger">Email is already registered</span>
                    }
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary" onClick={()=>RegAccount()}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default AppReg;