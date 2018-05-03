import React from 'react';
import sectionals from '../../files/timestandards/sectionals.png';
import allAmerica from '../../files/timestandards/allamerica.png';
import futures from '../../files/timestandards/futures.png';
import p66Nats from '../../files/timestandards/p66nats.png';
import winterJrNats from '../../files/timestandards/winterjrnats.png';
import winterSrNats from '../../files/timestandards/wintersrnats.png';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


import '../../App.css';


const styles = 
{
    customSize: 
    {
        width: 310,
        height: 45,
    },
};

export default class TimeStandards extends React.Component
{
    constructor()
    {
        super();

        this.state =
        {
            value: ''
        }
    }

    handleChange = (e, i , value) => this.setState({value});
  

    render()
    {
        let tableDisplay = this.state.value !== '' ? <img src={this.state.value} alt="table" className="tableIMG"/> : '';

        return (
            <div className="App">
                <div className='body'>
                    <DropDownMenu 
                        value={this.state.value}
                        onChange={this.handleChange}
                        style={styles.customSize}
                        //autoWidth={false}
                        className="menu"
                    >
                        <MenuItem value={''} primaryText='Select Time Standard Table' />
                        <MenuItem value={allAmerica} primaryText='2017-18 All-America' />
                        <MenuItem value={sectionals} primaryText='2018 Sectionals' />
                        <MenuItem value={futures} primaryText='2018 Futures' />
                        <MenuItem value={winterJrNats} primaryText='2018 Winter Jr. Nationals' />
                        <MenuItem value={winterSrNats} primaryText='2018 Winter Sr. Nationals' />
                        <MenuItem value={p66Nats} primaryText='2018 Phillips 66 Nationals' />            
                    </DropDownMenu> 
                    <div className='tableDisplay'>
                        {tableDisplay}
                    </div>
                </div>
            </div>
        )
    }

}