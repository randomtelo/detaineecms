import React from 'react';
import { Link  } from "react-router-dom";

const HeaderComponent = () => (
    <div className="d-flex justify-content-center mt-5">
        <div className="mr-3">
            <Link to="/menu">Menu</Link>
        </div>
        <div className="mr-3">
            <Link to="/exit">Exit</Link>
        </div>
        <div>
            <Link to="https://teleg.run/soothex">Support</Link>
        </div>
    </div>
);

export default HeaderComponent;