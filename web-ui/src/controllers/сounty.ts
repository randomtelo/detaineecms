import { API } from '../api/index';
import County from '../models/сounty';

const getCounty = async (jwt: string): Promise<County[] | undefined> => {
    return API.County.сountyGet(jwt)
    .then((res: any) => res as unknown as County[])
    .catch((error) => {
        console.log('Request error: ', error);
        return undefined;
    })
}

export default {
    getCounty,
}