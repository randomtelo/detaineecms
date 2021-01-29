import React from 'react';
import Controllers from './../../controllers';

import Detainee from '../../Models/detainee';
import { UserCredentials } from './../../Models/user';

import { MapForecasts } from './mapForecast';
import NewForecast from './newForecast';



interface Props {
    Store: UserCredentials;
}

interface State {
    elements: Detainee[];
    openNewForecast: boolean;
    ScrollCount: number;
}

export class ForecastComponent extends React.Component<Props, State>{
    OnScroll: any;
    constructor(props: Props){
        super(props);
        this.state = {
            elements: [],
            openNewForecast: false,
            ScrollCount: 1,
        }
    }

    componentDidMount() {
        this.getDetainees();
    }

    render(){
        let ElementEditorJSX;
        if(this.state.openNewForecast){
            ElementEditorJSX = (
                <NewForecast
                    switcher={ this.state.openNewForecast }
                    viewFunction={ this.ElementFormHandler }
                    funcRefresh={ this.refreshForecasts }
                />
            );
        }
        else ElementEditorJSX = null;
        return (
            <React.Fragment>
                {ElementEditorJSX}
                <div className="container mt-2">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12">
                            <div className="row mb-3">
                                <div className="col-6 t-l">
                                    <h4>Prisoners CMS</h4>
                                </div>
                                <div className="col-6 t-r pb-2">
                                    <button className="btn btn-dark mr-1" type="button" onClick={() => {this.ElementFormHandler(true)}}>New</button>
                                    <button className="btn btn-dark mr-1" type="button" onClick={() => {this.refreshForecasts()}}>Refresh</button>
                                </div>
                            </div>
                            <MapForecasts
                                onScroll={ this.OnScroll }
                                Store={ this.props.Store }
                                Elements={ this.state.elements }
                                funcDelete={ this.deleteForecast }
                                funcRefresh={ this.refreshForecasts }
                            />
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 t-c mt-3">
                            <button className="btn btn-dark mr-1" type="button" onClick={ () => {this.LoadmoreAPI()} }>Load more</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    getForecasts = () => {
        if (this.props.Store.jwt) {
            Controllers.forecastController.getForecasts(this.props.Store.jwt)
        }
    }

    refreshForecasts = () => {
        if (this.props.Store.jwt) {
            Controllers.forecastController.getForecasts(this.props.Store.jwt)
        }
    }

    createForecast = () => {
        if (this.props.Store.jwt) {
            Controllers.forecastController.createForecast(this.props.Store.jwt)
        }
    }

    updateForecast = (forecastId: string) => {
        if (this.props.Store.jwt) {
            Controllers.forecastController.updateForecast(this.props.Store.jwt, forecastId)
        }
    }

    deleteForecast = (forecastId: string) => {
        if (this.props.Store.jwt) {
            Controllers.forecastController.deleteForecast(this.props.Store.jwt, forecastId)
        }
    }

    ElementFormHandler = (option: any) => {
        this.setState({
            openNewForecast: option,
        });
    }

}