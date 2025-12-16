const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const postsRoutes = require('./routes/posts')
const pool = require('./db')

const app = express()
const PORT = 3000
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use('/auth', authRoutes)
app.use('/posts', postsRoutes)

const createTables = async () => {
    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL,
            author VARCHAR(255) DEFAULT 'Anonymous',
            avatar TEXT,
            image_base64 TEXT,
            likes INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `)
        console.log('Tables created or exist already')
    } catch (err) {
        console.error(err)
    }
}
createTables()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})