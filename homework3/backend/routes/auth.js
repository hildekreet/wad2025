const express = require('express')
const router = express.Router()
const pool = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'salajane123'

router.post('/signup', async(req, res) =>{
    console.log('Signup request body:', req.body)
    const { email, password } = req.body
    try{
        const userExist = await pool.query('SELECT * FROM users WHERE email=$1', [email])
        if(userExist.rows.length > 0){
            return res.status(400).json({ message: 'Username already exists'})
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const newUser = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
            [email, hashedPassword]
        )

        const token = jwt.sign({ id: newUser.rows[0].id }, JWT_SECRET, { expiresIn: '1h' })

        res.json({ token })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await pool.query('SELECT * FROM users WHERE email=$1', [email])
        if(user.rows.length === 0) return res.status(400).json({ message: 'Invalid credentials' })

        const valid = bcrypt.compareSync(password, user.rows[0].password)
        if(!valid) return res.status(400).json({ message: 'Invalid password' })

        const token = jwt.sign({ id: user.rows[0].id }, JWT_SECRET, { expiresIn: '1h' })
        res.json({ token })
    } catch (err){
        console.error(err)
        res.status(500).send('Server error')
    }
})

module.exports = router