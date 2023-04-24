import React from 'react'
import { Outlet } from 'react-router-dom'

const Search = () => {
  return (
    <div className='text-[#ffff]'>
      Search
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Search
