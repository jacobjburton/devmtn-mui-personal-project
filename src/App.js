import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import routes from './routes';

class App extends Component 
{
  render() 
  {
    return (
      <div className='App'>
        <Navbar/>
        <div className='body'>
          {routes}
        </div>
      </div>      
    );
  }
}

export default App;
