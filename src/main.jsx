import React from 'react'
import { createRoot } from 'react-dom/client'
import { motion } from 'framer-motion'
import './styles.css'
import { App } from './App'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <App />
    </motion.div>
  </React.StrictMode>
)
