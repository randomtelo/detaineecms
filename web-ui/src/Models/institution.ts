export default interface Institution {
    _id: string,
    сounty: {
        _id: string,
        title: string,
    }, // Округ
    titleShort: string,
    titleLong: string,
    district: string, 
    address: string,
    contact: string,
    siteJ: string, // Сайт какого то Жени
    site: string, // Официальный сайт
    latitude: string, // Широта
    longitude: string,
}
