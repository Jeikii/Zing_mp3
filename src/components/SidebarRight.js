import React, { useState, useEffect } from 'react'
import icons from '../ultis/icons'
import { useSelector } from 'react-redux'
import SongItems from './SongItems'
import { apiGetDetailPlaylist } from '../apis'
import Scrollbars from 'react-custom-scrollbars-2'

const { FiTrash2 } = icons

const SidebarRight = () => {
  const [isRecent, setIsRecent] = useState(false)
  const [playlist, setPlaylist] = useState()
  const { curSongData, curAlbumId, isPlaying, recentSongs, curSongId } = useSelector(
    (state) => state.music
  )
  // console.log(curSongData)
  const fetchDetailPlaylist = async () => {
    const response = await apiGetDetailPlaylist(curAlbumId)
    // console.log(response)
    if (response.data?.err === 0) setPlaylist(response.data?.data?.song?.items)
  }

  useEffect(() => {
    curAlbumId && fetchDetailPlaylist()
  }, [])

  useEffect(() => {
    if (curAlbumId && isPlaying) fetchDetailPlaylist()
  }, [curAlbumId, isPlaying])

  useEffect(() => {
    isPlaying && setIsRecent(false)
  }, [isPlaying, curSongId])
  // console.log(playlist)
  // console.log(recentSongs)

  return (
    <div className='flex flex-col w-[329px] h-full text-xs bg-[#170F23]'>
      <div className='h-[70px] flex-none py-[14px] px-2 gap-8 flex justify-between items-center text-[#ffff]'>
        <div className='flex flex-auto justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer'>
          <span
            className={`py-[5px] ${
              !isRecent && 'bg-[#6D6875]'
            } flex-1 flex justify-center rounded-l-full rounded-r-full items-center font-semibold`}
            onClick={() => setIsRecent((prev) => !prev)}
          >
            Danh sách phát
          </span>
          <span
            className={`py-[5px] ${
              isRecent && 'bg-[#6D6875]'
            } flex-1 flex justify-center rounded-l-full rounded-r-full items-center font-semibold`}
            onClick={() => setIsRecent((prev) => !prev)}
          >
            Nghe gần đây
          </span>
        </div>
        <span className='p-2 rounded-full cursor-pointer hover:bg-[#6D6875]'>
          <FiTrash2 size={14} />
        </span>
      </div>
      {isRecent ? (
        <div className='text-[#ffff] w-full flex flex-col flex-auto px-2'>
          <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
            {recentSongs && (
              <div className='flex flex-col'>
                {recentSongs?.map((item) => (
                  <SongItems
                    key={item?.songId}
                    thumbnail={item?.thumbnail}
                    title={item?.title}
                    artists={item?.artists}
                    songId={item?.songId}
                    sm
                  />
                ))}
              </div>
            )}
          </Scrollbars>
        </div>
      ) : (
        <div className='text-[#ffff] w-full flex flex-col flex-auto px-2'>
          <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
            <SongItems
              thumbnail={curSongData?.thumbnail}
              title={curSongData?.title}
              artists={curSongData?.artistsNames}
              songId={curSongData?.encodeId}
              sm
              style='bg-main-500'
            />
            <div className='flex flex-col text-[#ffff] pt-[15px] px-2 pb-[5px]'>
              <span className='text-sm font-bold'>Tiếp theo</span>
              <span className='opacity-70 text-sm flex gap-1'>
                <span>Từ playlist </span>
                <span className='font-bold text-sm text-[#b069d9]'>
                  {curSongData?.album?.title > 30
                    ? `${curSongData?.album?.title?.slice(0, 30)}...`
                    : curSongData?.album?.title}
                </span>
              </span>
            </div>
            {playlist && (
              <div className='flex flex-col'>
                {playlist?.map((item) => (
                  <SongItems
                    key={item?.encodeId}
                    thumbnail={item?.thumbnail}
                    title={item?.title}
                    artists={item?.artistsNames}
                    songId={item?.encodeId}
                    sm
                  />
                ))}
              </div>
            )}
          </Scrollbars>
        </div>
      )}
      <div className='w-full h-[90px]'></div>
    </div>
  )
}

export default SidebarRight
