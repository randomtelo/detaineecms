import React from 'react';

import Controllers from '../../controllers';
import Institution from '../../models/institution';
import { UserCredentials } from '../../models/user';

import NewInstitution from './newInstitution';
import MapInstitution from './mapInstitution';

interface Props {
    userCredentials: UserCredentials;
}

interface State {
    institutions: Institution[];
    scrollCount: number;
    institutionModal: boolean;
}

class InstitutionComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            institutions: [],
            scrollCount: 0,
            institutionModal: false,
        }
    }
    
    componentDidMount() {
        this.getInstitutions();
    }

    handleNewInstitution = (x: boolean) => this.setState({ institutionModal: x });

    render() {
        return (
            <>
                <NewInstitution
                    institutionModal={ this.state.institutionModal }
                    handleNewInstitution={ this.handleNewInstitution }
                    createInstitution={ this.createInstitution }
                />
                <div className="container mt-2">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12">
                            <div className="row mb-3">
                                <div className="col-6 t-l">
                                    <h4>Detainee CMS</h4>
                                </div>
                                <div className="col-6 t-r pb-2">
                                    <button className="btn btn-dark mr-1" type="button" onClick={() => { this.handleNewInstitution(true)} }>New</button>
                                    <button className="btn btn-dark mr-1" type="button" onClick={() => alert('refresh in dev') }>Refresh</button>
                                </div>
                            </div>
                            <MapInstitution
                                userCredentials={ this.props.userCredentials }
                                institutions={ this.state.institutions }
                                updateInstitution={ this.updateInstitution }
                                deleteInstitution={ this.deleteInstitution }
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    getInstitutions = () => {
        if (this.props.userCredentials.jwt) {
            Controllers.institutionController.getInstitutions(this.props.userCredentials.jwt)
        }
    }

    createInstitution = (institution: Institution) => {
        if (this.props.userCredentials.jwt) {
            Controllers.institutionController.createInstitution(this.props.userCredentials.jwt, institution)
        }
    }

    updateInstitution = (institutionId: string, institution: Institution) => {
        if (this.props.userCredentials.jwt) {
            Controllers.institutionController.updateInstitution(this.props.userCredentials.jwt, institutionId, institution)
        }
    }

    deleteInstitution = (institutionId: string) => {
        if (this.props.userCredentials.jwt) {
            Controllers.institutionController.deleteInstitution(this.props.userCredentials.jwt, institutionId)
        }
    }
    /*
        next generation
    refreshInstitutions = () => {
        if (this.props.userCredentials.jwt) {
            Controllers.institutionController.refreshInstitutions(this.props.userCredentials.jwt)
        }
    }
    */
}

export default InstitutionComponent;