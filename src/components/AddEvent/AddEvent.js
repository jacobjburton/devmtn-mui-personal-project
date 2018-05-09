import React, { Component } from 'react';
//import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import './AddEvent.css';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { getMeetNames, addNewMeet } from '../../redux/reducer';
import moment from 'moment';

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
            formattedDate: '',
            format1: null,
            format2: null,
            newEventName: '',
            eventName: '',
            raceName: '',
            raceTime: ''
            
        };

        this.dateChange = this.dateChange.bind(this);
        this.format1Change = this.format1Change.bind(this);
        this.newEventChange = this.newEventChange.bind(this);
        this.addMeetClick = this.addMeetClick.bind(this);
        this.format2Change = this.format2Change.bind(this);
        this.eventChange = this.eventChange.bind(this);
        this.raceChange = this.raceChange.bind(this);
        this.timeChange = this.timeChange.bind(this);
    }
    
    componentDidMount()
    {
        if (this.props.user)
        {
            console.log('userid', this.props.user.id)
            this.props.getMeetNames(this.props.user.id);
        }
        else
        {
            alert('Please log in to add information');
            this.props.history.push('/')
        }
    }

    dateChange = (event, date) => 
    {  
        var formattedDate = ''; 
        function formatDate (date)
        {
            let month = date.getMonth()+1;
            if (month < 10)
            {
                month = '0' + month;
            }
            let day = date.getDate();
            if (day < 10)
            {
                day = '0' + day;
            }
            let year = (date.getFullYear()).toString();
            let splitYear = year.split('')
            let formattedDate = '';
            for (var i = 0; i < 2; i++)
            {
                splitYear.shift();
            }
            year = splitYear.join('');
            formattedDate = month+'/'+day+'/'+year;
            return formattedDate;
        }
        formattedDate = formatDate(date); 
        this.setState(
        {
            date: date,
            formattedDate: formattedDate
        });
    }

    newEventChange = (event, value) => this.setState({newEventName: value});

    format1Change = (event, index, value) => this.setState({format1: value});
    
    format2Change = (event, index, value) => this.setState({format2: value});

    addMeetClick()
    {
                                                             
        let { formattedDate, newEventName, format1 } = this.state;
        let { id } = this.props.user;
        //formatDate(date);
        console.log(formattedDate, newEventName, format1, id)
        this.props.addNewMeet(formattedDate, newEventName, format1, id);
    }

    eventChange = (event, index, value) => this.setState({eventName: value});
   
    raceChange = (event, index, value) => this.setState({raceName: value});

    timeChange = (event, index, value) => this.setState({raceTime: value});

    render()
    {   
        var formatLabel = '';
        let {formattedDate, format1, newEventName} = this.state;
        
        if (this.props.user)
        {
            
            console.log(formattedDate, newEventName, format1, this.props.user.id);
        }
        
        
        if(this.state.format2)
        {
            
            if (this.state.format2 === "SCY")
            {
                formatLabel = "Yard";
            }
            else 
            {
                formatLabel = "Meter";
            }
        }

        let menuEvents = this.props.meets.map((event, i) => 
        {
            return (
                <MenuItem key={i} value={event.mname} primaryText={`${event.mname}`}/> 
            )
        });
        return (
            <div className="addEvents">
                <div className="addMeetBox">
                    <h2 className="boxTitle">Add Swim Meet</h2>
                    <TextField 
                        floatingLabelText="Event Name"
                        floatingLabelFixed={true}
                        value={this.state.newEventName}
                        onChange={this.newEventChange}
                    />
                    <DatePicker 
                        hintText="Date of Event"
                        value={this.state.date}
                        onChange={this.dateChange}
                        formatDate={(date) => moment(date).format('MM/DD/YY')}
                    />
                    <SelectField
                        floatingLabelText="Event Format"
                        value={this.state.format1}
                        onChange={this.format1Change}
                    >
                        {/* <MenuItem value={1} primaryText={''}/> */}
                        <MenuItem value={'SCY'} primaryText={'SCY'}/>
                        <MenuItem value={'LCM'} primaryText={'LCM'}/>
                    </SelectField>
                    <RaisedButton 
                        label="Add Event" 
                        style={style}
                        onClick={this.addMeetClick}
                    />
                </div>
                <div className='addRaceBox'>
                    <h2 className="boxTitle">Add Race</h2>
                    <SelectField
                        floatingLabelText="Meet"
                        value={this.state.eventName}
                        onChange={this.eventChange}
                    >
                        {/* <MenuItem value={1} primaryText={''}/> */}
                        {menuEvents}
                    </SelectField> 
                    <SelectField
                        floatingLabelText="Event Format"
                        value={this.state.format2}
                        onChange={this.format2Change}
                    >
                        {/* <MenuItem value={1} primaryText={''}/> */}
                        <MenuItem value={'SCY'} primaryText={'SCY'}/>
                        <MenuItem value={'LCM'} primaryText={'LCM'}/>
                    </SelectField>
                    <SelectField
                        floatingLabelText="Race"
                        value={this.state.raceName}
                        onChange={this.raceChange}
                    >
                        <MenuItem value={`50 ${formatLabel} Freestyle`} primaryText={`50 ${formatLabel} Freestyle`}/>
                        <MenuItem value={`100 ${formatLabel} Freestyle`} primaryText={`100 ${formatLabel} Freestyle`}/>
                        <MenuItem value={`200 ${formatLabel} Freestyle`} primaryText={`200 ${formatLabel} Freestyle`}/>
                        <MenuItem value={`500 ${formatLabel} Freestyle`} primaryText={`500 ${formatLabel} Freestyle`}/>
                        <MenuItem value={`1000 ${formatLabel} Freestyle`} primaryText={`1000 ${formatLabel} Freestyle`}/>
                        <MenuItem value={`1650 ${formatLabel} Freestyle`} primaryText={`1650 ${formatLabel} Freestyle`}/>
                        <MenuItem value={`100 ${formatLabel} Backstroke`} primaryText={`100 ${formatLabel} Backstroke`}/>
                        <MenuItem value={`200 ${formatLabel} Backstroke`} primaryText={`200 ${formatLabel} Backstroke`}/>
                        <MenuItem value={`100 ${formatLabel} Breastroke`} primaryText={`100 ${formatLabel} Breastroke`}/>
                        <MenuItem value={`200 ${formatLabel} Breastroke`} primaryText={`200 ${formatLabel} Breastroke`}/>
                        <MenuItem value={`100 ${formatLabel} Butterfly`} primaryText={`100 ${formatLabel} Butterfly`}/>
                        <MenuItem value={`200 ${formatLabel} Butterfly`} primaryText={`200 ${formatLabel} Butterfly`}/>
                        <MenuItem value={`200 ${formatLabel} IM`} primaryText={`200 ${formatLabel} IM`}/>
                        <MenuItem value={`400 ${formatLabel} IM`} primaryText={`400 ${formatLabel} IM`}/>
                    </SelectField>
                    <TextField 
                        floatingLabelText="Time"
                        floatingLabelFixed={true}
                        value={this.state.raceTime}
                        onChange={this.timeChange}
                    />
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

export default connect(mapStateToProps, { getMeetNames, addNewMeet })(AddEvent);