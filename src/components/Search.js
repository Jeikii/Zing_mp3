import React from 'react'
import icons from '../ultis/icons'

const { BsSearch } = icons

const Search = () => {
  return (
    <div className='w-full flex items-center'>
      <span className='h-10 pl-4 bg-[#dde4e4] flex items-center justify-center rounded-l-[20px] text-gray-500'>
        <BsSearch size={20} />
      </span>
      <input
        type='text'
        className='outline-none bg-[#dde4e4] px-4 py-2 w-full rounded-r-[20px] h-10 text-gray-500'
        placeholder='Nhập tên bài hát, nghệ sĩ hoặc MV...'
      />
    </div>
  )
}

export default Search
