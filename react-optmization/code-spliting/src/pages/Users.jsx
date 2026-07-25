import React from 'react'
import UserCard from '../components/UserCard'

const Users = () => {

  const users = [
    {id:1, name: "test1"},
    {id:2, name: "test2"},
    {id:3, name: "test3"}
  ]

  console.log(users)

  return (
    <div>

      {/* <UserCard /> */}
      {
        users.map((user,idx) => {
          return <div key={user.id} className='w-full p-2'>
            <div className='h-[30vh] w-[20vw] border-1 '>
              <h1>{user.name}</h1>
            </div>
          </div>
        })
      }

    </div>
  )
}

export default Users