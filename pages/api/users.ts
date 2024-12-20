import connection from "@/app/components/db/db";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';
import mysql from 'mysql2';
import { RowDataPacket } from "mysql2";
import { generateToken} from "@/app/utils/jwt";

export type User = {
  id: number;
  name: string;
  password: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (id) {
      connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Error consulting the database' });
        }
        
        const user = results as User[]; // Access the first row of the result

        if (user.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Remove password before returning the user data
        const { password, ...userWithoutPassword } = user[0];
    
        res.status(200).json(userWithoutPassword); // Return the user without the password
      });

      return;
    }
    
    else {
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
      return;
    }

  }

  if (req.method === 'POST') {
    const { action, name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: 'Name and password are required' });
    }

    if(action === 'register') {
      const checkUserQuery = 'SELECT * FROM users WHERE name = ?';
      connection.query(checkUserQuery, [name], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Error checking for existing user' });
        }

        const rows = result as RowDataPacket[];
    
        if (rows.length > 0) {
          return res.status(400).json({ error: 'Username is already taken' });
        }
    
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            return res.status(500).json({ error: 'Error hashing the password' });
          }
    
          const query = 'INSERT INTO users (name, password) VALUES (?, ?)';
          connection.query(query, [name, hashedPassword], (err, result) => {
            if (err) {
              return res.status(500).json({ error: 'Error inserting a new user in the database' });
            }
    
            const insertId = (result as mysql.ResultSetHeader).insertId;
    
            res.status(201).json({
              message: 'User created successfully',
              user: { id: insertId, name },
            });
          });
        });
      });

      return;
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
    
          const name: string = user.name;
          const token = generateToken({name});

          const dataSend = {
            id: user.id,
            token: token  
          }

          // res.status(200).json({ message: "Login successful", user: { id: user.id, name: user.name } });
          res.status(200).json(dataSend);

          return dataSend;
        });
      });
    }

  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
