import React from 'react';
import {observer, inject} from "mobx-react";
import { ServerLink } from './../../../config/';

@inject("Store")
@observer
class addNewCapper extends React.Component<any, any> {
    constructor(props){
        super(props);
        this.state ={
            username:  '',
            password: '',
            capperName: '',
            capperRank: 1,
            imageLink: '',
            capperDescription: '',
        }
        this.InputHandler = this.InputHandler.bind(this);
        this.SubmitHandler = this.SubmitHandler.bind(this);
    }

    InputHandler(e){
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    SubmitHandler(e){
        e.preventDefault();

        let newCapper = {
            username: this.state.username,
            password: this.state.password,
            capperName: this.state.capperName,
            capperRank: this.state.capperRank,
            imageLink: this.state.imageLink,
            capperDescription: this.state.capperDescription,
        };
        fetch(ServerLink + '/capper/add/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.Store.jwt.split(' ')[1],
            },
            body: JSON.stringify(newCapper)
        }).then(response => {
            alert('Новый каппер успешно добавлен');
            this.props.switch();
        });
    }

    render(){
        return (
            <div className="backgound-popup">
                <div className="content-popup">
                    <form onSubmit={this.SubmitHandler}>
                        <div className="form-group">
                            <label>Login username</label>
                            <input type="name" className="form-control" id="username" name="username" placeholder="username" onChange={this.InputHandler} required></input>
                        </div>
                        <div className="form-group">
                            <label>Login password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="*******" onChange={this.InputHandler} required></input>
                        </div>
                        <div className="form-group">
                            <label>Public Name</label>
                            <input type="text" className="form-control" name="capperName" placeholder="Kevin Frazier" onChange={this.InputHandler} required></input>
                        </div>
                        <div className="form-group">
                            <label>Link for profile image</label>
                            <input type="text" className="form-control" name="imageLink" placeholder="http://....com/" onChange={this.InputHandler} required></input>
                        </div>
                        <div className="form-group">
                            <label>Public Rank</label>
                            <select className="form-control" name="capperRank">
                                <option value="1">1. LIVE-ЭКСПЕРТ</option>
                                <option value="2">2. АДМИРАЛ АНАЛИТИКИ</option>
                                <option value="3">3. БЫВШИЙ ТРЕНЕР</option>
                                <option value="4">4. ВСЕГДА В ПЛЮСЕ</option>
                                <option value="5">5. ВЫСОКОЕ ДОВЕРИЕ</option>
                                <option value="6">6. ГЕНИЙ ФУТБОЛА</option>
                                <option value="7">7. ИНДИДВИДУАЛЬНЫЙ ПОДХОД</option>
                                <option value="8">8. КРУПНЫЙ ИГРОК</option>
                                <option value="9">9. ЛУЧШИЙ ROI ЗА МЕСЯЦ</option>
                                <option value="10">10. ЛУЧШИЙ АНАЛИЗ</option>
                                <option value="11">11. ЛУЧШИЙ ПРОГНОЗИСТ</option>
                                <option value="12">12. ЛУЧШИЙ ЭКСПРЕССОР</option>
                                <option value="13">13. МЕШОК ДЕНЕГ</option>
                                <option value="14 ">14. ОПЫТНЫЙ ФУТБОЛИСТ </option>
                                <option value="15">15. САМЫЙ АКТИВНЫЙ ПРОГНОЗИСТ</option>
                                <option value="16">16. САМЫЙ БОЛЬШОЙ КОЭФ</option>
                                <option value="17">17. СЕРИЯ ИЗ 3 ПОБЕД</option>
                                <option value="18">18. СЕРИЯ ИЗ 5 ПОБЕД</option>
                                <option value="19">19. СЕРИЯ ИЗ 10 ПОБЕД</option>
                                <option value="20">20. ШЕРИФ БАНКА</option>
                                <option value="21">21. ЭКСПЕРТ В ОРДИНАРАХ</option>
                                <option value="22">22. ЭКСПЕРТ В ЭКСПРЕССАХ</option>
                            </select>
                            <small className="form-text text-muted"> Public rank capper. Displayed in profile.</small>
                        </div>
                        <div className="form-group">
                            <label>Public description</label>
                            <textarea className="form-control" name="capperDescription" cols={ 3 } onChange={this.InputHandler} required />
                        </div>
                        <button className="btn btn-primary mr-2" type="submit">Create</button>
                        <button className="btn btn-primary" onClick={this.props.switch}>Close</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default addNewCapper;