import { IMessage } from '../store/chat'

export default function Message(msg: IMessage) {
  return !msg.owning ? (
    <div className="flex justify-start">
      <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
        <p className="text-gray-900 text-sm">{msg.text}</p>
      </div>
    </div>
  ) : (
    <div className="flex justify-end">
      <div className="bg-blue-500 rounded-lg px-4 py-2 max-w-[80%]">
        <p className="text-white text-sm">{msg.text}</p>
      </div>
    </div>
  )
}
