import React from 'react';
import FlatButton from 'material-ui/FlatButton';


class Login extends React.Component
{
    static muiName = 'FlatButton';

    render()
    {
        return (
            <div className="loginScreen">
                <FlatButton {...this.props} label="Login"/>              
            </div>
        )
    }
}   

export default Login; 