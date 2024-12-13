USE chatdb;
CREATE TABLE IF NOT EXISTS  users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

USE chatdb;
CREATE TABLE IF NOT EXISTS chats (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,  -- Optional: Chat room name
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

USE chatdb;
CREATE TABLE IF NOT EXISTS user_chats (
    user_id INT NOT NULL,
    chat_id BIGINT NOT NULL,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, chat_id),  -- Composite primary key
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE
);

USE chatdb;
CREATE TABLE IF NOT EXISTS messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    chat_id BIGINT NOT NULL,  -- Link to the chat
    user_id INT NOT NULL,  -- Link to the user who sent the message
    content TEXT NOT NULL,    -- The message content
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- When the message was sent
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);