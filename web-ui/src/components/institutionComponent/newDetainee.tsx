import React, { useState } from 'react';
import { UserCredentials } from '../../models/user';
import Controllers from '../../controllers';
import Detainee from '../../models/detainee';

interface Props {
    index: number;
    view: boolean;
    instutionId: string;
    handleNewDetainee: (select: number | undefined) => void;
}

interface State {
    fio: string;
    personsNearby: number;
}

class NewDetaineeComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            fio: '',
            personsNearby: 0,
        }
    }

    inputfioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            fio: e.target.value,
        });
    }

    inputPersonsNearbyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            personsNearby: parseInt(e.target.value),
        });
    }

    fetchCreateNewDetainee = () => {
        let newDetainee = {
            fio: this.state.fio,
            personsNearby: this.state.personsNearby,
            institution: this.props.instutionId,
        } as Detainee;
        Controllers.detaineeController.createDetainee(newDetainee);
    }

    submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.fetchCreateNewDetainee()
    }

    render() {
        return this.props.view ? (
            <div className="backgound-popup">
                <div className="content-popup">
                    <h6>Новый задержанный</h6>
                    <hr />
                    <form onSubmit={ this.submitHandler }>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label>Fio (ФИО):</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fio"
                                        onChange={ this.inputfioHandler }
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label>personsNearby (Люди рядом):</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="personsnearby"
                                        onChange={ this.inputPersonsNearbyHandler }
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            /*
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>contact (Контакт):</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="contact"
                                                onChange={ inputHandler }
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>specific (Особые пожелания):</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="specific"
                                                onChange={ inputHandler }
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>comment (Комментарий):</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="comment"
                                                onChange={ inputHandler }
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>courier (Курьер):</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="courier"
                                                onChange={ inputHandler }
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>article (Статья):</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="article"
                                                onChange={ inputHandler }
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>dateDetention (Дата задержания):</label>
                                    <div className="row">
                                        <div className="col">
                                            <input type="date" id="start" className="form-control mr-2" name="datestart" onChange={ inputHandler } />
                                        </div>
                                        <div className="col">
                                            <input type="time" id="appt" className="form-control" name="timestart" onChange={ inputHandler }></input>
                                        </div>
                                    </div>
                                </div>
                            */
                        }
                        <button type="submit" className="btn btn-primary mr-2">Save</button>
                        <button className="btn btn-primary" onClick={ () => { this.props.handleNewDetainee(undefined) }} >Close</button>
                    </form>
                </div>
            </div>
        ) : null
    }
}

export default NewDetaineeComponent;