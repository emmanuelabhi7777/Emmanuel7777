import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Polyfill window.storage using localStorage so the app works outside Claude
if (!window.storage) {
  window.storage = {
    get: async (key) => {
      try {
        const value = localStorage.getItem(key)
        if (value === null) throw new Error('Not found')
        return { key, value }
      } catch {
        throw new Error('Not found')
      }
    },
    set: async (key, value) => {
      localStorage.setItem(key, value)
      return { key, value }
    },
    delete: async (key) => {
      localStorage.removeItem(key)
      return { key, deleted: true }
    },
    list: async (prefix) => {
      const keys = Object.keys(localStorage).filter(k => !prefix || k.startsWith(prefix))
      return { keys }
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
