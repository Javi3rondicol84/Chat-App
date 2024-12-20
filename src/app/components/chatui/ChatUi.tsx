

interface ChatUiProps {
  messages: { loggedUser: string | number; message: string, time: string }[];
  userId: string | null;
  nameUser: string | null;
}

export function ChatUi({ messages, userId, nameUser }: ChatUiProps) {

  return (
    <>
    <div className="max-h-80 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-gray-50">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            String(msg.loggedUser) === userId ? "justify-end" : "justify-start"
          } mb-3`}
        >
          <div
            className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
              String(msg.loggedUser) === userId
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <strong className="block text-sm">
              {String(msg.loggedUser) === userId ? "Tú" : nameUser}
            </strong>
            <span className="text-xs text-gray-300">
              {String(msg.time)}
            </span>
            <p className="mt-1">{msg.message}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}