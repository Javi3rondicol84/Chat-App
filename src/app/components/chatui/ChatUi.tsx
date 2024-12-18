

interface ChatUiProps {
  messages: { loggedUser: string; message: string }[];
  userId: string | null;
}

export function ChatUi({ messages, userId }: ChatUiProps) {
  return (
    <>
    <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ddd", padding: "10px" }}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            textAlign: msg.loggedUser === userId ? "right" : "left",
            backgroundColor: msg.loggedUser === userId ? "#DCF8C6" : "#FFF",
            padding: "5px",
            margin: "5px 0",
            borderRadius: "8px",
          }}
        >
          <strong>{msg.loggedUser === userId ? "Tú" : `Usuario ${msg.loggedUser}`}</strong>: {msg.message}
        </div>
      ))}
    </div>
    </>
    
  );
}