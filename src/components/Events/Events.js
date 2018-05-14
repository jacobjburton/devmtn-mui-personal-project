import React, { Component } from 'react';
import './Events.css';
//import Paper from 'material-ui/Paper';
//import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import { connect } from 'react-redux';
import { getEventData, deleteRace, editRace } from '../../redux/reducer';
//import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';


// const  dropdownStyle = 
// {
//     customSize: 
//     {
//         width: 310,
//         height: 45,
//     },
// }, 
const style = {
    marginLeft: 20,
    marginTop: 40
}, buttonStyle = {
    marginLeft: 5
};



class Events extends Component
{
    constructor()
    {
        super();

        this.state =
        {
            editRaceCheck: false,
            indexToEdit: 0,
            newEventName: '',
            raceNameChange: '',
            date: null,
            newRaceTime: '',
            chartRaces: {}
        }

        this.deleteRace = this.deleteRace.bind(this);
        this.editRaceCheck = this.editRaceCheck.bind(this);
        this.eventNameEdit = this.eventNameEdit.bind(this);
        this.eventDateEdit = this.eventDateEdit.bind(this);
        this.raceTimeChange = this.raceTimeChange.bind(this);
        this.raceChange = this.raceChange.bind(this);
        this.editRaceClick = this.editRaceClick.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
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

    editRaceCheck(id)
    {
        console.log(id)
        //let findIt = this.props.events.indexOf(this.props.events.id);
        console.log(this.props.events[id].rname)
        this.setState({ editRaceCheck: !this.state.editRaceCheck, indexToEdit: id })
    }

    cancelEdit()
    {
        this.setState({ editRaceCheck: !this.state.editRaceCheck });
    }

    eventNameEdit(name)
    {
        this.setState({ newEventName: name });
    }

    eventDateEdit = (event, date) => 
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
        this.props.getEventData(this.props.user.id)
    }
    
    raceTimeChange = (event, value) =>
    {
        this.setState({raceChangeTime: value})
    }

    raceChange = (event, index, value) =>
    {
        this.setState({raceNameChange: value})
    }

    editRaceClick()
    {
        if (this.state.editRaceCheck)
        {
            this.setState({editRaceCheck: !this.state.editRaceCheck})
        }
        else
        {
            let { raceNameChange, raceChangeTime, indexToEdit } = this.state;
            console.log(raceNameChange, raceChangeTime)
            this.props.editRace(this.props.events[indexToEdit].rid, raceNameChange, raceChangeTime, this.props.user.id);
        }
        this.setState(
        {
            editRaceCheck: !this.state.editRaceCheck,
            raceNameChange: '',
            raceChangeTime: ''
        })
    }

    render()
    {
        //console.log(this.props.events);
        
        let { indexToEdit } = this.state;
        //console.log(this.props.events[indexToEdit]);
        
        // var formatLabel = '';
        // for (var i = 0; i < this.props.events.length; i++)
        // {
        //     //console.log(this.props.meets[i].mname)
        //     //console.log(this.props.meets[i].mformat)

        //     if (this.props.meets[i].mname === this.state.eventName && this.props.meets[i].mformat === "SCY")
        //     {
        //         formatLabel = "yard";
        //     }
        //     else if (this.props.meets[i].mname === this.state.eventName && this.props.meets[i].mformat === "LCM")
        //     {
        //         formatLabel = "meter";
        //     }
        // }
        var displayEdit;
        

        if (this.state.editRaceCheck)
        {
            displayEdit =
            (
                <div className='editTable'>
                    {/* <TextField
                        floatingLabelText="Event Name"
                        floatingLabelFixed={true}
                        value={this.props.events[indexToEdit].mname}
                        onChange={this.eventNameEdit}
                    />
                    <DatePicker
                        hintText="Event Date"
                        value={`${this.props.events[indexToEdit].mdate}`}
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
                    </SelectField>  */}
                    <SelectField
                        floatingLabelText={`Change Race:`}
                        value={this.state.raceNameChange}
                        onChange={this.raceChange}
                        className="editFields"
                    >
                        <MenuItem value={`50 yard freestyle`} primaryText={`50 yard freestyle`}/>
                        <MenuItem value={`100 yard freestyle`} primaryText={`100 yard freestyle`}/>
                        <MenuItem value={`200 yard freestyle`} primaryText={`200 yard freestyle`}/>
                        <MenuItem value={`500 yard freestyle`} primaryText={`500 yard freestyle`}/>
                        <MenuItem value={`1000 yard freestyle`} primaryText={`1000 yard freestyle`}/>
                        <MenuItem value={`1650 yard freestyle`} primaryText={`1650 yard freestyle`}/>
                        <MenuItem value={`100 yard backstroke`} primaryText={`100 yard backstroke`}/>
                        <MenuItem value={`200 yard backstroke`} primaryText={`200 yard backstroke`}/>
                        <MenuItem value={`100 yard breastroke`} primaryText={`100 yard breastroke`}/>
                        <MenuItem value={`200 yard breastroke`} primaryText={`200 yard breastroke`}/>
                        <MenuItem value={`100 yard butterfly`} primaryText={`100 yard butterfly`}/>
                        <MenuItem value={`200 yard butterfly`} primaryText={`200 yard butterfly`}/>
                        <MenuItem value={`200 yard IM`} primaryText={`200 yard IM`}/>
                        <MenuItem value={`400 yard IM`} primaryText={`400 yard IM`}/>
                    </SelectField>
                    <TextField
                        floatingLabelText={`Change Time: ${this.props.events[indexToEdit].rtime}`}
                        // hintText="Change Time"
                        floatingLabelFixed={true}
                        //defaultValue={this.props.events[indexToEdit].rtime}
                        value={this.raceChangeTime}
                        onChange={this.raceTimeChange}
                        className="editFields"
                    />
                    <RaisedButton 
                        label="Submit" 
                        style={style}
                        primary={true}
                        onClick={this.editRaceClick}
                        className='editFields editButton'
                    />
                    <RaisedButton 
                        label="Cancel" 
                        style={style}
                        primary={true}
                        onClick={this.cancelEdit}
                        className='editFields editButton'
                    />
                </div>
            )
        }

        return (
            <div className="body">
            
                {/* <DropDownMenu 
                    //value={this.state.value}
                    //onChange={this.handleChange}
                    style={dropdownStyle.customSize}
                    //autoWidth={false}
                    className="menu"
                >
                    <MenuItem value={''} primaryText='Select Data Table' />          
                    {/* <MenuItem value={''} primaryText='' />           
                </DropDownMenu> */}
                    
                
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
                        //console.log(event.rid)
                        return (
                            <tr key={i} className='columns'>
                                    <td>{i+1}</td>
                                    <td>{event.mname}</td>
                                    <td>{event.mdate}</td>
                                    <td>{event.mformat}</td>
                                    <td>{event.rname}</td>
                                    <td>{event.rtime}</td>
                                    <td>
                                        <RaisedButton
                                            label="Edit"
                                            style={buttonStyle}
                                            primary={true}
                                            onClick={() => this.editRaceCheck(i)}
                                        />
                                        <RaisedButton
                                            style={buttonStyle}
                                            primary={true}
                                            label="Delete"
                                            onClick={() => this.deleteRace(event.rid)}
                                        />
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
export default connect(mapStateToProps, { getEventData, deleteRace, editRace })(Events);