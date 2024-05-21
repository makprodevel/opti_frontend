import {ReactNode, useContext, useState, createContext} from "react";

// @ts-ignore
const ChatContext = createContext()

export const useChat = () => {
    return useContext(ChatContext)
}


export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [email, setEmail] = useState('');

    return (
        <ChatContext.Provider value={{email, setEmail}}>
            {children}
        </ChatContext.Provider>
    )
}