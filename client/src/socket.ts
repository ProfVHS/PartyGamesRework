import { io } from 'socket.io-client';

export const serverUrl = 'http://localhost:3000';

export const socket = io(serverUrl);
