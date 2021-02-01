import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <div className="containerBI">
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path='/' exact component={HomePage} />
        <Route path='/about' exact component={AboutPage} />
        <Route path='/contact' exact component={ContactPage} />
      </Switch>
    </div>
  );
}

export default App;