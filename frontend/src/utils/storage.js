



import axios from 'axios'

export const searchObjects = async token => {
  try {
    const res = await axios.get('http://localhost:5000/api/objetos', {
      headers: { Authorization: token }
    })
    return res.data
  } catch {
    return []
  }
}

export const deleteObject = async (id, token) => {
  try {
    await axios.delete(`http://localhost:5000/api/objetos/${id}`, {
      headers: { Authorization: token }
    })
  } catch {
    alert('Error al eliminar')
  }
}
