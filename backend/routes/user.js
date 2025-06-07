



const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { verifyToken, isAdmin } = require('../middleware/auth')

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username, password })
  if (user) {
    const token = jwt.sign({ username: user.username, role: user.role }, 'secreto', { expiresIn: '1h' })
    res.json({ token })
  } else {
    res.status(401).json({ message: 'credenciales inválidas' })
  }
})

router.post('/create', verifyToken, isAdmin, async (req, res) => {
  const { username, password } = req.body
  const newUser = new User({ username, password, role: 'user' })
  try {
    await newUser.save()
    res.status(201).json({ message: 'usuario creado correctamente' })
  } catch (err) {
    res.status(500).json({ message: 'error al crear el usuario' })
  }
})

module.exports = router
