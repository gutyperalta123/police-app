




import React, { useState } from 'react'
import PoliceAddForm from './PoliceAddForm'
import PoliceSearchForm from './PoliceSearchForm'

const PoliceTabs = ({ username, onLogout }) => {
  const [activeTab, setActiveTab] = useState('add')
  const isAdmin = username.trim().toLowerCase() === 'gustavo peralta'

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            onClick={() => setActiveTab('add')}
            className={`mr-2 px-4 py-2 rounded ${activeTab === 'add' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Agregar
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 rounded ${activeTab === 'search' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Buscar
          </button>
        </div>
        <div>
          <span className="mr-2 font-semibold">{username}</span>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {activeTab === 'add' ? (
        <PoliceAddForm />
      ) : (
        <PoliceSearchForm isAdmin={isAdmin} />
      )}
    </div>
  )
}

export default PoliceTabs
