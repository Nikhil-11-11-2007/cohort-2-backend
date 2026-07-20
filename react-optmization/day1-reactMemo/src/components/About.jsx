import React from 'react'

const About = ({ users }) => {

    console.log("About rendering...")

    return (
        <div>About</div>
    )
}

export default React.memo(About, (prevProps, nextProps) => {
    const same = prevProps.users.name === nextProps.users.name

    console.log(same? "no-rerendering":"re-rendering")

    return same
})