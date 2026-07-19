import React from 'react'

const About = ({users}) => {

    console.log("About rendering...")

    return (
        <div>About</div>
    )
}

export default React.memo(About, (prevProps, nextProps) => {
    return prevProps.users.name === nextProps.users.name ? console.log("no-rerendering"):console.log("re-rendering")
})