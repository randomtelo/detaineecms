export interface Chat {
    capperID: string;
    type: string;
    userID: string;
}

export interface Message {
    chatID: string;
    date: Date;
    authorName: String;
    authorID: string;
    media: string;
    content: string;
}