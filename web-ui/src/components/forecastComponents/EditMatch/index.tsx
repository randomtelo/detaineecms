import React from 'react';
import { observer, inject } from "mobx-react";
import { ServerLink } from './../../../config/';

@inject("Store")
@observer
class EditMatch extends React.Component<any, any> {
    constructor(props){
        super(props);
        this.state = {
            tournament: '',
            coefficient: '',
            teamName1: '',
            teamName2: '',
            marketResult: '',
            matchStart: '',
            sport: '',
            rate: '',
            datestart: '',
            timestart: '',
        }
        this.formatDate = this.formatDate.bind(this);
        this.SetInputTime = this.SetInputTime.bind(this);
        this.SetInputDate = this.SetInputDate.bind(this);
        this.SubmitHandler = this.SubmitHandler.bind(this);
        this.InputHandler = this.InputHandler.bind(this);
    }

    componentDidMount(){
        fetch(ServerLink + '/getmatch/' + this.props.id, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.Store.jwt.split(' ')[1],
            },
            body: JSON.stringify(this.state)
        }).then(response => {
            response.json().then( data => {
                console.log(data);
                this.setState({
                    coefficient: data.coefficient,
                    tournament: data.tournament,
                    teamName1: data.teamName1,
                    teamName2: data.teamName2,
                    marketResult: data.marketResult,
                    matchStart: data.matchStart,
                    market: data.market,
                    sport: data.sport,
                });
            });
        });
    }

    ParseTime(t) {
        var d = new Date();
        var time = t.match( /(\d+)(?::(\d\d))?\s*(p?)/ );
        d.setHours( parseInt( time[1]) + (time[3] ? 12 : 0) );
        d.setMinutes( parseInt( time[2]) || 0 );
        return d;
    }

    SubmitHandler(e){
        e.preventDefault();
        let mydate;
        let mytime;
        let sendDate;
        if(this.state.datestart !== '' && this.state.timestart !== ''){
            mydate = new Date(this.state.datestart);
            mytime = this.ParseTime(this.state.timestart);
            mydate.setHours(mytime.getHours());
            mydate.setMinutes(mytime.getMinutes());

            sendDate = {
                сoefficient: this.state.coefficient,
                tournament: this.state.tournament,
                teamName1: this.state.teamName1,
                teamName2: this.state.teamName2,
                marketResult: this.state.marketResult,
                matchStart: this.state.matchStart,
                market: this.state.market,
                sport: this.state.sport,
            };
        } else {
            sendDate = {
                сoefficient: this.state.coefficient,
                tournament: this.state.tournament,
                teamName1: this.state.teamName1,
                teamName2: this.state.teamName2,
                marketResult: this.state.marketResult,
                market: this.state.market,
                sport: this.state.sport,
            };
        }
        

        
        fetch(ServerLink + '/editmatch/' + this.props.id, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.Store.jwt.split(' ')[1],
            },
            body: JSON.stringify(sendDate)
        });
    }

    InputHandler(e){
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    formatDate(date){
        let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
        let current = new Date(date);
        return current.toLocaleString("ru", options);
    }

    SetInputDate(){
        return `${new Date(this.state.matchStart).getFullYear()}/${ new Date(this.state.matchStart).getMonth()}/${ new Date(this.state.matchStart).getDate()}`;
    }

    SetInputTime(){
        return `${new Date(this.state.matchStart).getHours() }:${ new Date(this.state.matchStart).getMinutes()}`;
    }

    render(){
        if(this.props.view){
            let JSX = (
                <form className="mb-3" onSubmit={this.SubmitHandler}>
                    <hr></hr>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Tournament:</label>
                                <input type="text" className="form-control" name="tournament" onChange={this.InputHandler} value={this.state.tournament} required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Sport name:</label>
                                <input type="text" className="form-control" name="sport" onChange={this.InputHandler} value={this.state.sport} required />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label>Сoefficient:</label>
                                <input type="number" className="form-control" name="coefficient" onChange={this.InputHandler} value={this.state.coefficient} required />
                                <small className="form-text text-muted">Использовать для дробных значений точку!</small>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Team 1:</label>
                                <input type="text" className="form-control" name="teamName1" onChange={this.InputHandler} value={this.state.teamName1} required />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label>Team 2:</label>
                                <input type="text" className="form-control" name="teamName2" onChange={this.InputHandler} value={this.state.teamName2} required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Match Result:</label>
                                <input type="text" className="form-control" name="marketResult" onChange={this.InputHandler} value={ this.state.marketResult} required />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label>Market:</label>
                                <input type="text" className="form-control" name="market" onChange={this.InputHandler} value={this.state.market} required />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Date start: { this.formatDate(this.state.matchStart) }</label>
                        <p>Сменить дату начала события нельзя, при необходимости сделайте новый прогноз.</p>
                        { /*
                        <div className="row">
                            <div className="col">
                                <input type="date" id="start" className="form-control mr-2" name="datestart" value={ this.state.matchStart } required />
                            </div>
                            <div className="col">
                                <input type="time" id="appt" className="form-control" name="timestart" value={ this.state.matchStart } required />
                            </div>
                        </div>
                        */ }
                    </div>
                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                    <button className="btn btn-primary" onClick={ () => {this.props.funcView('', false) }} >Close</button>
                </form>
            );
            return JSX;
        }
        else{
            return null;
        }
    }
}

export default EditMatch;