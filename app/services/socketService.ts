import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private token: string | null = null;

  connect(token: string) {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.token = token;
    
    this.socket = io("https://api.gohappygo.fr/messages", {
      auth: {
        token: token
      },
       transports: ['websocket'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
   
    });

    


    this.socket.on('connect', () => {
      console.log('Socket.IO connected globally');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket.IO disconnected globally:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }

  isConnected() {
    return this.socket?.connected || false;
  }

  // Join a specific request room
  joinRequest(requestId: number) {
    if (this.socket?.connected) {
      this.socket.emit('join-request', { requestId });
    }
  }

  // Leave a specific request room
  leaveRequest(requestId: number) {
    if (this.socket?.connected) {
      this.socket.emit('leave-request', { requestId });
    }
  }

  // Send a message
  sendMessage(requestId: number, content: string) {
    if (this.socket?.connected) {
      this.socket.emit('send-message', { requestId, content });
      return true;
    }
    return false;
  }

  // Send typing indicator
  sendTyping(requestId: number, isTyping: boolean) {
    if (this.socket?.connected) {
      this.socket.emit('typing', { requestId, isTyping });
    }
  }

  // Listen to events
  on(event: string, callback: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  // Remove event listener
  off(event: string, callback?: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

// Export a singleton instance
export const socketService = new SocketService();
export default socketService;