const express = require('express')
const router = express.Router()
const pool = require('../db')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'salajane123'

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(401)
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.sendStatus(403)
    }
}

router.get('/', auth, async (req, res) => {
    try {
        const posts = await pool.query('SELECT posts.*, users.email as author_email FROM posts LEFT JOIN users ON posts.author = users.id ORDER BY posts.created_at DESC')
        const postsWithAuthor = posts.rows.map(post => ({
            ...post,
            author: post.author_email || 'Anonymous'
        }))
        
        res.json(postsWithAuthor)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

router.post('/', auth, async (req, res) => {
    const { content } = req.body
    try {
        const newPost = await pool.query('INSERT INTO posts (content, author) VALUES ($1, $2) RETURNING *',
            [content, req.user.id]
        )
        const user = await pool.query('SELECT email FROM users WHERE id=$1', [req.user.id])
        
        const postWithAuthor = {
            ...newPost.rows[0],
            author: user.rows[0].email
        }
        
        res.json(postWithAuthor)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

router.delete('/', auth, async (req, res) => {
    try {
        await pool.query('DELETE FROM posts')
        res.json({ message: 'All posts deleted' })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

router.get('/:id', auth, async (req, res) => {
    const { id } = req.params
    try {
        const post = await pool.query('SELECT posts.*, users.email as author_email FROM posts LEFT JOIN users ON posts.author = users.id WHERE posts.id = $1', [id])
        if (post.rows.length === 0) {
            return res.status(404).json({ message: 'Post not found' })
        }
        const postWithAuthor = {
            ...post.rows[0],
            author: post.rows[0].author_email || 'Anonymous'
        }
        
        res.json(postWithAuthor)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

router.put('/:id', auth, async (req, res) => {
    const { id } = req.params
    const { content } = req.body
    try {
        const updated = await pool.query(
            'UPDATE posts SET content=$1 WHERE id=$2 RETURNING *',
            [content, id]
        )
        res.json(updated.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

router.put('/:id/like', auth, async (req, res) => {
    const { id } = req.params
    try {
        const updated = await pool.query(
            'UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id=$1 RETURNING *',
            [id]
        )
        if (updated.rows.length === 0) {
            return res.status(404).json({ message: 'Post not found' })
        }
        res.json(updated.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params
    try {
        await pool.query('DELETE FROM posts WHERE id=$1', [id])
        res.json({ message: 'Post deleted' })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

module.exports = router