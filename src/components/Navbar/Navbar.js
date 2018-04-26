import React from 'react';
import './Navbar.css';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
//import Login from '../Login/Login';
import FlatButton from 'material-ui/FlatButton';




class Navbar extends React.Component
{
    constructor()
    {
        super();

        this.state =
        {
            loggedIn: false
        }
        this.logoutClick = this.logoutClick.bind(this);
        this.loginClick = this.loginClick.bind(this);
    }

    static muiName = 'FlatButton';

    logoutClick() 
    {
        this.setState({ loggedIn: false });
    }
    
    loginClick()
    {
        this.setState({ loggedIn: true });
    }

    render()
    {
        
        let loggedInDisplay = this.state.loggedIn ? 
            <FlatButton onClick={this.logoutClick} label="Logout" className="button"/>
            : <FlatButton onClick={this.loginClick} label="Login" className="button"/>;
        
        return (
            <div className="Navbar">
                <AppBar
                    title="SwimSwamSwum "
                    iconElementRight={
                        <div className="loginAndLogo">
                            <img src={require('../../files/img/swimming-icon-23788.png')}       alt="logo" className="logo"
                            />
                            {loggedInDisplay}
                        </div>
                    }
                    // iconClassNameRight="navigation-menu"
                    iconElementLeft={
                        <IconMenu
                            iconButtonElement={<IconButton><NavigationMenu /></IconButton>}
                            targetOrigin={{horizontal:'left', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            // maxHeight={200}
                        >
                            <MenuItem>
                                <Link to='/' className="linkText">Home</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to='/events' className="linkText">Events</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to='/addevent' className="linkText">Add Event</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to='/timestandards' className="linkText">
                                    Time Standards
                                </Link>
                            </MenuItem>
                            {/* <MenuItem>
                                <Link to='/' className="linkText">Logout</Link>
                            </MenuItem> */}
                        </IconMenu>
                    }

                >
                    

                </AppBar>
            </div>
        )
    }
}


export default Navbar;