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
  style,
}) => {
  const dispatch = useDispatch()
  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(songId))
        dispatch(actions.play(true))
      }}
      className={`w-full flex p-[10px] gap-[10px] justify-between items-center rounded-md cursor-pointer ${
        style || 'text-black hover:bg-main-200'
      }`}
    >
      <div className='flex gap-4'>
        {order && (
          <span
            className={`${
              order === 1
                ? 'text-shadow-first'
                : order === 2
                ? 'text-shadow-second'
                : 'text-shadow-third'
            } text-[rgba(77,34,104,0.9)] text-[32px] m-auto`}
          >
            {order}
          </span>
        )}
        <img
          src={thumbnail}
          alt='thumbnail'
          className='w-[60px] h-[60px] object-cover rounded-md '
        />
        <div className='flex flex-col'>
          <span className='text-sm font-semibold text-[#ffff] leading-normal'>
            {title?.length >= 30 ? `${title?.slice(0, 30)}...` : title}
          </span>
          <span className='text-xs text-gray-300 leading-normal font-semibold'>
            {artists}
          </span>
          {releaseDate && (
            <span
              className={`text-xs font-semibold ${
                order ? 'opacity-50' : 'text-gray-300'
              }`}
            >
              {moment(releaseDate * 1000).fromNow()}
            </span>
          )}
        </div>
      </div>
      {percent && <span className='font-bold '>{`${percent}%`}</span>}
    </div>
  )
}

export default memo(SongItems)
