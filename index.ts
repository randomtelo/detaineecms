import low  from 'lowdb';
import _ from 'lodash';
import FileSync from 'lowdb/adapters/FileSync';
import {
    CountyModel,
    InstitutionModel,
} from './api/db/schemas';

const adapter = new FileSync('./dict/db.json');
const db = low(adapter);

import * as dotenv from "dotenv";
dotenv.config();
const mongo: string = process.env.MONGO as unknown as string;
console.log('index.mongo: ', mongo);

const connect = require('./api/database/config');

interface Institution {
    guid: string,
    ovd_short: string,
    ovd_long: string,
    city_code: string,
    сounty: string,
    district: string,
    adress: string,
    contact: string,
}

/*
const institutions: Institution[] = db.get('institution').value();
institutions.map(async (institution) => {
    const сountyForInstitution = await CountyModel.find({ title: institution.сounty }).exec();
    InstitutionModel.create({
        сounty: сountyForInstitution[0]._id,
        titleShort: institution.ovd_short,
        titleLong: institution.ovd_long,
        district: institution.district,
        address: institution.adress,
        contact: institution.contact,
    })
})
*/

/*
const uniqueLocations = _.uniqWith(
    institutions,
    (locationA, locationB) => locationA.сounty === locationB.сounty
);
const onlyCounty = uniqueLocations.map(item => item.сounty);
console.log('institutions: ', onlyCounty);
onlyCounty.map(county => {
    CountyModel.create({ title: county });
})
*/