import connection from "@/app/components/db/db";
import type { NextApiRequest, NextApiResponse } from "next";
import mysql, { RowDataPacket } from 'mysql2';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        const body = req.body;

        const userLoggedId = body.userLoggedId;
        const userId = body.userId;

        const insertChatQuery = "INSERT INTO chats (name) VALUES ('chat') ";

        connection.query(insertChatQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error creating new chat" });
            }

            const chatId = (result as mysql.ResultSetHeader).insertId;

            // 3. Insertar ambos usuarios en la tabla 'users_chat' con el nuevo chat_id
            const insertUsersQuery = `
                INSERT INTO user_chats (user_id, chat_id) 
                VALUES (?, ?), (?, ?)
            `;

            connection.query(insertUsersQuery, [userLoggedId, chatId, userId, chatId], (err) => {
                if (err) {
                    return res.status(500).json({ error: "Error inserting users into chat" });
                }

                return res.status(201).json({ message: "Chat created successfully", chatId });
            });
        });
    }
    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }

}