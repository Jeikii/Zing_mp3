import React, { memo } from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div>
      <ThreeCircles
        height='50'
        width='50'
        color='#4fa94d'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
        ariaLabel='three-circles-rotating'
        outerCircleColor=''
        innerCircleColor=''
        middleCircleColor=''
      />
    </div>
  )
}

export default memo(Loading)
