import connection from "@/app/components/db/db";
import type { NextApiRequest, NextApiResponse } from "next";
import mysql, { RowDataPacket } from 'mysql2';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        const body = req.body;

        const query = 'INSERT INTO messages (chat_id, user_id, content) VALUES (?, ?, ?)';

        connection.query(query, [body.chatId, body.loggedUser, body.message], (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Error adding new message" });
            }

            return res.status(201).json({ message: "Message created successfully"});
        });
    }
    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }

}