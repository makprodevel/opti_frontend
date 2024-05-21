import './Chatbox.css'
import ListMessage from "./ChatList/ChatList.tsx";
import Chat from "./Chat/Chat";
import {ChatProvider} from "./Chat/ChatContext.tsx";


export default function Chatbox() {
    return (
        <ChatProvider>
            <div id="chatbox">
                <ListMessage/>
                <Chat/>
            </div>
        </ChatProvider>
    )
}