



import React, { useState, useEffect } from 'react'

import Login from './components/Login'
import CreateUser from './components/CreateUser'
import PoliceAddForm from './components/PoliceAddForm'
import PoliceSearchForm from './components/PoliceSearchForm'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [username, setUsername] = useState(localStorage.getItem('username') || '')

  useEffect(() => {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
  }, [token, username])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setToken('')
    setUsername('')
  }

  return (
    <div className="p-4">
      {!token ? (
        <Login setToken={setToken} setUsername={setUsername} />
        
      ) : (
        <>
          <h1 className="text-xl mb-4">Bienvenido, {username}</h1>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded mb-4"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
          <PoliceAddForm />
          <PoliceSearchForm token={token} currentUser={username} />
          {username === 'GustavoPeralta' && (
            <CreateUser token={token} currentUser={username} />
          )}
        </>
      )}
    </div>
  )
}

export default App
