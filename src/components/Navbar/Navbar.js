import React from 'react';
import './Navbar.css';
import AppBar from 'material-ui/AppBar';



class Navbar extends React.Component
{


    render()
    {
        return (
            <div className="Navbar">
                <AppBar
                    title="SwimSwamSwum"
                    iconElementLeft={<img src={require('../../files/img/swimming-icon-23788.png')} alt="logo" className="logo"/>}
                    iconClassNameRight="navigation-menu"
                >
                    {/* <img src={require('../../files/img/swimming-icon-23788.png')} alt="logo" className="logo"/> */}

                </AppBar>
            </div>
        )
    }
}


export default Navbar;