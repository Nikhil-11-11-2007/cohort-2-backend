import React from 'react'
import { motion } from 'motion/react'

const App = () => {

  const containerVarient = {
    hidden: {},
    visible: {}
  }

  const boxVarient = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      x: 500
    }
  }

  return (
    <div>
      <motion.div
        variants={containerVarient}
        initial="hidden"
        animate="visible"
        transition={{staggerChildren: 0.1}}
        className='container'
      >
        <motion.div
          variants={boxVarient}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="box"
        ></motion.div>
        <motion.div
          variants={boxVarient}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="box"
        ></motion.div>
        <motion.div
          variants={boxVarient}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="box"
        ></motion.div>
      </motion.div>
    </div>
  )
}

export default App
