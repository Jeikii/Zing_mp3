import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getArrSlider } from '../ultis/function'
import * as actions from '../store/actions'

const Slider = () => {
  const { banner } = useSelector((state) => state.app)
  const dispatch = useDispatch()

  useEffect(() => {
    const sliderElements = document.getElementsByClassName('slider-item')
    let min = 0
    let max = 2
    const intervalId = setInterval(() => {
      const list = getArrSlider(min, max, sliderElements.length - 1)
      for (let i = 0; i < sliderElements.length; i++) {
        // Delete classnames inline css
        sliderElements[i]?.classList?.remove('animate-slide-right', 'order-last', 'z-10')
        sliderElements[i]?.classList?.remove('animate-slide-left', 'order-first', 'z-20')
        sliderElements[i]?.classList?.remove('animate-slide-left-2', 'order-2', 'z-20')

        // Hide or Show images
        if (list.some((item) => item === i)) {
          sliderElements[i].style.cssText = `display: block`
        } else {
          sliderElements[i].style.cssText = `display: none`
        }
      }

      // Add animation by adding classnames
      list.forEach((item) => {
        if (item === max) {
          sliderElements[item]?.classList?.add(
            'animate-slide-right',
            'order-last',
            'z-10'
          )
        } else if (item === min) {
          sliderElements[item]?.classList?.add(
            'animate-slide-left',
            'order-first',
            'z-20'
          )
        } else {
          sliderElements[item]?.classList?.add('animate-slide-left-2', 'order-2', 'z-20')
        }
      })

      min === sliderElements.length - 1 ? (min = 0) : (min += 1)
      max === sliderElements.length - 1 ? (max = 0) : (max += 1)
    }, 4000)
    return () => {
      intervalId && clearInterval(intervalId)
    }
  }, [])

  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(actions.setCurSongId(item.encodeId))
      dispatch(actions.play(true))
    }
  }

  return (
    <div className='w-full overflow-hidden px-[59px]'>
      <div className='flex w-full gap-8 pt-8'>
        {banner?.map((item, index) => (
          <img
            alt=''
            key={item.encodeId}
            src={item.banner}
            onClick={() => handleClickBanner(item)}
            className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${
              index <= 2 ? 'block' : 'hidden'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
