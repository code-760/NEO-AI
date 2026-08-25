let socket = null;
let socketPromise = null;

export const initializeSocket = async () => {
  if (socket?.connected) return socket;

  if (!socketPromise) {
    socketPromise = import('socket.io-client').then(({ io }) => {
      socket = io('https://neo-ai-terv.onrender.com/', {
        withCredentials: true,
        transports: ['websocket'],
      });

      socket.on('connect', () => {
        console.log('Connected to the server');
      });

      return socket;
    });
  }

  return socketPromise;
};

export const disconnectSocket = () => {
  if (!socket) return;

  socket.disconnect();
  socket = null;
  socketPromise = null;
};
