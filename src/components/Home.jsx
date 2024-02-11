import React from 'react'
import UpComing from './UpComing'
import Popular from './Popular'
const Home = () => {
  return (
    <div>
      <UpComing showHeading={false}/>
      <Popular/>  
    </div>
  )
}

export default Home