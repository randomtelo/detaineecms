import React from 'react';
import { observer } from 'mobx-react';
import { ServerLink } from './../../config/';

import AddNewCapper from './components/addPopUp';
import EditCapper from './components/editForm';

class CapperListGenerator extends React.Component<any, any> {
  constructor(props){
    super(props);
    this.state = {
      openForm: false,
      openFormIndex: false,
    }
    this.OpenEditForm = this.OpenEditForm.bind(this);
  }

  OpenEditForm(index) {
    if (this.state.OpenForm && !index) {
      this.setState({ openForm: false });
    } else {
      this.setState({
        openForm: true,
        openFormIndex: index,
      });
    }
  }
  
  render(){
    return (
      <div className="col-12">
        <div className="list-group">
          {this.props.Elements.map((element, index) => (
            <div className="list-group-item" key={index}>
              <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-4 mb-2">
                        <img className="capperimage" src={element.imageLink} />
                      </div>
                      <div className="col-4 mb-2">
                        <p>ID:{element._id}</p>
                        <p>Name: {element.capperName}</p>
                        <p>Rank: {element.capperRank}</p>
                        <p>Desciption: {element.capperDescription}</p>
                      </div>
                      <div className="col-4 t-r">
                        <button className="btn btn-dark btn-m-pointer" onClick={ () => { this.OpenEditForm(index) }}><i className="far fa-edit"></i></button>
                      </div>
                      <div className="col-12">
                        {this.state.openForm && this.state.openFormIndex === index ? (
                          <EditCapper 
                            capper={ element }
                            switch={ this.OpenEditForm }
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export class UserComponent extends React.Component<any, any> {
    constructor(props) {
      super(props);
      this.state = {
        elements: [],
        StatusFormId: null,
        openCreateForm: false,
        openEditForm: false,
      }
      this.CreateForm = this.CreateForm.bind(this);
    }
  
    componentDidMount(){
      this.RefreshAPI();
    }

    CreateForm(){
      if(this.state.openCreateForm){
        this.setState({openCreateForm: false});
      }
      else{
        this.setState({openCreateForm: true});
      }
    }

    RefreshAPI(){
      let response = fetch(ServerLink + '/capper/getall/', {
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
  
    render(){
      return (
        <React.Fragment>
          {this.state.openCreateForm ? <AddNewCapper switch={this.CreateForm}/> : null}
          <div className="container mt-2">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12">
                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6 t-l">
                        <h4>Usermanager</h4>
                      </div>
                      <div className="col-6 t-r pb-2">
                        <button className="btn btn-dark mr-1" type="button" onClick={this.CreateForm}>Create new</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                  </div>
                  <CapperListGenerator 
                    Elements = {this.state.elements}
                  />
                  </div>
                </div>
              </div>
          </div>
        </React.Fragment>
      );
    }
  }