import connection from "@/app/components/db/db";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';
import mysql from 'mysql2';
import { RowDataPacket } from "mysql2";

type User = {
  id: number;
  name: string;
  password: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error consulting the database' });
      }

      // Remove passwords before returning the user data
      const users = (results as User[]).map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;  // Return user without password
      });

      res.status(200).json(users);  // Return the modified users array
    });
  }

  if (req.method === 'POST') {
    const { action, name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: 'Name and password are required' });
    }

    if(action === 'register') {
        
      // Hash the password before saving it
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: 'Error hashing the password' });
        }

        const query = 'INSERT INTO users (name, password) VALUES (?, ?)';
        connection.query(query, [name, hashedPassword], (err, result) => {
          if (err) {
            return res.status(500).json({ error: 'Error inserting a new user in the database' });
          }

          // `result` is of type `ResultSetHeader`, so we can access `insertId` directly
          const insertId = (result as mysql.ResultSetHeader).insertId;

          res.status(201).json({
            message: 'User created successfully',
            user: { id: insertId, name },  // Return the new user's id and name
          });
        });
      });
      
    } else if(action === 'login') {
      const query = "SELECT * FROM users WHERE name = ?";
      connection.query(query, [name], (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Error querying the database" });
        }

        const rows = results as RowDataPacket[];

        if (rows.length === 0) {
          return res.status(401).json({ error: "Invalid name or password" });
        }

        const user: mysql.RowDataPacket = rows[0]; // Access the first row

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return res.status(500).json({ error: "Error comparing passwords" });
          }
    
          if (!isMatch) {
            return res.status(401).json({ error: "Invalid name or password" });
          }
    
          res.status(200).json({ message: "Login successful", user: { id: user.id, name: user.name } });
        });
      });
    }

  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
