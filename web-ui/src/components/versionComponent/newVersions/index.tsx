import React from 'react';
import { observer, inject } from "mobx-react";
import { API } from '../../../api';

@inject("Store")
@observer
class NewVersions extends React.Component<any, any> {
    constructor(props){
        super(props);
        this.state = {
            version: undefined,
        };
        this.HandlerInput = this.HandlerInput.bind(this);
        this.SubmitHandler = this.SubmitHandler.bind(this);
    }

    HandlerInput(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    SubmitHandler(e){
        e.preventDefault();

        let NewVersions = {
            version: this.state.version,
        };
        API.Settings.VersionCreate(this.props.Store, NewVersions).then(response => {
            response.text().then( data => {
                this.props.funcRefresh();
            });
        });
    }

    render() {
        return this.props.switcher ? (
            <div className="backgound-popup">
                <div className="content-popup">
                    <h6>Create version</h6>
                    <hr />
                    <form onSubmit={ this.SubmitHandler }>
                        <div className="form-group">
                            <label>Verion name:</label>
                            <input className="form-control mr-2" name="version" onChange={ this.HandlerInput } required />
                            <small className="form-text text-muted">Разделители значений точка!</small>
                        </div>
                        <button type="submit" className="btn btn-primary mr-2">Create</button>
                        <button type="button" className="btn btn-primary" onClick={ () => { this.props.viewFunction(false) }} >Close</button>
                    </form>
                </div>
            </div>
        ) : null;
    }
}

export default NewVersions;