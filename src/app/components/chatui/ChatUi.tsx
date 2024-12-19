

interface ChatUiProps {
  messages: { loggedUser: string | number; message: string, time: string }[];
  userId: string | null;
  nameUser: string | null;
}

export function ChatUi({ messages, userId, nameUser }: ChatUiProps) {
  console.log(messages);
  return (
    <>
    <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ddd", padding: "10px" }}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            textAlign: String(msg.loggedUser) === userId ? "right" : "left",
            backgroundColor: String(msg.loggedUser) === userId ? "#DCF8C6" : "#FFF",
            padding: "5px",
            margin: "5px 0",
            borderRadius: "8px",
          }}
        >
          <strong>{String(msg.loggedUser) === userId ? "Tú" : `${nameUser}`}</strong>: {String(msg.time)}: {msg.message} 
        </div>
      ))}
    </div>
    </>
    
  );
}