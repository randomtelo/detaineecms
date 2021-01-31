import React, { useState } from 'react';

import Institution from '../../models/institution';
import { UserCredentials } from '../../models/user';

import NewDetainee from './newDetainee';
import Detainee from './mapDetainees';
import UpdateInstitution from './updateInstitution';

interface Props {
    userCredentials: UserCredentials;
    institutions: Institution[];
    updateInstitution: (institutionId: string, institution: Institution) => void;
    deleteInstitution: (institutionId: string) => void;
}

function MapInstitutionComponent(props: Props) {
    const [ selectNewDetainee, setSelectNewDetainee ] = useState<number | undefined>(undefined);
    const [ selectUpdateInstution, setSelectUpdateInstution ] = useState<number | undefined>(undefined);

    const handleChangeDetainee = (select: number | undefined) => setSelectNewDetainee(select);
    const handleUpdateInstution = (select: number | undefined) => setSelectUpdateInstution(select);

    return (
        <React.Fragment>
        <div className="list-group">
            {props.institutions.map((institution, index) => (
                <div className="list-group-item" key={ index }>
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-12 mb-2">
                                            <p><small>{ institution.id }</small></p>
                                            <p><small>{ institution.address }</small></p>
                                            <p>{ institution.titleShort }</p>
                                            <p>
                                                <span className="badge badge-pill badge-info mr-2 mb-1 pb-1">District: { institution.district }</span>
                                                <span className="badge badge-pill badge-info mr-2 mb-1 pb-1">County: { institution.сounty }</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 t-r">
                                    <button className="btn btn-dark btn-m-pointer" 
                                        onClick={ () => { setSelectNewDetainee(index) }}
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Добавить задержанного">
                                            <i className="far fa-plus-square"></i>
                                    </button>
                                    <button
                                        className="btn btn-dark btn-m-pointer"
                                        onClick={ () => { setSelectUpdateInstution(index) }}
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Изменить данные"
                                    >
                                        <i className="far fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn btn-dark btn-m-pointer"
                                        onClick={ () => { props.deleteInstitution(institution.id) }}
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Убрать из отслеживания"
                                    >
                                        <i className="far fa-trash-alt"></i>
                                    </button>
                                </div>
                                <div className="col-12">
                                    <UpdateInstitution
                                        index={ index }
                                        userCredentials={ props.userCredentials}
                                        instutionId={ institution.id }
                                        view={ index === selectUpdateInstution ? true : false }
                                        handleUpdateInstution={ handleUpdateInstution }
                                    />
                                    <NewDetainee
                                        index={ index }
                                        view={index === selectNewDetainee ? true : false}
                                        instutionId={ institution.id }
                                        handleChangeDetainee={ handleChangeDetainee }
                                    />
                                </div>
                                <div className="col-12">
                                    <Detainee
                                        index={ index }
                                        userCredentials={ props.userCredentials }
                                        instutionId={ institution.id }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </React.Fragment>
    );
}

export default MapInstitutionComponent;