import React from 'react';
import { server } from './../../../config/';

import { CalendarSwitch } from './../utilsComponents/CalendarSwitch'
import { LockSwitch } from './../utilsComponents/LockSwitch';
import StatusSwitch from './../utilsComponents/StatusSwitch';
import { EditForecast } from './../EditForecast';
import { MapMatch } from './../mapMatch';
import NewMatch from './../newMatch/';


export class MapForecasts extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = {
            ViewNewMatch: true,
            ViewEditStatus: true,
            ViewEditForecast: true,
            statusSelectedIndex: '',
            selectedIndex: '',
            selectedForecastId: '',
        }
        this.parseType = this.parseType.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.funcOpenNewMatch = this.funcOpenNewMatch.bind(this);
        this.funcCloseNewMatch = this.funcCloseNewMatch.bind(this);
        this.funcChangeEditForecast = this.funcChangeEditForecast.bind(this);
        this.funcChangeEditStatus = this.funcChangeEditStatus.bind(this);
    }

    funcChangeEditForecast(index, bole){
        this.setState({
            ViewEditForecast: bole,
            selectedIndex: index,
        });
    }

    funcChangeEditStatus(index, bole){
        this.setState({
            ViewEditStatus: bole,
            statusSelectedIndex: index,
        });
    }

    funcOpenNewMatch(id, bole){
        this.setState({
            ViewNewMatch: bole,
            selectedForecastId: id,
        });
    }

    funcCloseNewMatch(id, bole){
        this.setState({
            ViewNewMatch: bole,
            selectedForecastId: id,
        });
    }

    parseType(count){
        if(count){
            return 'match';
        }
        else{
            return 'express';
        }
    }

    formatDate(date){
        let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
        let current = new Date(date);
        return current.toLocaleString("ru", options);
    }

    render(){
        return (
            <React.Fragment>
            <div className="list-group">
                {this.props.Elements.map((element, index) => (
                    <div className="list-group-item" key={index}>
                        <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="row">
                                            <div className="col-12 mb-2">
                                                <p><CalendarSwitch Store={this.props.Store} day={element.daySwitch} id={element._id} funcRefresh={this.props.funcRefresh}/>  <LockSwitch Store={this.props.Store} private={element.private}  id={element._id} funcRefresh={this.props.funcRefresh}/> {element._id} <span className="badge badge-pill badge-info mr-2 pb-1 pointer status"  onClick={ () => {this.funcChangeEditStatus(index, true)} }>{element.statusResult}</span></p>
                                                <p>
                                                    <span className="badge badge-pill badge-info mr-2 mb-1 pb-1">Author: {element.authorID}</span>
                                                    <span className="badge badge-pill badge-info mr-2 mb-1 pb-1">Type: {this.parseType(element.type)}</span>
                                                    <span className="badge badge-pill badge-info mr-2 mb-1 pb-1">Capper: {element.capperID}</span> 
                                                    <span className="badge badge-pill badge-info mr-2 mb-1 pb-1">Bank, %: {element.bank}</span> 
                                                    <span className="badge badge-pill badge-info mr-2 mb-1 pb-1">{this.formatDate(element.dateStart)}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 t-r">
                                        <button className="btn btn-dark btn-m-pointer" 
                                            onClick={ () => {this.funcOpenNewMatch(index, true)} }
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title="Добавить матч">
                                                <i className="far fa-plus-square"></i>
                                        </button>
                                        <button className="btn btn-dark btn-m-pointer" 
                                            onClick={ () => {this.funcChangeEditStatus(index, true)} }
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title="Статус расчета"
                                        >
                                            <i className="fas fa-poll"></i>
                                        </button>
                                        <button
                                            className="btn btn-dark btn-m-pointer"
                                            onClick={ () => {this.funcChangeEditForecast(index, true)} }
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title="Изменить прогноз"
                                        >
                                            <i className="far fa-edit"></i>
                                        </button>
                                        <button
                                            className="btn btn-dark btn-m-pointer"
                                            onClick={ () => {this.props.funcDelete(element._id)} }
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title="Удалить прогноз"
                                        >
                                            <i className="far fa-trash-alt"></i>
                                        </button>
                                    </div>
                                    <div className="col-12">
                                        <StatusSwitch 
                                            Store={this.props.Store}
                                            id={element._id}
                                            index={index}
                                            view={index === this.state.statusSelectedIndex ? true : false}
                                            funcView={this.funcChangeEditStatus}
                                            funcRefresh={this.props.funcRefresh}
                                        />
                                        <EditForecast 
                                            Store={this.props.Store}
                                            id={element._id}
                                            index={index}
                                            view={index === this.state.selectedIndex ? true : false}
                                            funcView={this.funcChangeEditForecast}
                                            funcRefresh={this.props.funcRefresh}
                                        />
                                        <NewMatch
                                            view={index === this.state.selectedForecastId ? true : false}
                                            id={element._id}
                                            funcСlose={this.funcCloseNewMatch}
                                            funcRefresh={this.props.funcRefresh}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <MapMatch
                                            Store={ this.props.Store }
                                            matchid={ element._id }
                                            element={ element }
                                            array={ element.matchesArray }
                                        />
                                    </div>
                                    {/*
                                    <div className="col-12 t-r">
                                        <button type="button"
                                            class="btn btn-dark btn-sm mt-2 ml-2"
                                            onClick={ () => { alert('Функция публикации в данный момент не доступна') } }
                                        >
                                            Опубликовать
                                        </button>
                                    </div>
                                    */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </React.Fragment>
        );
    }
}