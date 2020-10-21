import React, { useState } from 'react';
import { BrowserRouter,Route, Switch  } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';

export const CredentialContext = React.createContext();

function App() {
  const credentialsState = useState(null);
  return (
    <div className="App">
    <CredentialContext.Provider  value={credentialsState}>
    <BrowserRouter>
     <Switch>
         <Route exact path="/"><Welcome></Welcome></Route>
         <Route exact path="/register">
            <Register></Register>
         </Route>
         <Route exact path="/login">
            <Login></Login>
         </Route>
    </Switch>
      </BrowserRouter>
    </CredentialContext.Provider>
    </div>
  );
}

export default App;
