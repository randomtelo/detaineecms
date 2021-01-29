import React from 'react';

export class PersonalHeader extends React.Component{
    render(){
        return (
            
            <div className="row mt-3 mb-3 justify-content-center">
                <div className="col-4 t-c">
                    <a href="/forecast/editing/" >Editing forecasts</a>
                </div>
                <div className="col-4 t-c">
                    <a href="/forecast/current/" >Current forecasts</a>
                </div>
                <div className="col-4 t-c">
                    <a href="/forecast/history/" >History forecasts</a>
                </div>
            </div>
            
        );
    }
}