import React, { memo } from 'react'
import icons from '../ultis/icons'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const { CiMusicNote1 } = icons

const List = ({ songData }) => {
  const dispatch = useDispatch()

  // console.log(songData)
  return (
    <div
      className='flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#dde4e4] cursor-pointer'
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId))
        dispatch(actions.play(true))
      }}
    >
      <div className='flex items-center gap-3 flex-1'>
        <span>
          <CiMusicNote1 />
        </span>
        <img
          src={songData?.thumbnail}
          alt='thumbnail'
          className='w-10 h-10 object-cover rounded-md'
        />
        <span className='flex flex-col w-full'>
          <span className='text-sm font-semibold whitespace-nowrap'>
            {songData?.title?.length > 20
              ? `${songData?.title?.slice(0, 20)}...`
              : songData?.title}
          </span>
          <span>{songData?.artistsNames}</span>
        </span>
      </div>
      <div className='flex-1 flex items-start justify-evenly'>
        {songData?.album?.title?.length > 20
          ? `${songData?.album?.title?.slice(0, 20)}...`
          : songData?.album?.title}
      </div>
      <div className='flex-1 flex justify-end'>
        {moment.utc(songData?.duration * 1000).format('mm:ss')}
      </div>
    </div>
  )
}

export default memo(List)
