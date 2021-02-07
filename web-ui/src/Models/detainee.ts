export default interface Detainee {
    _id: string,
    сounty: string,
    institution: string,
    fio: string,
    dateDetention: string,
    personsNearby: number,
    contact: string,
    specific: string, //Особые пожелания
    comment: string, //Комментарий
    courier: string, //Кто везёт передачу
    article: string,
}