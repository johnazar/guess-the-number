import { useEffect } from 'react'
import { useState } from 'react'
import io from 'Socket.IO-client'
const Chat = () => {
    const ENDPOINT = "ws://localhost:3000";
    const [chatState, setChatState] = useState('disconnected');
    // websocket
    useEffect(() => { socketInitializer() }, [])
    
    const socketInitializer: () => Promise<null> = async () => {
        await fetch('/api/socket')
        const socket = io(ENDPOINT, {
            transports: ['websocket'],
        })
        console.log('socket', socket)
        socket.on('connect', () => {
            setChatState('connected')
            console.log('connected', socket.id)
        })
        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
        socket.on('error', () => {
            console.log("Sorry, there seems to be an issue with the connection!");
        });

        socket.on('update-input', msg => {
            console.log(`message from server:  ${msg}`);
        })
        return null
    }
    return (
        <div>
            Chat status: {chatState}
        </div>
    )
}
export default Chat