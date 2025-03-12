import { useState, useEffect } from "react";

const Chat = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "client", text: "Hey, I need a website!", profilePic: "https://source.unsplash.com/40x40/?user" },
    { id: 2, sender: "freelancer", text: "Sure! What's your budget?", profilePic: "https://source.unsplash.com/40x40/?man" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const typingTimeout = setTimeout(() => setIsTyping(false), 2000);
    return () => clearTimeout(typingTimeout);
  }, [newMessage]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      sender: "freelancer",
      text: newMessage,
      profilePic: "https://source.unsplash.com/40x40/?man",
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 bg-gray-900 text-white p-4 rounded-lg shadow-xl">
      <div className="flex justify-between items-center pb-3 border-b border-gray-700">
        <h2 className="text-lg font-bold text-blue-400">Chat</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-red-500">✖</button>
      </div>
      <div className="flex-1 overflow-y-auto h-64 p-2 bg-gray-800 rounded-md">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start space-x-2 mb-3 ${msg.sender === "freelancer" ? "justify-end" : ""}`}>
            {msg.sender === "client" && <img src={msg.profilePic} className="w-8 h-8 rounded-full" alt="Profile" />}
            <div className={`p-2 rounded-lg max-w-xs ${msg.sender === "freelancer" ? "bg-blue-600 text-white" : "bg-gray-700 text-white"}`}>
              <p>{msg.text}</p>
            </div>
            {msg.sender === "freelancer" && <img src={msg.profilePic} className="w-8 h-8 rounded-full" alt="Profile" />}
          </div>
        ))}
        {isTyping && <p className="text-sm text-gray-400">Client is typing...</p>}
      </div>
      <div className="flex mt-3">
        <input
          type="text"
          className="flex-1 p-2 bg-gray-700 rounded-lg text-white"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            setIsTyping(true);
          }}
        />
        <button onClick={handleSendMessage} className="ml-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">Send</button>
      </div>
    </div>
  );
};

export default Chat;
