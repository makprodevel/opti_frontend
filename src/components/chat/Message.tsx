import { IMessage } from "../../store/chat";

export default function Message(msg: IMessage) {
  return !msg.owning ? (
    <div className="ml-4 flex justify-start">
      <div className="max-w-[80%] rounded-lg bg-gray-100 px-4 py-2">
        <p className="text-sm text-gray-900">{msg.text}</p>
      </div>
    </div>
  ) : (
    <div className="mr-4 flex justify-end">
      <div className="max-w-[80%] rounded-lg bg-blue-500 px-4 py-2">
        <p className="text-sm text-white">{msg.text}</p>
      </div>
    </div>
  )
}
