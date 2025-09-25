import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { FeedbackProvider } from './FeedbackContext'
import './index.css'


createRoot(document.getElementById('root')).render(
<React.StrictMode>
<FeedbackProvider>
<App />
</FeedbackProvider>
</React.StrictMode>
)