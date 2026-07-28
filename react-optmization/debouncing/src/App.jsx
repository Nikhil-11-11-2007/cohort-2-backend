import React from 'react'

const App = () => {

  let lastClicked = 0

  const Onclicked = () => {
    const now = Date.now() 
    if(now - lastClicked >= 2000){
      console.log("Api calling", now)
      lastClicked = now
    }
  }

  return (
    <div>
      <button onClick={Onclicked}>Click Me</button>
    </div>
  )
}

export default App