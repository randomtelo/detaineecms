import React, { useState } from 'react';
import Controllers from './../../controllers/';

interface State {
    username: string;
    password: string;
}

export function AuthorizationComponent () {
    const [input, setInput] = useState<State>({
        username: '',
        password: '',
    });

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setInput(prevState => { return {...prevState, [e.target.name]: e.target.value }});
    }
        
    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (input.username && input.password) Controllers.authController.validAuth(input.username, input.password);
    };

    return (
        <form className="form-singin text-center" onSubmit={ submitHandler }>
            <h1 className="h3 mb-3 font-weight-normal">Log in to Account</h1>
            <div className="group-form mb-3">
                <label className="sr-only">Username</label>
                <input
                    className="form-control"
                    type="text"
                    name="username"
                    value={ input.username }
                    onChange={ inputHandler }
                    required
                />
            </div>
            <div className="group-form mb-3">
                <label className="sr-only">Password</label>
                <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={ input.password }
                    onChange={ inputHandler }
                    required
                />
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
        </form>
    );
}
