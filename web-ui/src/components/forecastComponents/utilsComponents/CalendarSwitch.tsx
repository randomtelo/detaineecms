import React from 'react';
import util from 'util';
import { ServerLink } from './../../../config/index';

export class CalendarSwitch extends React.Component<any, any> {
    constructor(props){
        super(props);

        this.SendSwitchDay = this.SendSwitchDay.bind(this);
    }

    SendSwitchDay(x){
        fetch(ServerLink + '/upforecastday/' + this.props.id + '/' + x, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.Store.jwt.split(' ')[1],
            }
        });
        setTimeout( () => {this.props.funcRefresh()}, 500);
    }

    render(){
        if(this.props.day){
            return (
                <i className="far fa-calendar-check enable" onClick={() => {this.SendSwitchDay('false')}} ></i>
            );
        }
        else{
            return (
                <i className="far fa-calendar disable" onClick={() => {this.SendSwitchDay('true')}} ></i>
            );
        }
    }
}