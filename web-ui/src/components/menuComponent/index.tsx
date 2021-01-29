import React from 'react';
import { Link } from "react-router-dom";
import Store from './../../effectorStore/';
import { useStore } from 'effector-react';

export function MenuComponent() {
    const userCredentials = useStore(Store.userCredentials.store);
    return userCredentials.user ? (
        <div className="container">
            <div className="row justify-content-md-center mt-5">
                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                    <h1 className="h3 mb-3 font-weight-normal">Home page</h1>
                    <ul className="list-group">
                        <Link to="/chat"><li className="list-group-item">Chat </li></Link>
                        { userCredentials.user.userlevel === 0 || userCredentials.user.userlevel === 1 ? <Link to="/prisoners"><li className="list-group-item">Prisoners</li></Link> : null }
                        { userCredentials.user.userlevel === 0 ? <Link to="/usermanager"><li className="list-group-item">Users</li></Link> : null }
                        { userCredentials.user.userlevel === 0 ? <Link to="/analytics"><li className="list-group-item">Analytics</li></Link> : null }
                        <Link to="/exit"><li className="list-group-item">Exit </li></Link>
                    </ul>
                </div>
            </div>
        </div>
    ) : null;
}
