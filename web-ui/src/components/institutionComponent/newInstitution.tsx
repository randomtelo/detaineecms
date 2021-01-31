import React from 'react';
import Institution from '../../models/institution';

interface Props {
    institutionModal: boolean;
    handleNewInstitution: (x: boolean) => void;
    createInstitution: (institution: Institution) => void;
}

function NewInstitutionComponent(props: Props) {
    const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        /*
        this.setState({
            [e.target.name]: e.target.value,
        });
        */
    }
    /*
    const ParseTime = (t) => {
        var d = new Date();
        var time = t.match( /(\d+)(?::(\d\d))?\s*(p?)/ );
        d.setHours( parseInt( time[1]) + (time[3] ? 12 : 0) );
        d.setMinutes( parseInt( time[2]) || 0 );
        return d;
    }
     */

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
    }

    return props.institutionModal ? (
        <div className="backgound-popup">
            <div className="content-popup">
                <h6>Добавление ОВД</h6>
                <hr />
                <form onSubmit={ submitHandler }>
                    <div className="form-group">
                        <label>Select сounty (Округ):</label>
                        <select
                            className="custom-select"
                            name="сounty"
                            required
                        >
                            <option>Choose...</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Select institution (ОВД):</label>
                        <select
                            className="custom-select"
                            name="сounty"
                            required
                        >
                            <option>Choose...</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary mr-2">Add</button>
                    <button className="btn btn-primary" onClick={ () => { props.handleNewInstitution(false) }} >Close</button>
                </form>
            </div>
        </div>
    ) : null;
}

export default NewInstitutionComponent;