import React, { Component } from 'react';
import './Events.css';
//import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import { connect } from 'react-redux';
import { getEventData, deleteRace } from '../../redux/reducer';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

const  dropdownStyle = 
{
    customSize: 
    {
        width: 310,
        height: 45,
    },
}, style = {
    marginLeft: 20
};



class Events extends Component
{
    constructor()
    {
        super();

        this.state =
        {
            editRace: false,
            indexToEdit: 0
        }

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

    editRace(id)
    {
        console.log(id)
        //let findIt = this.props.events.indexOf(this.props.events.id);
        console.log(this.props.events[id].rname)
        this.setState({ editRace: true, indexToEdit: id })
    }


    
    render()
    {
        console.log(this.props.events);
        
        let { indexToEdit } = this.state;
        if (this.props.events)
        {
            console.log(this.props.events[indexToEdit]);
        }

        var displayEdit;
        // const { username, mName, mDate, mFormat, rName, rTime } = this.state.events;
        if (this.state.editRace)
        {
            displayEdit =
            (
                <div className='table'>
                    <TextField
                        floatingLabelText="Event Name"
                        floatingLabelFixed={true}
                        value={this.props.events[indexToEdit].mname}
                        onChange={this.eventNameEdit}
                    />
                    <DatePicker
                        hintText="Event Date"
                        value={this.state.date}
                        onChange={this.eventDateEdit}
                    />
                    <SelectField
                        floatingLabelText={`${this.props.events[indexToEdit].mformat}`}
                        value={this.state.format}
                        onChange={this.formatChange}
                    >
                        <MenuItem value={1} primaryText={'Change Format To:'}/> 
                        <MenuItem value={'SCY'} primaryText={'SCY'}/>
                        <MenuItem value={'LCM'} primaryText={'LCM'}/>
                    </SelectField> 
                    <TextField
                        floatingLabelText={this.props.events[indexToEdit].rname}
                        defaultValue="Change Race"
                        value={this.newRace}
                        onChange={this.raceChange}
                    />
                    <TextField
                        floatingLabelText={this.props.events[indexToEdit].rtime}
                        defaultValue="Change Time"
                        value={this.newRaceTime}
                        onChange={this.raceChange}
                    />
                    <RaisedButton 
                        label="Submit" 
                        style={style}
                        primary={true}
                        onClick={this.editRaceSubmit}
                    />
                </div>
            )
        }

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
                            <th className='header'>Race #</th>
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
                                    <td>{i+1}</td>
                                    <td>{event.mname}</td>
                                    <td>{event.mdate}</td>
                                    <td>{event.mformat}</td>
                                    <td>{event.rname}</td>
                                    <td>{event.rtime}</td>
                                    <td>
                                        <button
                                            onClick={() => this.editRace(i)}
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
                {displayEdit}
                
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