import React from 'react';
import { ServerLink } from '../../config';

import NewVersions from './newVersions';
import { MapVersions } from './mapVersions';

export class VersionsComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            StatusFormId: null,
            openCreateForm: false,
      }
      this.CreateForm = this.CreateForm.bind(this);
      this.refreshAPI = this.refreshAPI.bind(this);
      this.deleteAPI = this.deleteAPI.bind(this);
    }
  
    componentDidMount() {
        this.refreshAPI();
    }
  
    render() {
      return (
        <div className="container mt-2">
            <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6 t-l">
                                    <h4>Versions</h4>
                                </div>
                                <div className="col-6 t-r pb-2">
                                    <button
                                        className="btn btn-dark mr-1"
                                        type="button"
                                        onClick={ () => { this.CreateForm(true) }}
                                    >Create new</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <MapVersions
                                elements={ this.state.elements }
                                funcDelete={ this.deleteAPI }
                            />
                        </div>
                        <NewVersions
                            switcher={ this.state.openCreateForm }
                            viewFunction={ this.CreateForm }
                            funcRefresh={ this.refreshAPI }
                        />
                    </div>
                </div>
            </div>
        </div>
        );
    }

    CreateForm(f) {
        this.setState({openCreateForm: f});
    }
    
    deleteAPI(uid) {
        fetch(ServerLink + '/appversions/delete/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.Store.jwt.split(' ')[1],
            },
            body: JSON.stringify({ id: uid })
        }).then(response => {
            response.text().then( data => {
                this.refreshAPI();
            });
        });
    }

    refreshAPI() {
        fetch(ServerLink + '/appversions/get/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.Store.jwt.split(' ')[1],
            },
            body: JSON.stringify(this.state)
        }).then(response => {
            response.json().then( data => {
                this.setState({
                    elements: data,
                });
            });
        });
    }
}