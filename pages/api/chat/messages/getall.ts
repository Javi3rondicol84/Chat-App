import connection from "@/app/components/db/db";
import type { NextApiRequest, NextApiResponse } from "next";
import mysql, { RowDataPacket } from 'mysql2';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        const chatid = req.query.chatid;

        if (!chatid) {
            return res.status(400).json({ error: 'chat_id is required' });
        }

        const query = 'SELECT user_id AS loggedUser, content AS message, TIME(sent_at) AS time FROM messages WHERE chat_id = ?';
        
        connection.query(query, chatid, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error consulting in the database' });
            }

            const rows = results as RowDataPacket[];

            console.log(rows);

            if(rows.length === 0) {
                return res.status(200).json({ messages: null });
            }
    
            return res.status(200).json({ messages: rows});
        });
    }
    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
