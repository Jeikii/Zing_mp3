import React, { useEffect, useState, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment'
import { Lists, AudioLoading } from '../../components'
import Scrollbars from 'react-custom-scrollbars-2'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import icons from '../../ultis/icons'

const { BsFillPlayFill } = icons

const Album = () => {
  const location = useLocation()
  const { isPlaying } = useSelector((state) => state.music)
  const { pid } = useParams()
  const [isHover, setIsHover] = useState(false)
  const imageRef = useRef()
  const [playlistData, setPlaylistData] = useState({})
  const dispatch = useDispatch()
  // useState

  useEffect(() => {
    dispatch(actions.setCurAlbumId(pid))
    const fetchDetailPlaylist = async () => {
      dispatch(actions.loading(true))
      const response = await apis.apiGetDetailPlaylist(pid)
      dispatch(actions.loading(false))
      if (response?.data.err === 0) {
        setPlaylistData(response.data?.data)
        dispatch(actions.setPlaylist(response?.data?.data?.song?.items))
      }
    }

    fetchDetailPlaylist()
  }, [pid])

  useEffect(() => {
    if (location.state?.playAlbum) {
      const randomSong =
        Math.round(Math.random() * playlistData?.songs?.items?.length) - 1
      dispatch(actions.setCurSongId(playlistData?.songs?.items[randomSong]?.encodeId))
      dispatch(actions.play(true))
    }
  }, [pid, playlistData])

  const handleHover = () => {
    setIsHover(true)
    imageRef.current.classList.remove('animate-scale-down-image')
    imageRef.current.classList.add('animate-scale-up-image')
  }

  const handleLeave = () => {
    setIsHover(true)
    imageRef.current.classList.add('animate-scale-down-image')
    imageRef.current.classList.remove('animate-scale-up-image')
  }

  return (
    <div className='flex relative gap-8 w-full h-full px-[59px] animate-scale-up-center'>
      <div className='flex-none w-1/4 border border-red-600 flex flex-col items-center gap-2'>
        <div
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          className='w-full relative overflow-hidden'
        >
          <img
            ref={imageRef}
            src={playlistData?.thumbnailM}
            alt='thumbnail'
            className={`w-full obj-contain shadow-lg`}
          />
          <div
            className={`absolute top-0 left-0 bottom-0 right-0 hover:bg-overlay-30 text-white flex items-center justify-center ${
              isPlaying && 'hover:bg-transparent'
            }`}
          >
            <span className='p-2 border border-white rounded-full'>
              {isPlaying ? <AudioLoading /> : <BsFillPlayFill size={30} />}
            </span>
          </div>
        </div>
        <div className='flex flex-col items-center gap-1'>
          <h3 className='text-[22px] font-bold text-[#ffff]'>{playlistData?.title}</h3>
          <span className='flex gap-2 items-center text-[#7F7A85] text-sm font-medium'>
            <span>Cập nhật: </span>
            <span>
              {moment.unix(playlistData?.contentLastUpdate).format('DD/MM/YYYY')}
            </span>
          </span>
          <span className='flex gap-2 items-center text-[#7F7A85] text-sm font-medium'>
            {playlistData?.artistsNames}
          </span>
          <span className='flex gap-2 items-center text-[#7F7A85] text-sm font-medium'>{`${Math.round(
            playlistData?.like / 1000
          )}K người yêu thích`}</span>
        </div>
      </div>
      <Scrollbars style={{ width: '100%', height: '78%' }}>
        <div className='flex-auto mb-40'>
          <span className='text-sm'>
            <span className='text-[#7F7A85] text-sm'>Lời tựa </span>
            <span className='text-[#ffff] text-sm font-semibold'>
              {playlistData?.sortDescription}
            </span>
          </span>
          <Lists totalDuration={playlistData?.song?.totalDuration} />
        </div>
      </Scrollbars>
    </div>
  )
}

export default Album
