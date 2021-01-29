import React from 'react';
import {observer, inject} from "mobx-react";
import { ServerLink } from './../../../config/index';

@inject("Store")
@observer
class StatusSwitch extends React.Component<any, any> {
    constructor(props){
        super(props);
        this.state = {
            status: 'Не расчитана',
            handleralert: 1,
        }
        this.SubmitHandler = this.SubmitHandler.bind(this);
        this.HandlerSelect = this.HandlerSelect.bind(this);
    }

    SubmitHandler(event){
        event.preventDefault();
        let requestBody = {
            'status': this.state.status,
        }
        fetch(ServerLink + '/upforecaststatus/' + this.props.id, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.Store.jwt.split(' ')[1],
            },
            body: JSON.stringify(requestBody)
        });
        setTimeout( () => { this.props.funcRefresh() }, 500);
        this.props.funcView('', false);
    }

    HandlerSelect(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    HandlerAlert(e) {
        this.setState({
            handleralert: e,
        });
    }

    render() {
        switch (this.props.view) {
            case true:
                return (
                    <form className="mb-3" onSubmit={ this.SubmitHandler }>
                        <div className="form-group mb-3">
                            <label>Select status:</label>
                            <select className="form-control" id="Select1" name="status" onChange={ this.HandlerSelect }>
                                <option value="Не расчитана">Не расчитана</option>
                                <option value="Прошла">Прошла</option>
                                <option value="Не прошла">Не прошла</option>
                                <option value="Возврат/Отмена">Возврат/Отмена</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                        <button type="submit" className="btn btn-primary" onClick={ () => { this.props.funcView('', false) } } >Close</button>
                    </form>
                );
            default:
                return null
        }
    }
}

export default StatusSwitch;