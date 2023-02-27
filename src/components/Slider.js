import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getArrSlider } from '../ultis/function'

const Slider = () => {
  const { banner } = useSelector((state) => state.app)

  useEffect(() => {
    const sliderElements = document.getElementsByClassName('slider-item')
    let min = 0
    let max = 2
    const intervalId = setInterval(() => {
      const list = getArrSlider(min, max, sliderElements.length - 1)
      for (let i = 0; i < sliderElements.length; i++) {
        if (list.some((item) => item === i)) {
          sliderElements[i].style.cssText = `display: none`
        } else {
          sliderElements[i].style.cssText = `display: block`
        }
      }
      if (min === sliderElements.length - 1) {
        min = 0
      } else {
        min += 1
      }
      if (max === sliderElements.length - 1) {
        max = 0
      } else {
        max += 1
      }
      console.log(list)
    }, 1000)
    return () => {
      intervalId && clearInterval(intervalId)
    }
  }, [])

  return (
    <div className='flex gap-4 w-full overflow-hidden px-[59px] pt-8'>
      {banner?.map((item) => (
        <img
          alt=''
          key={item.encodeId}
          src={item.banner}
          className='slider-item flex-1 object-contain w-1/3 rounded-lg'
        />
      ))}
    </div>
  )
}

export default Slider
