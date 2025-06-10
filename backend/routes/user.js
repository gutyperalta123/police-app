



const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { verifyToken, isAdmin } = require('../middleware/auth')

router.post('/login', async (req, res) => {
  console.log('🟡 POST /login recibido con:', req.body) // <--- LOG NUEVO
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user || user.password !== password) {
      console.log('🔴 Usuario o contraseña inválidos')
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    console.log('🟢 Usuario autenticado:', username)
    res.json({ token })
  } catch (error) {
    console.error('❌ Error en /login:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
})
