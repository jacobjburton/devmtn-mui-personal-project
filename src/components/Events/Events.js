import React, { Component } from 'react';
import './Events.css';
//import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
//import TextField from 'material-ui/TextField';
//import axios from 'axios';
import { connect } from 'react-redux';
import { getEventData, deleteRace } from '../../redux/reducer';

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

        this.deleteRace = this.deleteRace.bind(this);
        this.editRace = this.editRace.bind(this);
    }


    componentDidMount()
    {
        //console.log('firing?', this.props.user)
        if (this.props.user)
        {
            this.props.getEventData(this.props.user.id);
        }
        else
        {
            alert('Please log in to see events');
            this.props.history.push('/');
        }
    }

    deleteRace(id)
    {
        console.log(id);
        this.props.deleteRace(id);        
    }

    editRace()
    {

    }

    render()
    {
        // const { username, mName, mDate, mFormat, rName, rTime } = this.state.events;
        

        return (
            <div className="body">
            
                <DropDownMenu 
                    //value={this.state.value}
                    //onChange={this.handleChange}
                    style={dropdownStyle.customSize}
                    //autoWidth={false}
                    className="menu"
                >
                    <MenuItem value={''} primaryText='Select Data Table' />          
                    {/* <MenuItem value={''} primaryText='' />           */}
                </DropDownMenu>
                    
                
                <table className='table'>
                    <thead>
                        <tr className='th'>
                            {/* <th className='header'>Swimmer</th> */}
                            <th className='header'>Event Name</th>
                            <th className='header'>Event Date</th>
                            <th className='header'>Event Format</th>
                            <th className='header'>Race</th>
                            <th className='header'>Time</th>    
                       </tr>
                    </thead>   
                    <tbody>{this.props.events.map((event, i) =>
                    {
                        console.log(event.rid)
                        return (
                            <tr key={i} className='columns'>
                                    {/* <td>{event.username}</td> */}
                                    <td>{event.mname}</td>
                                    <td>{event.mdate}</td>
                                    <td>{event.mformat}</td>
                                    <td>{event.rname}</td>
                                    <td>{event.rtime}</td>
                                    <td>
                                        <button
                                            onClick={this.editRace}
                                        >edit</button>
                                        <button
                                            onClick={() => this.deleteRace(event.rid)}
                                        >delete</button>
                                    </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                
            </div>
        )
    }
}

function mapStateToProps(state)
{
    return (
    {
        user: state.user,
        events: state.events
    });
}


//export default Events;
export default connect(mapStateToProps, { getEventData, deleteRace })(Events);