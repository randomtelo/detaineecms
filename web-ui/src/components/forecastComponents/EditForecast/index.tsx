import React from 'react';

import { ServerLink } from './../../../config/';

export class EditForecast extends React.Component<any, any> {
    constructor(props){
        super(props);
        this.state = {
            innerCappers: [],
            statusEdit: '',
            statusResult: '',
            dateStart: '',
            authorID: '',
            bank: '',
            private: '',
            capperName: '',
            capperID: '',
            daySwitch: '',
            type: '',
        }
        this.formatDate = this.formatDate.bind(this);
        this.CloseEdit = this.CloseEdit.bind(this);
        this.SubmitHandler = this.SubmitHandler.bind(this);
        this.InputHandler = this.InputHandler.bind(this);
    }

    CloseEdit(){
        this.props.funcView('', false);
    }

    componentDidMount(){
        fetch(ServerLink + '/getforecast/' + this.props.id, {
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
                    statusEdit: data.statusEdit,
                    statusResult: data.statusResult,
                    dateStart: data.dateStart,
                    authorID: data.authorID,
                    bank: data.bank,
                    private: data.private,
                    capperName: data.capperName,
                    capperID: data.capperID,
                    daySwitch: data.daySwitch,
                    type: data.type,
                });
            });
        });
        fetch(ServerLink + '/capper/getall/', {
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

    ParseTime(t) {
        var d = new Date();
        var time = t.match( /(\d+)(?::(\d\d))?\s*(p?)/ );
        d.setHours( parseInt( time[1]) + (time[3] ? 12 : 0) );
        d.setMinutes( parseInt( time[2]) || 0 );
        return d;
    }

    SubmitHandler(e){
        e.preventDefault();

        let sendDate = {
            statusEdit: this.state.statusEdit,
            statusResult: this.state.statusResult,
            authorID: this.state.authorID,
            bank: this.state.bank,
            private: this.state.private,
            capperName: this.state.capperName,
            capperID: this.state.capperID,
            daySwitch: this.state.daySwitch,
            type: this.state.type,
        };
        fetch(ServerLink + '/upforecast/' + this.props.id, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.Store.jwt.split(' ')[1],
            },
            body: JSON.stringify(sendDate)
        });
        this.props.funcRefresh();
        this.CloseEdit();
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

    render(){
        let ArrayMatchesJSX;
        if (this.state.innerCappers) {
            ArrayMatchesJSX = this.state.innerCappers.map((key, index) => (
                <option value={key._id}>{key.capperName}</option>
            ));
        };

        if(this.props.view){
            let JSX = (
                <form className="mb-3" onSubmit={ this.SubmitHandler }>
                    <div className="form-group">
                        <label>Каппер: <b>{ this.state.capperName }</b></label>
                        <select className="custom-select" name="capperID" onChange={ this.InputHandler } required>
                            <option selected>Choose...</option>
                            {ArrayMatchesJSX}
                        </select>
                    </div>
                    <div className="form-group">
                        <label><b>Тип: { this.state.private }</b></label>
                        <select className="custom-select" name="private" onChange={ this.InputHandler } required>
                            <option selected>Choose...</option>
                            <option value="free">free</option>
                            <option value="pay">pay</option>
                            <option value="subscription">subscription</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Процент банка:</label>
                        <input type="number" className="form-control" name="bank" value={ this.state.bank } onChange={ this.InputHandler} required />
                    </div>
                    <div className="form-group">
                        <label>Начало события: <b>{this.formatDate(this.state.dateStart)}</b></label>
                        <p>Сменить дату начала события нельзя, при необходимости сделайте новый прогноз.</p>
                    </div>
                    <button type="submit" className="btn btn-primary mr-2">Update</button>
                    <button className="btn btn-primary" onClick={ () => {this.CloseEdit()}} >Close</button>
                </form>
            );
            return JSX;
        }
        else{
            return null;
        }
    }
}