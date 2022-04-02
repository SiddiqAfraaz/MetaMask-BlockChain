import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FileUpload from './components/pages/FileUpload';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/sign-up' component={SignUpForm} />
          <Route path='/upload' component={FileUpload} />
          <Route path='/sign-in' component={SignInForm} />

        </Switch>
      </Router>
    </>
  );
}

export default App;
