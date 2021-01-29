import React from 'react';

export class MapVersions extends React.Component<any, any> {
    render(){
        return (
            <div className="col-12">
                <div className="list-group">
                    {this.props.elements.map((element, index) => (
                        <div className="list-group-item" key={index}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-8">
                                            <p><small>uid: { element._id }</small></p>
                                            <p>version: { element.version }</p>
                                        </div>
                                        <div className="col-4 t-r">
                                            <button
                                                className="btn btn-dark btn-m-pointer"
                                                onClick={ () => {this.props.funcDelete(element._id)} }
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="Удалить прогноз"
                                            ><i className="far fa-trash-alt"></i></button>
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