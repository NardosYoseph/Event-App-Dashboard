let ws = null;

export const initializeWebSocket = () => {
  ws = new WebSocket('ws://192.168.4.115:8181');

  ws.onopen = async() => {
    console.log('WebSocket connected',WebSocket);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed',WebSocket);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  return ws;
};

export const getWebSocketInstance = () => {
  return ws;
};

export const closeWebSocket = () => {
  if (ws) {
    ws.close();
  }
};
