import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Slider, Section, NewRelease } from '../../components'

const Home = () => {
  const { today, top100, lastWeek, weekChart } = useSelector((state) => state.app)
  return (
    <div className='overflow-y-auto w-full'>
      <Slider />
      <NewRelease />
      <Section data={today} />
      <Section data={top100} />
      <Section data={lastWeek} />
      <div className='flex items-center px-[43px] w-full mt-12'>
        {weekChart?.map((item) => (
          <Link to={item?.link?.split('.')[0]} key={item.link} className='flex-1 px-4'>
            <img
              src={item.cover}
              alt='cover'
              className='w-full object-cover rounded-md'
            />
          </Link>
        ))}
      </div>
      {/* <div className='mt-12 px-[59px] flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <h3 className='text-[20px] font-bold'>{favoriteArtists?.title}</h3>
          <span className='text-xs'>TẤT CẢ</span>
        </div>
        <div className='flex mx-[-16px]'>
          {favoriteArtists?.items
            ?.filter((item, index) => index <= 4)
            ?.map((item) => (
              <div key={item.encodeId} className='flex-1 px-4'>
                <img
                  src={item.thumbnail}
                  alt='singer'
                  className='w-full object-contain rounded-md'
                />
                <img src={} alt='' />
                <img src='' alt='' />
                <img src='' alt='' />
              </div>
            ))}
        </div>
      </div> */}
      <div className='w-full h-[500px]'></div>
    </div>
  )
}

export default Home
