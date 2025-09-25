import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import FeedbackForm from './FeedbackForm'
import FeedbackSummary from './FeedbackSummary'


export default function App(){
return (
<BrowserRouter>
<div style={{padding:20, fontFamily:'Arial'}}>
<h1>Feedback System</h1>
<nav style={{marginBottom:20}}>
<Link to="/">Form</Link> |{' '}
<Link to="/summary">Summary</Link>
</nav>


<Routes>
<Route path="/" element={<FeedbackForm/>} />
<Route path="/summary" element={<FeedbackSummary/>} />
</Routes>
</div>
</BrowserRouter>
)
}