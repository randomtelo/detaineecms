import React from 'react';

import { UserCredentials } from '../../models/user';
import County from '../../models/сounty';
import Institution from '../../models/institution';
import ObservedInstitution from '../../models/observedInstitution';

import Controllers from '../../controllers';

interface Props {
    userCredentials: UserCredentials;
    institutionModal: boolean;
    handleNewInstitution: (x: boolean) => void;
    createInstitution: (institution: Institution) => void;
}

interface State {
    county?: County[];
    institution?: Institution[];
    selectCounty?: string;
    selectInstitution?: string;
}

class NewInstitutionComponent extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            county: undefined,
            institution: undefined,
            selectCounty: undefined,
            selectInstitution: undefined,
        }
    }

    fetchCountys = () => {
        if (this.props.userCredentials && this.props.userCredentials.jwt) {
            Controllers.countyController.getCounty(this.props.userCredentials.jwt).then(county => this.setState({ county }));
        }
    }

    fetchInstitution = () => {
        if (this.props.userCredentials && this.props.userCredentials.jwt && this.state.selectCounty) {
            Controllers.institutionController
                .getInstitutionsByCounty(this.props.userCredentials.jwt, this.state.selectCounty)
                .then(institution => {
                    this.setState({ institution })
                });
        }
    }

    fetchCreateObservedInstitution = () => {
        if (this.state.selectCounty && this.state.selectInstitution) {
            const observedInstitution = {
                сounty: this.state.selectCounty,
                observedInstitution: this.state.selectInstitution,
            } as ObservedInstitution;
            Controllers.institutionController.createObservedInstitution(observedInstitution);
        }
    }

    componentDidMount() {
        this.fetchCountys()
    }

    componentDidUpdate(_: Props, prevState: State) {
        if (prevState.selectCounty !== this.state.selectCounty) this.fetchInstitution();
    }

    handlerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.fetchCreateObservedInstitution();
    }

    render() {
        return this.props.institutionModal ? (
            <div className="backgound-popup">
                <div className="content-popup">
                    <h6>Добавление ОВД</h6>
                    <hr />
                    <form onSubmit={ this.submitHandler }>
                        <div className="form-group">
                            <label>Select сounty (Округ):</label>
                            <select
                                className="custom-select"
                                name="selectCounty"
                                onChange={ this.handlerSelect }
                                required
                            >
                                <option>Choose...</option>
                                { this.state.county ? 
                                    this.state.county.map((count, index) => (
                                        <option key={ index } value={ count._id }>{ count.title }</option>
                                    ))
                                : null }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Select institution (ОВД):</label>
                            <select
                                className="custom-select"
                                name="selectInstitution"
                                onChange={ this.handlerSelect }
                                required
                            >
                                <option>Choose...</option>
                                { this.state.institution ? 
                                    this.state.institution.map((count, index) => (
                                        <option key={ index } value={ count._id }>{ count.titleShort }</option>
                                    ))
                                : null }
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary mr-2">Add</button>
                        <button className="btn btn-primary" onClick={ () => { this.props.handleNewInstitution(false) }} >Close</button>
                    </form>
                </div>
            </div>
        ) : null;
    }
}

export default NewInstitutionComponent;