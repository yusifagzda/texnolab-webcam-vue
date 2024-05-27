import { createStore } from "vuex";
// import main from "./main";

export default createStore({
    state: {
        // Connection Status
        isConnected: false,
        // Message content
        message: "",
        // Reconnect error
        reconnectError: false,
        // Heartbeat message sending time
        heartBeatInterval: 50000,
        // Heartbeat timer
        heartBeatTimer: 0,
        connection: null
    },
    mutations: {
        // Connection open
        SOCKET_ONOPEN(state, event) {
            state.connection = event.currentTarget
            // main.config.globalProperties.$socket = event.currentTarget;
            state.isConnected = true;
            // When the connection is successful, start sending heartbeat messages regularly to avoid being disconnected by the server
            state.heartBeatTimer = setInterval(() => {
                const message = "Heartbeat message";
                state.isConnected &&
                state.connection.sendObj({
                    code: 200,
                    msg: message
                });
            }, state.heartBeatInterval);
        },
        // Connection closed
        SOCKET_ONCLOSE(state, event) {
            state.isConnected = false;
            // Stop the heartbeat message when the connection is closed
            clearInterval(state.socket.heartBeatTimer);
            state.heartBeatTimer = 0;
        },
        // An error occurred
        SOCKET_ONERROR(state, event) {
            console.log(event, 'error')
            console.error(state, event);
        },
        // Receive the message sent by the server
        SOCKET_ONMESSAGE(state, message) {
            state.message = message;
        },
        // Auto reconnect
        SOCKET_RECONNECT(state, count) {
            console.info("Message system reconnecting...", state, count);
        },
        // Reconnect error
        SOCKET_RECONNECT_ERROR(state) {
            state.reconnectError = true;
        }
    },
    modules: {}
});