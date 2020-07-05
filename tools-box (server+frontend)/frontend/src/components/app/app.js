import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from '../../pages/home';
import Nots from '../../pages/notes';
import Bets from '../../pages/bets';
import AppLogin from '../login';
import AppReg from '../form-register';
import Navbar from '../navbar';
import NoteAlert from '../../components/alert';
import AlertState from '../../context/alert/AlertState';

const App = () => {
  const [logInSystem, setLogInSystem] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');

  function loginSuccess(status,email) {
    if(status === 200) {
        setLogInSystem(true);
    } else {
        setLogInSystem(false);
    }
    setLoginEmail(email);
  };

  return (
    <AlertState>
      <BrowserRouter>
        <Navbar logInSystem={logInSystem}/>
        <div className="container pt-4">
          <NoteAlert />
          <Switch>
            <Route path={'/'} exact component={Home}/>
            {
              logInSystem === true && <Route path={'/note'} render={() => (
                <Nots loginEmail={loginEmail}/>
              )}/>
            }
            <Route path={'/bets'} component={Bets}/>
            <Route path={'/login'} render={() => (
              <AppLogin loginSuccess={loginSuccess} logInSystem={logInSystem}/>
            )}/>
            <Route path={'/create-account'} component={AppReg}/>
          </Switch>
        </div>
      </BrowserRouter>
    </AlertState>
  );
}

export default App;
