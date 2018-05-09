import React, { Component } from 'react';
//import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import './AddEvent.css';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { getMeetNames, addNewMeet, addNewRace } from '../../redux/reducer';
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
            format: null,
            newEventName: '',
            eventName: '',
            raceName: '',
            raceTime: ''
            
        };

        this.dateChange = this.dateChange.bind(this);
        this.formatChange = this.formatChange.bind(this);
        this.newEventChange = this.newEventChange.bind(this);
        this.addMeetClick = this.addMeetClick.bind(this);
       // this.format2Change = this.format2Change.bind(this);
        this.eventChange = this.eventChange.bind(this);
        this.raceChange = this.raceChange.bind(this);
        this.timeChange = this.timeChange.bind(this);
        this.addRaceClick = this.addRaceClick.bind(this);
    }
    
    componentDidMount()
    {
        if (this.props.user)
        {
            //console.log('userid', this.props.user.id)
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

    formatChange = (event, index, value) => this.setState({format: value});
    
   // format2Change = (event, index, value) => this.setState({format2: value});

    addMeetClick()
    {
                                                             
        let { formattedDate, newEventName, format } = this.state;
        let { id } = this.props.user;
        
        console.log(formattedDate, newEventName, format, id)
        this.props.addNewMeet(formattedDate, newEventName, format, id);
        this.setState(
        {
            formattedDate: '',
            date: null,
            newEventName: '',
            format: ''
        })
    }

    addRaceClick()
    {
        let id = 0;
        let { raceName, raceTime, eventName } = this.state;
        
        for (var i = 0; i < this.props.meets.length; i++)
        {
            if (this.props.meets[i].mname === eventName)
            {
                id = this.props.meets[i].mid;
            }
        }
        
        //let { mid } = this.props.meets;
        console.log(raceName, raceTime, id);
        this.props.addNewRace(raceName, raceTime, id)
    }

    eventChange = (event, index, value) => 
    {
        console.log(value)
        this.setState({eventName: value});
    }
   
    raceChange = (event, index, value) => 
    {   
        console.log(value);
        this.setState({raceName: value});
    }

    timeChange = (event, value) => 
    {   
        console.log(value)
        this.setState({raceTime: value});
    }

    render()
    {   
        var formatLabel = '';    
        
        if(this.state.eventName)
        {
            //console.log(this.props.meets)
            
            //console.log(this.props.meets.length)
            for (var i = 0; i < this.props.meets.length; i++)
            {
                //console.log(this.props.meets[i].mname)
                //console.log(this.props.meets[i].mformat)

                if (this.props.meets[i].mname === this.state.eventName && this.props.meets[i].mformat === "SCY")
                {
                    formatLabel = "yard";
                }
                else if (this.props.meets[i].mname === this.state.eventName && this.props.meets[i].mformat === "LCM")
                {
                    formatLabel = "meter";
                }
            }
        }

        let menuEvents = this.props.meets.map((event, i) => 
        {
            return (
                <MenuItem key={i} value={event.mname} primaryText={`${event.mname}, ${event.mformat}`}/> 
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
                        value={this.state.format}
                        onChange={this.formatChange}
                    >
                        {/* <MenuItem value={1} primaryText={''}/> */}
                        <MenuItem value={'SCY'} primaryText={'SCY'}/>
                        <MenuItem value={'LCM'} primaryText={'LCM'}/>
                    </SelectField>
                    <RaisedButton 
                        label="Add Event" 
                        style={style}
                        primary={true}
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
                        floatingLabelText="Race"
                        value={this.state.raceName}
                        onChange={this.raceChange}
                    >
                        <MenuItem value={`50 ${formatLabel} freestyle`} primaryText={`50 ${formatLabel} freestyle`}/>
                        <MenuItem value={`100 ${formatLabel} freestyle`} primaryText={`100 ${formatLabel} freestyle`}/>
                        <MenuItem value={`200 ${formatLabel} freestyle`} primaryText={`200 ${formatLabel} freestyle`}/>
                        <MenuItem value={`500 ${formatLabel} freestyle`} primaryText={`500 ${formatLabel} freestyle`}/>
                        <MenuItem value={`1000 ${formatLabel} freestyle`} primaryText={`1000 ${formatLabel} freestyle`}/>
                        <MenuItem value={`1650 ${formatLabel} freestyle`} primaryText={`1650 ${formatLabel} freestyle`}/>
                        <MenuItem value={`100 ${formatLabel} backstroke`} primaryText={`100 ${formatLabel} backstroke`}/>
                        <MenuItem value={`200 ${formatLabel} backstroke`} primaryText={`200 ${formatLabel} backstroke`}/>
                        <MenuItem value={`100 ${formatLabel} breastroke`} primaryText={`100 ${formatLabel} breastroke`}/>
                        <MenuItem value={`200 ${formatLabel} breastroke`} primaryText={`200 ${formatLabel} breastroke`}/>
                        <MenuItem value={`100 ${formatLabel} butterfly`} primaryText={`100 ${formatLabel} butterfly`}/>
                        <MenuItem value={`200 ${formatLabel} butterfly`} primaryText={`200 ${formatLabel} butterfly`}/>
                        <MenuItem value={`200 ${formatLabel} IM`} primaryText={`200 ${formatLabel} IM`}/>
                        <MenuItem value={`400 ${formatLabel} IM`} primaryText={`400 ${formatLabel} IM`}/>
                    </SelectField>
                    <TextField 
                        floatingLabelText="Time"
                        floatingLabelFixed={true}
                        value={this.state.raceTime}
                        onChange={this.timeChange}
                    />
                    <RaisedButton 
                        label="Add Race"
                        primary={true} 
                        style={style}
                        onClick={this.addRaceClick}
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

export default connect(mapStateToProps, { getMeetNames, addNewMeet, addNewRace })(AddEvent);