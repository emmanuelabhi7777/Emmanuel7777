import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Supabase credentials
window.SUPABASE_URL = "https://nuvmcferrfknxmuydtch.supabase.co"
window.SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dm1jZmVycmZrbnhtdXlkdGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExODY3ODMsImV4cCI6MjA5Njc2Mjc4M30.bqg182QfY1hnaAcnMjONTjPXlZHoSOGBYbdVMIqj4tc"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
