import { io, Socket } from 'socket.io-client';

let socket: Socket;
let isConnected = false;

const initializeSocket = () => {
  if (!socket) {
    const URL =
      import.meta.env.NODE_ENV === 'production'
        ? import.meta.env.VITE_PROD_BACKEND_URL
        : import.meta.env.VITE_DEV_BACKEND_URL;
    console.log('Connecting to Socket URL:', URL);
    socket = io(URL, {
      reconnection: false, // Disable automatic reconnection to handle manually
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      isConnected = true;
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      isConnected = false;
    });

    socket.on('reconnect', () => {
      console.log('Socket reconnected:', socket.id);
      isConnected = true;
    });

    socket.on('reconnect_error', (error) => {
      console.error('Reconnection error:', error);
    });
  }
  return socket;
};

const disconnectSocket = () => {
  if (socket && isConnected) {
    console.log('Disconnecting from Socket');
    socket.disconnect();
    isConnected = false;
  }
};

const connectSocket = () => {
  if (!isConnected) {
    initializeSocket();
    // Optionally, you can attempt to connect immediately after initialization
  }
};

const reconnectSocket = () => {
  if (socket) {
    console.log('Attempting to reconnect to Socket');
    socket.connect(); // Manually trigger reconnection
  } else {
    connectSocket(); // If not initialized, initialize and connect
  }
};

export { initializeSocket, disconnectSocket, connectSocket, reconnectSocket };
