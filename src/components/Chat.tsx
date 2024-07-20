import Message, { IMessage } from './Message'

export default function Chat() {
  const list_message: IMessage[] = [
    { id: 1, isMy: false, text: 'Hey, how are you?', time: new Date() },
    {
      id: 2,
      isMy: true,
      text: "I'm good, thanks! How about you?",
      time: new Date()
    },
    {
      id: 3,
      isMy: false,
      text: "I'm doing great, thanks for asking!",
      time: new Date()
    }
  ]
  return (
    <div className="flex flex-col w-full">
      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-col mb-4 gap-4 py-4">
          {list_message.map((msg) => (
            <Message key={msg.id} {...msg} />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center h-16">
        <input
          type="text"
          className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-lg mr-4"
          placeholder="Type a message..."
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </div>
    </div>
  )
}
