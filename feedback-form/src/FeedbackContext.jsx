import React, { createContext, useContext, useState } from 'react'


const FeedbackContext = createContext()


export function FeedbackProvider({children}){
const [feedback, setFeedback] = useState({ name: '', rating: 0, comments: '' })


const update = (patch) => setFeedback(prev => ({ ...prev, ...patch }))


return (
<FeedbackContext.Provider value={{feedback, update, setFeedback}}>
{children}
</FeedbackContext.Provider>
)
}


export function useFeedback(){
return useContext(FeedbackContext)
}