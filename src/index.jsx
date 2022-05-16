require('file-loader?name=[name].[ext]!./index.html')

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'


const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    <Router>
        <App />        
    </Router>
)