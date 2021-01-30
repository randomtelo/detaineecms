import React from 'react';
import { server } from '../../../config';
import EditMatch from './../EditMatch/';

export class MapMatch extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = {
            editmatch: false,
            innerMatches: [],
            viewMatch: false,
            idForecast: '',
            ViewEditForecast: false,
            selectedIndex: '',
        }

        this.funcChangeEditForecast = this.funcChangeEditForecast.bind(this);
        this.OpenEditor = this.OpenEditor.bind(this);
        this.SendDelete = this.SendDelete.bind(this);
        this.RefreshMatches = this.RefreshMatches.bind(this);
        this.OpenNewMatch = this.OpenNewMatch.bind(this);
        this.CloseNewMatch = this.CloseNewMatch.bind(this);
    }

    funcChangeEditForecast(index, bole){
        this.setState({
            ViewEditForecast: bole,
            selectedIndex: index,
        });
    }

    componentDidMount(){
        this.RefreshMatches();
    }

    RefreshMatches(){
        fetch(server.host + '/getmatches/' + this.props.matchid, {
            method: 'POST',
            mode: 'cors',
            cache: 'reload',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.Store.jwt.split(' ')[1],
            },
            body: JSON.stringify(this.state)
        }).then(response => {
            response.json().then( data => {
                console.log("refresh" + JSON.stringify(data));
                this.setState({
                    innerMatches: data,
                });
            });
        });
    }

    SendDelete(id){
        fetch(server.host + '/deletematch/' + id, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.Store.jwt.split(' ')[1],
            },
        });
        setTimeout( () => {this.RefreshMatches()}, 500);
    }

    OpenNewMatch(id){
        this.setState({
            viewMatch: true,
            idForecast: id,
        });
    }

    CloseNewMatch(){
        this.setState({
            viewMatch: false,
        });
        setTimeout( () => {this.RefreshMatches()}, 1000);
    }

    OpenEditor(count){
        this.setState({
            editmatch: count,
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

    render() {
        if (this.state.innerMatches) {
            let ArrayMatchesJSX = this.state.innerMatches.map((key, index) => (
                <div className="row border mt-1 mb-2 pt-2">
                    <div className="col-10" key={index}>
                        <label><small>ID: {key._id}</small></label>
                        <p>{key.tournament} | {key.teamName1} vs {key.teamName2}</p>
                        <p className="form-text">
                            <span className="badge badge-pill badge-light mr-2 mb-1 pb-1">{this.formatDate(key.matchStart)}</span>
                            <span className="badge badge-pill badge-light mr-2 mb-1 pb-1">Sport: {key.sport}</span>
                            <span className="badge badge-pill badge-light mr-2 mb-1 pb-1">Market: {key.market}</span>
                            <span className="badge badge-pill badge-light mr-2 mb-1 pb-1" >Result: {key.marketResult}</span>
                        </p>
                    </div>
                    <div className="col-2 matchedit t-r">
                        <button type="button" className="matchedit-button" onClick={ () => {this.funcChangeEditForecast(index, true)} }>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button type="button" className="matchedit-button" onClick={ () => {this.SendDelete(key._id)} }>
                            <i className="fas fa-ban"></i>
                        </button>
                    </div>
                    <div className="col-12">
                        <EditMatch id={key._id} index={index} view={index === this.state.selectedIndex ? true : false} funcView={this.funcChangeEditForecast} funcrefrech={this.RefreshMatches}/>
                    </div>
                </div>
            ));

            let elementNodes = (
                <div className="row">
                    <div className="col-12">
                        {ArrayMatchesJSX}
                    </div>
                </div>
            );
            return elementNodes;
        }
        else return null;
    }
}