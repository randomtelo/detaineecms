import React from 'react';
import {observer, inject} from "mobx-react";

@inject("Store")
@observer
class EditCapper extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.SubmitHandler = this.SubmitHandler.bind(this);
    }

    SubmitHandler(e){
        e.preventDefault();
        alert('Данный функционал временно не работает');
    }

    render(){
        return (
            <form onSubmit={this.SubmitHandler}>
                <div className="form-group">
                    <label>Public Name</label>
                    <input type="text" className="form-control" name="capperName" placeholder={ this.props.capper.capperName }></input>
                </div>
                <div className="form-group">
                    <label>Public Rank</label>
                    <select value={ this.props.capper.capperRank } className="form-control" name="capperRank">
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
                </div>
                <div className="form-group">
                    <label>Public description</label>
                    <textarea className="form-control" name="capperDescription" cols={ 3 } placeholder={ this.props.capper.capperDescription } />
                </div>
                <button className="btn btn-primary mr-2" type="submit">Update</button>
                <button className="btn btn-primary" onClick={ this.props.switch }>Close</button>
            </form>
        );
    }
}

export default EditCapper;