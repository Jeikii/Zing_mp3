import React, { useState, useEffect } from 'react'
import icons from '../ultis/icons'
import { apiSearch } from '../apis'

const { BsSearch } = icons

const Search = () => {
  const [keyword, setKeyword] = useState('')

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      const response = await apiSearch(keyword)
      console.log(response)
    }
  }

  return (
    <div className='w-full flex items-center'>
      <span className='h-10 pl-4 bg-[#2F2739] flex items-center justify-center rounded-l-[20px] text-gray-500'>
        <BsSearch size={20} />
      </span>
      <input
        type='text'
        className='outline-none bg-[#2F2739] px-4 py-2 w-full rounded-r-[20px] h-10 text-gray-500'
        placeholder='Nhập tên bài hát, nghệ sĩ hoặc MV...'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
      />
    </div>
  )
}

export default Search
