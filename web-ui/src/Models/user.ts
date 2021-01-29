export interface UserCredentials {
    jwt: string | null,
    user: User | null,
}

export interface User {
    id?: string;
    username?:  string;
    password?: string;
    jwt?: string;
    userlevel: number,
    contact: string,
    сounty: string,
};
