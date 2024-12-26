import React from 'react'
import { auth } from '../../firebase/firebaseConfig';

const Welcome = () => {
    const user = auth.currentUser;

  return (
    <div className='welcome'>
        <h1>Welcome {user?.displayName}</h1>
    </div>
  )
}

export default Welcome