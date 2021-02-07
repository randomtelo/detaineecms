import React from 'react';
import { UserCredentials } from '../../models/user';
import Detainee from '../../models/detainee';
import Controllers from '../../controllers/';

interface Props {
    index: number;
    userCredentials: UserCredentials;
    instutionId: string;
}

interface State {
    detainees?: Detainee[];
}

class MapDetaineeComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            detainees: undefined,
        }
    }

    componentDidMount() {
        this.getDetaineeByInstitution();
    }

    getDetaineeByInstitution = () => {
        Controllers.detaineeController.getDetaineeByInstitution(this.props.instutionId)?.then(detainees => {
            this.setState({ detainees });
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    { this.state.detainees ? this.state.detainees.map((detainee, index) =>
                        <div className="row border mt-1 mb-2 pt-2">
                            <div className="col-10" key={index}>
                                <p>ФИО: { detainee.fio } | Рядом: {detainee.personsNearby}</p>
                            </div>
                            <div className="col-2 matchedit t-r">
                                <button type="button" className="matchedit-button">
                                    <i className="fas fa-ban"></i>
                                </button>
                            </div>
                        </div>
                    ) : null }
                </div>
            </div>
        )
    }
}

export default MapDetaineeComponent;