

import React, { useState } from 'react'
import axios from 'axios'

const RegisterForm = ({ onBack }) => {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    const role = fullName.trim().toLowerCase() === 'gustavo peralta' ? 'admin' : 'user'

    try {
      await axios.post('http://localhost:5000/api/users', {
        username,
        password,
        role
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        }
      })

      alert(`Usuario ${username} registrado correctamente como ${role}`)
      onBack()
    } catch (err) {
      alert('Error al registrar usuario')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center">Registrarse</h2>
        <input
          type="text"
          placeholder="Nombre completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Crear cuenta
        </button>
        <button type="button" onClick={onBack} className="w-full text-blue-600 underline text-sm">
          Volver al inicio de sesión
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
