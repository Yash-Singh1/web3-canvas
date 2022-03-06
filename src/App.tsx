import React, { useState, useEffect } from 'react';
import { Signin } from './Components/Signin';
import Header from './Components/Header';
import View from './Components/View';
import { ThemeProvider, theme, CSSReset, ToastProvider } from '@blockstack/ui';
import { FileSystemList } from './Components/FileSystem/FileSystemList';
import { userSession } from './auth';
import type { UserData } from '@stacks/connect';
import { Switch, Route } from 'react-router-dom';
import './index.css';

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  // function handleSignOut(e: Event) {
  //   e.preventDefault();
  //   setUserData(null);
  //   userSession.signUserOut(window.location.origin);
  // }
  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userSignInData => {
        window.history.replaceState({}, document.title, '/');
        setUserData(userSignInData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            <Header />
            <Switch>
              <Route path='/' exact render={() => userSession.isUserSignedIn() ? <FileSystemList /> : <Signin />} />
              <Route path='/view/:id' render={() => <View />} />
            </Switch>
          </div>
        </div>
      </ToastProvider>
      <CSSReset />
    </ThemeProvider>
  );
}

export default App;
