import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class MetrikaPage extends React.Component<any, any >{
    constructor(props){
        super(props);
        this.state = {
            dateStart: null,
            dateEnd: null,
        }
        this.HandleChangeStart = this.HandleChangeStart.bind(this);
        this.HandleChangeEnd = this.HandleChangeEnd.bind(this);
    }

    HandleChangeStart = date => {
        this.setState({
            dateStart: new Date(date),
        });
    }
    HandleChangeEnd = date => {
        this.setState({
            dateEnd: new Date(date),
        });
    }

    render(){
        return (
            <div className="container">
                <div className="row justify-content-md-center mt-5">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                        <h1 className="h2 mb-3 font-weight-normal">Metrika</h1>
                    </div>
                </div>
            </div>
        );
    }
}