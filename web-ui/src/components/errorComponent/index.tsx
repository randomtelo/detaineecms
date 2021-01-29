import React from 'react';
import { Link } from "react-router-dom";

export class ErrorPage extends React.Component{
    render(){
        return (
            <div className="text-center">
                <p className="mt-5 mb-3">
                    Page is not found
                    <br />
                    <Link to="/menu">back menu</Link>
                </p> 
            </div>
        );
    }
}