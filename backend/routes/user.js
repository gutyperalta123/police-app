const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { verifyToken, isAdmin } = require('../middleware/auth')
router.post('/create', async (req, res) => {
  try {
    const { username, password } = req.body
    const nuevoUsuario = new User({
      username,
      password,
      role: 'user'
    })
    await nuevoUsuario.save()
    res.status(201).json({ message: 'usuario creado' })
  } catch (err) {
    res.status(500).json({ message: 'error al crear el usuario' })
  }
})

module.exports = router
