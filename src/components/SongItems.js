import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const SongItems = ({
  thumbnail,
  title,
  artists,
  songId,
  releaseDate,
  order,
  percent,
}) => {
  const dispatch = useDispatch()
  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(songId))
        dispatch(actions.play(true))
      }}
      className={`w-full flex p-[10px] gap-[10px] justify-between items-center rounded-md cursor-pointer ${
        order
          ? 'text-white bg-[hsla(0,0%,100%,0.07)] hover:bg-[#a874b8]'
          : 'text-black hover:bg-main-200'
      }`}
    >
      <div className='flex gap-4'>
        {order && (
          <span className={`${order === 1 ? '' : ''} text-white text-[32px] m-auto`}>
            {order}
          </span>
        )}
        <img
          src={thumbnail}
          alt='thumbnail'
          className='w-[60px] h-[60px] object-cover rounded-md '
        />
        <div className='flex flex-col'>
          <span className='text-sm font-semibold'>
            {title?.length >= 30 ? `${title?.slice(0, 30)}...` : title}
          </span>
          <span className='text-xs opacity-70'>{artists}</span>
          {releaseDate && (
            <span className={`text-xs ${order ? 'opacity-70' : 'text-gray-700'}`}>
              {moment(releaseDate * 1000).fromNow()}
            </span>
          )}
        </div>
      </div>
      {percent && <span>{`${percent}%`}</span>}
    </div>
  )
}

export default memo(SongItems)
