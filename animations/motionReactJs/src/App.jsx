import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const App = () => {

  const [show, setShow] = useState(false)

  return (
    <div>
      <button
        onClick={() => {
          setShow((prev) => !prev)
        }}
      >
        {show ? "hide" : "show"}
      </button>
      <AnimatePresence>
        {show && (<motion.div
          initial={{ opacity: 0, y: 300 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          exit={{ opacity: 0, y: 300 }}
          className='box'
        ></motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
