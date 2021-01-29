import React from 'react';
import {observer, inject} from "mobx-react";
import { ServerLink } from './../../../config/';

@inject("Store")
@observer
class NewForecast extends React.Component<any, any> {
    constructor(props){
        super(props);

        this.state = {
            innerCappers: [],
            authorID: 'admin',
            datestart: '',
            timestart: '',
            private: 'free',
            capperName: '',
            bank: 0,
            capperID: '',
            type: true,
            market: '',
            viewState: false,
            jsxState: false,
        };

        this.HandlerInput = this.HandlerInput.bind(this);
        this.SubmitHandler = this.SubmitHandler.bind(this);
    }

    componentDidMount() {
        let response = fetch(ServerLink + '/capper/getall/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.Store.jwt.split(' ')[1],
            }
        }).then(response => {
            response.json().then( data => {
                this.setState({
                    innerCappers: data,
                });
            });
        });
    }

    componentDidUpdate() {
        this.props.funcRefresh();
    }

    HandlerInput(e) {
        this.setState({
            [e.target.name]: e.target.value,
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

        let mydate = new Date(this.state.datestart);
        let mytime = this.ParseTime(this.state.timestart);
        mydate.setHours(mytime.getHours());
        mydate.setMinutes(mytime.getMinutes());

        let newElement = {
            authorID: this.state.authorID,
            capperID: this.state.capperID,
            dateStart: mydate,
            statusEdit: true,
            bank: Number(this.state.bank),
            private: this.state.private,
            statusResult: 'Не расчитана',
            daySwitch: false,
            type: this.state.type,
        };
        let response = fetch(ServerLink + '/addforecast/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.Store.jwt.split(' ')[1],
            },
            body: JSON.stringify(newElement)
        }).then(response => {
            response.text().then( data => {
                this.props.funcRefresh();
            });
        });

        this.setState({
            private: 'free',
        });
    }

    render(){
        let ArrayMatchesJSX;
        if (this.state.innerCappers) {
            ArrayMatchesJSX = this.state.innerCappers.map((key, index) => (
                <option value={key._id}>{key.capperName}</option>
            ));
        };

        let ElementEditorJSX;
        switch (this.props.switcher) {
            case true:
                ElementEditorJSX =(
                <div className="backgound-popup">
                    <div className="content-popup">
                        <h6>Create forecast</h6>
                        <hr />
                        <form onSubmit={this.SubmitHandler}>
                            <div className="form-group">
                                <label>Select public capper</label>
                                <select className="custom-select" name="capperID" onChange= {this.HandlerInput } required>
                                    <option selected >Choose...</option>
                                    {ArrayMatchesJSX}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Bank, %:</label>
                                <input className="form-control mr-2" name="bank" min="0" max="100" type="number" onChange={ this.HandlerInput } required/>
                                <small className="form-text text-muted">Использовать для дробных значений точку!</small>
                            </div>
                            <div className="form-group">
                                <label>Private:</label>
                                <select className="custom-select" name="private" onChange={ this.HandlerInput } required>
                                    <option selected value="free">free</option>
                                    <option value="subscription">subscription</option>
                                    <option value="pay">pay</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Forecast of day:</label>
                                <select className="custom-select" name="daySwitch" onChange={ this.HandlerInput } required>
                                    <option selected value="false">false</option>
                                    <option value="true">true</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date start:</label>
                                <div className="row">
                                    <div className="col">
                                        <input type="date" id="start" className="form-control mr-2" name="datestart" onChange={ this.HandlerInput } required/>
                                    </div>
                                    <div className="col">
                                        <input type="time" id="appt" className="form-control" name="timestart" onChange={ this.HandlerInput } required/>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mr-2">Create</button>
                            <button className="btn btn-primary" onClick={ () => {this.props.viewFunction(false)}} >Close</button>
                        </form>
                    </div>
                </div>
                );
            break;
            default:
                return null
            break;
        }
        return ElementEditorJSX;
    }
}

export default NewForecast;