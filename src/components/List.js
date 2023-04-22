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
      className='flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#2f2739] cursor-pointer'
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId))
        dispatch(actions.play(true))
        dispatch(actions.playAlbum(true))
        dispatch(
          actions.setRecent({
            thumbnail: songData?.thumbnail,
            title: songData?.title,
            songId: songData?.encodeId,
            artists: songData?.artistsNames,
          })
        )
      }}
    >
      <div className='flex items-center gap-3 flex-1'>
        <span>
          <CiMusicNote1 size={16} />
        </span>
        <img
          src={songData?.thumbnail}
          alt='thumbnail'
          className='w-10 h-10 object-cover rounded-md'
        />
        <span className='flex flex-col w-full'>
          <span className='text-sm font-semibold text-[#ffff] whitespace-nowrap'>
            {songData?.title?.length > 20
              ? `${songData?.title?.slice(0, 20)}...`
              : songData?.title}
          </span>
          <span className='text-[#7F7A85] text-sm font-medium'>
            {songData?.artistsNames}
          </span>
        </span>
      </div>
      <div className='flex-1 flex items-start justify-evenly text-[#7f7a85] text-sm'>
        {songData?.album?.title?.length > 20
          ? `${songData?.album?.title?.slice(0, 20)}...`
          : songData?.album?.title}
      </div>
      <div className='flex-1 flex justify-end text-[#7f7a85] text-sm'>
        {moment.utc(songData?.duration * 1000).format('mm:ss')}
      </div>
    </div>
  )
}

export default memo(List)
