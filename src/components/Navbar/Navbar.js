import React from 'react';
import './Navbar.css';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { getUser } from '../../redux/reducer';





class Navbar extends React.Component
{
    
    componentDidMount()
    {
        this.props.getUser();  
    }

    render()
    {
        //console.log(this.props.user);
        let loggedInDisplay = this.props.user ? 
            <FlatButton                  
                href={process.env.REACT_APP_LOGOUT}
                label="Logout" className="button"
            />
            :
            <FlatButton
                href={process.env.REACT_APP_LOGIN}
                label="Login" className="button"
            />;
        
        
        
        return (
            <div className="Navbar">
                <AppBar
                    title="SwimSwamSwum"
                    iconElementRight={
                        <div className="loginAndLogo">
                            <img src={require('../../files/img/swimming-icon-23788.png')}       alt="logo" className="logo"
                            />
                            {loggedInDisplay}
                        </div>
                    }
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
                        </IconMenu>
                    }
                >
                </AppBar>
            </div>
        )
    }
}

function mapStateToProps(state)
{
    return (
    {
        user: state.user
    });
}

export default connect(mapStateToProps, { getUser })(Navbar);