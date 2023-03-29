import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const SongItems = ({ thumbnail, title, artists, songId, releaseDate }) => {
  const dispatch = useDispatch()
  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(songId))
        dispatch(actions.play(true))
      }}
      className='w-[45%] min-[1024px]:w-[30%] flex flex-auto p-[10px] gap-[10px] hover:bg-main-200 rounded-md cursor-pointer'
    >
      <img
        src={thumbnail}
        alt='thumbnail'
        className='w-[60px] h-[60px] object-cover rounded-md '
      />
      <div className='flex flex-col'>
        <span className='text-sm font-semibold'>
          {title?.length >= 30 ? `${title?.slice(0, 30)}...` : title}
        </span>
        <span className='text-xs text-gray-700'>{artists}</span>
        <span className='text-xs text-gray-700'>
          {moment(releaseDate * 1000).fromNow()}
        </span>
      </div>
    </div>
  )
}

export default memo(SongItems)
