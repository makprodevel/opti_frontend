interface ChatRowProps {
    children: React.ReactNode;

}

export default function ChatRow(props: ChatRowProps) {
    return (
        <div className="chat-row">

            {props.children}
        </div>
    )
}
