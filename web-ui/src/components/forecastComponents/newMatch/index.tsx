import React from 'react';
import { server} from './../../../config/';

class NewMatch extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = {
            tournament: '',
            teamName1: '',
            teamName2: '',
            sport: '',
            market: '',
            marketResult: '',
            coefficient: '',
        }
        this.SubmitHandler = this.SubmitHandler.bind(this);
        this.InputHandler = this.InputHandler.bind(this);
    }

    ParseTime( t ) {
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

        let sendDate = {
            tournament: this.state.tournament,
            teamName1: this.state.teamName1,
            teamName2: this.state.teamName2,
            matchWinnner: this.state.matchWinnner,
            marketResult: this.state.marketResult,
            coefficient: this.state.coefficient,
            matchStart: mydate,
            sport: this.state.sport,
            market: this.state.market,
        };
        let response = fetch(server.host + '/addmatch/' + this.props.id, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.Store.jwt.split(' ')[1],
            },
            body: JSON.stringify(sendDate)
        }).then(response => {
            this.setState({
                tournament: '',
                teamName1: '',
                teamName2: '',
                sport: '',
                market: '',
                marketResult: '',
                coefficient: '',
            });
        });
        setTimeout( () => {this.props.funcRefresh()}, 500);
        this.props.funcСlose('', false);
    }

    InputHandler(e){
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render(){
        let ElementEditorJSX;
        switch (this.props.view) {
            case true:
                ElementEditorJSX =(
                    <div className="backgound-popup">
                        <div className="content-popup">
                            <h6>New match</h6>
                            <hr />
                            <form onSubmit={this.SubmitHandler}>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Tournament:</label>
                                            <input type="text" className="form-control" name="tournament" onChange={this.InputHandler} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Сoefficient:</label>
                                            <input type="number" className="form-control" name="coefficient" onChange={this.InputHandler} required/>
                                            <small className="form-text text-muted">Дроби через точку!</small>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Sport name:</label>
                                            <input type="text" className="form-control" name="sport" onChange={this.InputHandler} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Name team 1:</label>
                                            <input type="text" className="form-control" name="teamName1" onChange={this.InputHandler} required/>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Name team 2:</label>
                                            <input type="text" className="form-control" name="teamName2" onChange={this.InputHandler} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Market:</label>
                                            <input type="text" className="form-control" name="market" onChange={this.InputHandler} required/>
                                            <small id="emailHelp" className="form-text text-muted">Тип маркета</small>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Market result:</label>
                                            <input type="text" className="form-control" name="marketResult" onChange={this.InputHandler} required/>
                                            <small id="emailHelp" className="form-text text-muted">Результат выбранного маркета</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Date start:</label>
                                    <div className="row">
                                        <div className="col">
                                            <input type="date" id="start" className="form-control mr-2" name="datestart" onChange={this.InputHandler} required/>
                                        </div>
                                        <div className="col">
                                            <input type="time" id="appt" className="form-control" name="timestart" onChange={this.InputHandler} required></input>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                <button className="btn btn-primary" onClick={ () => {this.props.funcСlose() }} >Close</button>
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

export default NewMatch;