import React, { memo } from 'react'
import List from './List'
import icons from '../ultis/icons'
import moment from 'moment'
import { useSelector } from 'react-redux'

const { BsDot } = icons

const Lists = ({ totalDuration }) => {
  // console.log({ songs, totalDuration })
  const { songs } = useSelector((state) => state.music)

  return (
    <div className='w-full flex flex-col text-xs text-[#7F7A85]'>
      <div className='flex justify-between items-center p-[10px] font-bold'>
        <span>BÀI HÁT</span>
        <span>ALBUM</span>
        <span>THỜI GIAN</span>
      </div>
      <div className='flex flex-col'>
        {songs?.map((item) => (
          <List key={item.encodeId} songData={item} />
        ))}
      </div>
      <span className='flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]'>
        <span className='text-[#7F7A85] text-sm font-medium'>{`${songs?.length} bài hát`}</span>
        <BsDot size={20} />
        <span className='text-[#7F7A85] text-sm font-medium'>
          {moment.utc(totalDuration * 1000).format('HH:mm:ss')}
        </span>
      </span>
    </div>
  )
}

export default memo(Lists)
