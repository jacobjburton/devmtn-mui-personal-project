import React, { Component } from 'react';
import './Events.css';
//import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { getEventData } from '../../redux/reducer';

const  dropdownStyle = 
{
    customSize: 
    {
        width: 310,
        height: 45,
    },
}//, style = {
//     height: 500,
//     width: 1500,
//     margin: 20,
//     textAlign: 'center',
//    // display: 'inline-block'
// };



class Events extends Component
{
    constructor()
    {
        super();

        this.state =
        {
            events: []
        }
    }


    componentDidMount()
    {
        console.log('firing?`')
        axios.get('/api/events').then(res => 
        {   
            console.log('getting here?')
            this.setState({ events: res.data })
            console.log(this.state.events);
        });
    }

    
    render()
    {
        // const { username, mName, mDate, mFormat, rName, rTime } = this.state.events;
        

        return (
            <div className="body">
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
                {/* <div >
                    <h4>
                        Swimmer: {'   '} Event Name: {'   '} Event Date: {'   '}
                        Event Format: {'   '} Race: {'   '} Time: {'   '}
                    </h4>
                </div> */}
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Swimmer</th>
                            <th>Event Name</th>
                            <th>Event Date</th>
                            <th>Event Format</th>
                            <th>Race</th>
                            <th>Time</th>    
                       </tr>
                    </thead>   
                    <tbody>{this.state.events.map((event, i) =>
                    {
                        return (
                            <tr key={i}>
                                    <td>{event.username}</td>
                                    <td>{event.mname}</td>
                                    <td>{event.mdate}</td>
                                    <td>{event.mformat}</td>
                                    <td>{event.rname}</td>
                                    <td>{event.rtime}</td>
                            </tr>
                        );
                    })
                    }
                    </tbody>
                </table>
                {/* <Paper style={style} zDepth={5}/> */}
            </div>
        )
    }
}

// function mapStateToProps(state)
// {
//     return (
//     {
//         events: state.events
//     });
// }

export default Events;