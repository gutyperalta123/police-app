



const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) return res.status(403).json({ message: 'token requerido' })

  try {
    const decoded = jwt.verify(token, 'secreto')
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ message: 'token inválido' })
  }
}

const isAdmin = (req, res, next) => {
  if (req.user.username === 'GustavoPeralta' && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'acceso denegado' })
  }
}

module.exports = { verifyToken, isAdmin }
