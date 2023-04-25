import React from 'react'
import { Outlet } from 'react-router-dom'

const Search = () => {
  return (
    <div className='text-[#ffff]'>
      <div className='flex h-[50px] mb-7 items-center text-sm border-b border-[#2f2739] pl-[60px] pb-1'>
        <span className='text-[24px] font-bold pr-6 border-r border-[#2f2739]'>
          Kết quả tìm kiếm
        </span>
        <div className='flex items-center'>
          <span className='px-4 hover:text-[#ffff] text-[#d7d7d8] font-semibold cursor-pointer'>
            TẤT CẢ
          </span>
          <span className='px-4 hover:text-[#ffff] text-[#d7d7d8] font-semibold cursor-pointer'>
            BÀI HÁT
          </span>
          <span className='px-4 hover:text-[#ffff] text-[#d7d7d8] font-semibold cursor-pointer'>
            PLAYLIST/ALBUM
          </span>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Search
