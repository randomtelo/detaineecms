import React, { useState } from 'react';
import { UserCredentials } from '../../models/user';
import Detainee from '../../models/detainee';

interface Props {
    index: number;
    instutionId: string;
    view: boolean;
    handleChangeDetainee: (select: number | undefined) => void;
}

function NewDetaineeComponent(props: Props) {

    const submitHandler = () => alert('Form is develop')

    const inputHandler = () => {}

    return props.view ? (
        <div className="backgound-popup">
            <div className="content-popup">
                <h6>Новый задержанный</h6>
                <hr />
                <form onSubmit={ submitHandler }>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>County (Округ):</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="сounty"
                                    onChange={ inputHandler }
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Institution (ОВД):</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="institution"
                                    onChange={ inputHandler }
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Fio (ФИО):</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fio"
                                    onChange={ inputHandler }
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
                                    type="text"
                                    className="form-control"
                                    name="personsNearby"
                                    onChange={ inputHandler }
                                    required
                                />
                            </div>
                        </div>
                    </div>
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
                                <input type="date" id="start" className="form-control mr-2" name="datestart" onChange={ inputHandler } required />
                            </div>
                            <div className="col">
                                <input type="time" id="appt" className="form-control" name="timestart" onChange={ inputHandler } required></input>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mr-2">Save</button>
                    <button className="btn btn-primary" onClick={ () => { props.handleChangeDetainee(undefined) }} >Close</button>
                </form>
            </div>
        </div>
    ) : null
}

export default NewDetaineeComponent;