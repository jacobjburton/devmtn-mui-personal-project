import React, { Component } from 'react';
//import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import './AddEvent.css';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { getMeetNames } from '../../redux/reducer';

const style = {
    marginLeft: 20
};

class AddEvent extends Component
{
    constructor()
    {
        super()

        this.state =
        {
            date: null,
            format: null,
            eventName: '',
            raceName: ''
        };

        this.dateChange = this.dateChange.bind(this);
        this.formatChange = this.formatChange.bind(this);
    }
    
    componentDidMount()
    {
        if (this.props.user)
        {
            console.log(this.props.user.id)
            this.props.getMeetNames(this.props.user.id);
        }
        else
        {
            alert('Please log in to add information');
            this.props.history.push('/')
        }
    }

    dateChange(date)
    {
        this.setState({ date: date });    
    }

    formatChange = (event, index, value) => this.setState({format:value});

    addEvent()
    {
        
    }

    eventChange = (event, index, value) => this.setState({eventName: value});
   

    render()
    {   
        console.log(this.props.meets)
        let menuEvents = this.props.meets.map((event, i) => 
                        {
                            return (
                                <MenuItem key={i} value={i+1} primaryText={`${event.mname}`}/> 
                            )
                        });
        return (
            <div className="addEvents">
                <div className="addMeetBox">
                    <h2>Add Swim Meet</h2>
                    <TextField hintText="Event Name?"/>
                    <DatePicker 
                        hintText="Date of Event"
                        value={this.state.date}
                        onChange={this.dateChange}
                    />
                    <SelectField
                        floatingLabelText="Event Format"
                        value={this.state.format}
                        onChange={this.formatChange}
                    >
                        <MenuItem value={1} primaryText={''}/>
                        <MenuItem value={2} primaryText={'SCY'}/>
                        <MenuItem value={3} primaryText={'LCM'}/>
                    </SelectField>
                    <RaisedButton 
                        label="Add Event" 
                        style={style}
                        onClick={this.addEvent}
                    />
                </div>
                <div className='addRaceBox'>
                    <h2>Add Race</h2>
                    <SelectField
                        floatingLabelText="Where Swam"
                        value={this.state.eventName}
                        onChange={this.eventChange}
                    >
                        <MenuItem value={1} primaryText={''}/>
                        {menuEvents}
                    </SelectField> 
                </div>
            </div>
        )
    }
}

function mapStateToProps(state)
{
    return (
    {
        user: state.user,
        meets: state.meets
    });
}

export default connect(mapStateToProps, { getMeetNames })(AddEvent);