import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFeedback } from './FeedbackContext'


export default function FeedbackSummary(){
const { feedback } = useFeedback()
const navigate = useNavigate()


// If user lands on summary without valid feedback, redirect back
useEffect(()=>{
const valid = feedback && feedback.name && feedback.rating >=1 && feedback.comments && feedback.comments.length >= 5
if(!valid) navigate('/')
}, [feedback, navigate])


return (
<div>
<h2>Feedback Summary</h2>
<p><strong>Name:</strong> {feedback.name}</p>
<p><strong>Rating:</strong> {feedback.rating}</p>
<p><strong>Comments:</strong> {feedback.comments}</p>


<button onClick={()=> navigate('/')}>Back to Form</button>
</div>
)
}