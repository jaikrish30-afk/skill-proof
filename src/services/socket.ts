import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socketInstance: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socketInstance) {
    socketInstance = io(SOCKET_SERVER_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      timeout: 5000,
      autoConnect: true,
    });

    socketInstance.on('connect', () => {
      console.log('[Socket Service] Connected to InterTrack Backend:', socketInstance?.id);
    });

    socketInstance.on('connect_error', () => {
      // Gracefully silent on local fallback
    });
  }

  return socketInstance;
};
