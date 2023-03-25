import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Slider, Section } from '../../components'

const Home = () => {
  const { today, top100, lastWeek } = useSelector((state) => state.app)
  return (
    <div className='overflow-y-auto w-full'>
      <Slider />
      <Section data={today} />
      <Section data={top100} />
      <Section data={lastWeek} />
      <div className='w-full h-[500px]'></div>
    </div>
  )
}

export default Home
