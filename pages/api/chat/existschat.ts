import connection from "@/app/components/db/db";
import type { NextApiRequest, NextApiResponse } from "next";
import mysql, { RowDataPacket } from 'mysql2';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        const body = req.body;

        const userLoggedId = body.userLoggedId;
        const userId = body.userId;

        console.log("userllogedidddddddd: "+userLoggedId);
        console.log("userIddddd: "+userId);

        const query = 'SELECT chat_id FROM user_chats WHERE user_id IN (?, ?) GROUP BY chat_id HAVING COUNT(DISTINCT user_id) = 2';
        connection.query(query, [userLoggedId, userId], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error consulting in the database' });
            }

            const row = results as RowDataPacket[];

            if(row.length === 0) {
                console.log("row length 0")
                return res.status(200).json({ chatExists: false });
            }
            else {
                console.log("row length more than 0")
                return res.status(200).json({ chatExists: true, chatId: row[0].chat_id});
            }
            
        });
    }
    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
