import { createStore, createEvent } from 'effector';
import { Message } from '../Models/chat';

// Chat Storage
const initialChatState: Message[] = [];
export const chatStorage = createStore(initialChatState as Message[]);
export const chatStorageChange  = createEvent<Message>();
chatStorage.on(chatStorageChange, (state, msg) => [...state, msg]);
chatStorage.watch(state => console.log('Store -> Messages:', state));

export default {
    store: chatStorage,
    setStore: chatStorageChange,
}