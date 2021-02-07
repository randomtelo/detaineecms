const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/*
    Схема ОКРУГ
*/
const сountySchema = new Schema({
    title: String,
});

/*
    Схема ОВД
    Местонахождение (ОВД/ИВС/СП/СИЗО…)
    *Короткое название - текст
    *Официальное название - текст
    *Округ - текст (округ в системе, используется для разделения ролей)
    Район - текст
    *Адрес - текст
    *Телефон - текст
    Ссылка в базе Жени - текст
    Ссылка на оф.сайт - текст
    Широта - текст
    Долгота - текст
*/
const institutionSchema = new Schema({
    сounty: { type: Schema.Types.ObjectId, ref: 'County' }, // Округ
    titleShort: String,
    titleLong: String,
    district: String, //Особые пожелания
    address: String,
    contact: String,
    siteJ: String, // Сайт какого то Жени
    site: String, // Официальный сайт
    latitude: String, // Широта
    longitude: String, // Долгота
});

/*
    Схема Отлеживаемое ОВД
*/
const ObservedInstitutionSchema = new Schema({
    observerUser: { type: Schema.Types.ObjectId, ref: 'Admin' },
    сounty: { type: Schema.Types.ObjectId, ref: 'County' },
    observedInstitution: { type: Schema.Types.ObjectId, ref: 'Institution' }, // ОВД
});

/*
*Округ - список из базы
Местонахождение - список из таблицы ОВД/ИВС/СП/СИЗО…
*ФИО - Текст
Неустановленных лиц рядом - целое число
Контакт - текст (телефон, телеграм…)
*Дата задержания - дата ДД.ММ.ГГГГ
*Время задержания - время ЧЧ:ММ
(?)Время для передачи = время задержания +3 часа / высчитывается на фронту
*Статус передачи еды - список: Не нужна, Нужна, Организована, Получена, Зависла, Не доставлена
*Статус ночной передачи - список: Не нужна, Нужна, Организована, Получена, Зависла, Не доставлена
*Статус задержанного - список: Автозак, Оформление, Ночует, Отбывает сутки, На свободе
*Статус наличия адвоката - список: Нет информации, Требуется, Есть
Особые пожелания - текст
Комментарий - текст
Кто везёт передачу - текст
Статья - текст
*/
const detaineeSchema = new Schema({
    observedInstitution: { type: Schema.Types.ObjectId, ref: 'Institution' },
    fio: String,
    dateDetention: String,
    personsNearby: String,
    contact: String,
    specific: String, //Особые пожелания
    comment: String, // Комментарий
    courier: String, // Кто везёт передачу
    article: String, // Статья
});

const adminsSchema = new Schema({
    username:  String,
    password: String,
    userlevel: Number,
    contact: String,
    сounty: { type: Schema.Types.ObjectId, ref: 'County' },
});
detaineeSchema

let CountyModel = mongoose.model('County', сountySchema);
let InstitutionModel = mongoose.model('Institution', institutionSchema);
let ObservedInstitutionModel =  mongoose.model('observedinstitution', ObservedInstitutionSchema);
let DetaineeModel = mongoose.model('Detainee', detaineeSchema);
let AdminModel = mongoose.model('Admin', adminsSchema);

export {
    CountyModel,
    InstitutionModel,
    ObservedInstitutionModel,
    DetaineeModel,
    AdminModel,
};