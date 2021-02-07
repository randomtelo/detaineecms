import React, { useState } from 'react';

import Institution from '../../models/institution';
import { UserCredentials } from '../../models/user';

import NewDetainee from './newDetainee';
import Detainee from './mapDetainees';
import UpdateInstitution from './updateInstitution';

interface Props {
    userCredentials: UserCredentials;
    institution: Institution[];
    updateInstitution: (institutionId: string, institution: Institution) => void;
    deleteInstitution: (institutionId: string) => void;
}

function MapInstitutionComponent(props: Props) {
    const [ selectNewDetainee, setSelectNewDetainee ] = useState<number | undefined>(undefined);
    const [ selectUpdateInstution, setSelectUpdateInstution ] = useState<number | undefined>(undefined);

    const handleNewDetainee = (select: number | undefined) => setSelectNewDetainee(select);
    const handleUpdateInstution = (select: number | undefined) => setSelectUpdateInstution(select);

    return (
        <React.Fragment>
        <div className="list-group">
            { props.institution.map((institution, index) => (
                <div className="list-group-item" key={ index }>
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-12 mb-2">
                                            <p>
                                                <span className="badge badge-pill badge-info status mr-2 mb-1 pb-1">Округ: { institution.сounty.title }</span>
                                                <span className="badge badge-pill badge-info mr-2 mb-1 pb-1">Район: { institution.district }</span>
                                            </p>
                                            <h4>{ institution.titleShort }</h4>
                                            <p><small>{ institution.address }</small></p>
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
                                        onClick={ () => { props.deleteInstitution(institution._id) }}
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
                                        instutionId={ institution._id }
                                        view={ index === selectUpdateInstution ? true : false }
                                        handleUpdateInstution={ handleUpdateInstution }
                                    />
                                    <NewDetainee
                                        index={ index }
                                        view={index === selectNewDetainee ? true : false}
                                        instutionId={ institution._id }
                                        handleNewDetainee={ handleNewDetainee }
                                    />
                                </div>
                                <div className="col-12">
                                    <Detainee
                                        index={ index }
                                        userCredentials={ props.userCredentials }
                                        instutionId={ institution._id }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )) }
        </div>
        </React.Fragment>
    );
}

export default MapInstitutionComponent;