import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarLeft, SidebarRight, Player, Header, Loading } from '../../components'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useSelector } from 'react-redux'

const Public = () => {
  const [isShowRightSidebar, setIsShowRightSidebar] = useState(false)
  const { isLoading } = useSelector((state) => state.app)
  return (
    <div className='w-full relative h-screen flex flex-col bg-main-300'>
      <div className='w-full h-full flex flex-auto'>
        <div className='w-[240px] h-full flex-none '>
          <SidebarLeft />
        </div>
        <div className='flex-auto relative flex flex-col '>
          {isLoading && (
            <div className='flex absolute top-0 bottom-0 left-0 right-0 z-20 bg-main-300 items-center justify-center'>
              <Loading />
            </div>
          )}
          <div className='h-[70px] px-[59px] flex flex-none items-center'>
            <Header />
          </div>
          <div className='flex-auto w-full '>
            <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
              <Outlet />
            </Scrollbars>
          </div>
        </div>
        {isShowRightSidebar && (
          <div className='w-[329px] h-screen hidden 1200:flex flex-none right-0 border-l border-[#2f2739] animate-slide-left'>
            <SidebarRight />
          </div>
        )}
        {/* nếu muốn slide thì dùng cách này, thêm toán thử 3 ngôi
        <div className='w-[329px] h-full hidden 1200:flex fixed right-[-329px] z-50 animate-slide-right-2'>
            <SidebarRight />
          </div>
        */}
      </div>
      <div className='fixed z-50 bottom-0 left-0 right-0 h-[90px]'>
        <Player setIsShowRightSidebar={setIsShowRightSidebar} />
      </div>
    </div>
  )
}

export default Public
