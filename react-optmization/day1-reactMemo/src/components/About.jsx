import React from 'react'

const About = () => {

    console.log("About rendering..")
  return (
    <div>
      About
      {/* <h1>aboutpage count - {count}</h1> */}
    </div>
  )
}

export default React.memo(About)// ,(next,prev) => {return next.users.id === prev.users.id})

// const About = React.memo(({users}) => {
//     // console.log(users)
//     console.log("About re-rendering...")
//     return (
//         <div>
//             About
//         </div>
//     )
// }, (prev,next) => {
//     return prev.users === next.users
// })

// export default About