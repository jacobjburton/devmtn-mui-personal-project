import React, { Component } from 'react';
import './Events.css';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

const style = {
    height: 500,
    width: 1500,
    margin: 20,
    textAlign: 'center',
   // display: 'inline-block'
}, dropdownStyle = 
{
    customSize: 
    {
        width: 310,
        height: 45,
    },
};

class Events extends Component
{
    render()
    {
        return (
            <div>
                <div className="textField">
                    <TextField
                        hintText="Search by Name"
                        
                    />
                    <DropDownMenu 
                        //value={this.state.value}
                        //onChange={this.handleChange}
                        style={dropdownStyle.customSize}
                        //autoWidth={false}
                        className="menu"
                    >
                        <MenuItem value={''} primaryText='Select Data Table' />          
                        <MenuItem value={''} primaryText='' />          
                    </DropDownMenu>
                    
                </div>
                <div >
                    
                </div>
                <Paper style={style} zDepth={5}/>
                <Paper style={style} zDepth={5}/>
            </div>
        )
    }
}

export default Events;