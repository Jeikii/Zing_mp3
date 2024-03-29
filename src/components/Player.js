import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import * as apis from '../apis'
import icons from '../ultis/icons'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'
import moment from 'moment'
import { toast } from 'react-toastify'
import { LoadingSong } from './'

const {
  AiFillHeart,
  AiOutlineHeart,
  BsThreeDots,
  MdSkipNext,
  MdSkipPrevious,
  CiRepeat,
  CiShuffle,
  BsFillPlayFill,
  BsPauseFill,
  TbRepeatOnce,
  RiPlayListFill,
  FiVolumeX,
  FiVolume1,
  FiVolume2,
} = icons

var intervalId

const Player = ({ setIsShowRightSidebar }) => {
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music)
  const [songInfo, setSongInfo] = useState(null)
  const [audio, setAudio] = useState(new Audio())
  const [curSeconds, setCurSeconds] = useState(0)
  const [isShuffle, setIsShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState(0)
  const [isLoadedSource, setIsLoadedSource] = useState(true)
  const [volume, setVolume] = useState(100)
  const dispatch = useDispatch()
  const thumbRef = useRef()
  const trackRef = useRef()

  useEffect(() => {
    const fetchDetailSong = async () => {
      setIsLoadedSource(false)
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ])
      setIsLoadedSource(true)
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data)
        dispatch(actions.setCurSongData(res1.data.data))
      }
      if (res2.data.err === 0) {
        audio.pause()
        setAudio(new Audio(res2.data.data['128']))
      } else {
        audio.pause()
        setAudio(new Audio())
        dispatch(actions.play(false))
        toast.warn(res2.data.msg)
        setCurSeconds(0)
        thumbRef.current.style.cssText = `right: 100%`
      }
    }
    fetchDetailSong()
  }, [curSongId])

  useEffect(() => {
    intervalId && clearInterval(intervalId)
    audio.pause()
    audio.load()
    if (isPlaying && thumbRef.current) {
      audio.play()
      intervalId = setInterval(() => {
        let percent = Math.round((audio.currentTime * 10000) / songInfo.duration) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        setCurSeconds(Math.round(audio.currentTime))
      }, 10)
    }
  }, [audio])

  useEffect(() => {
    const handleEnded = () => {
      if (isShuffle) {
        handleShuffle()
      } else if (repeatMode) {
        repeatMode === 1 ? handleRepeatOne() : handleNextSong()
      } else {
        audio.pause()
        dispatch(actions.play(false))
      }
    }
    audio.addEventListener('ended', handleEnded)
    return () => {
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audio, isShuffle, repeatMode])

  useEffect(() => {
    audio.volume = volume / 100
  }, [volume])

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause()
      dispatch(actions.play(false))
    } else {
      audio.play()
      dispatch(actions.play(true))
    }
  }

  const handleClickProgressBar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect()
    const percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) / 100
    thumbRef.current.style.cssText = `right: ${100 - percent}%`
    audio.currentTime = (percent * songInfo.duration) / 100
    setCurSeconds(Math.round((percent * songInfo.duration) / 100))
  }

  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index
      })
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId))
      dispatch(actions.play(true))
    }
  }

  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index
      })
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId))
      dispatch(actions.play(true))
    }
  }

  const handleShuffle = () => {
    const randomIndex = Math.round(Math.random() * songs?.length) - 1
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId))
    dispatch(actions.play(true))
  }

  const handleRepeatOne = () => {
    audio.play()
  }

  return (
    <div className='bg-main-400 px-5 h-full flex'>
      <div className='w-[30%] flex-auto gap-3 flex items-center'>
        <img
          src={songInfo?.thumbnail}
          alt='thumbnail'
          className='w-16 h-16 object-cover rounded-md'
        />
        <div className='flex flex-col'>
          <span className='font-semibold text-[#fff] text-sm'>{songInfo?.title}</span>
          <span className='text-xs text-gray-500'>{songInfo?.artistsNames}</span>
        </div>
        <div className='flex gap-4 pl-2 text-[#Fff]'>
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className='w-[40%] flex-auto flex items-center justify-center flex-col gap-2 py-2'>
        <div className='flex gap-8 justify-center items-center text-[#fff]'>
          <span
            className={`cursor-pointer ${isShuffle && 'text-purple-600'}`}
            title='Bật phát ngẫu nhiên'
            onClick={() => setIsShuffle((prev) => !prev)}
          >
            <CiShuffle size={24} />
          </span>
          <span
            onClick={handlePrevSong}
            className={`${!songs ? 'text-gray-300' : 'cursor-pointer'}`}
          >
            <MdSkipPrevious size={24} />
          </span>
          <span
            className='p-1 border border-gray-300 hover:text-main-500 hover:border-main-500 cursor-pointer rounded-full'
            onClick={handleTogglePlayMusic}
          >
            {!isLoadedSource ? (
              <LoadingSong />
            ) : isPlaying ? (
              <BsPauseFill size={30} />
            ) : (
              <BsFillPlayFill size={30} />
            )}
          </span>
          <span
            onClick={handleNextSong}
            className={`${!songs ? 'text-gray-300' : 'cursor-pointer'}`}
          >
            <MdSkipNext size={24} />
          </span>
          <span
            className={`cursor-pointer ${repeatMode && 'text-purple-600'}`}
            title='Bật phát lại tất cả'
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
          >
            {repeatMode === 1 ? <TbRepeatOnce size={24} /> : <CiRepeat size={24} />}
          </span>
        </div>
        <div className='w-full flex items-center justify-center gap-3 text-xs text-[#ffff]'>
          <span>{moment.utc(curSeconds * 1000).format('mm:ss')}</span>
          <div
            className='w-3/4 h-[3px] hover:h-[8px] rounded-l-full rounded-r-full cursor-pointer relative bg-[#595460]'
            onClick={handleClickProgressBar}
            ref={trackRef}
          >
            <div
              ref={thumbRef}
              className='absolute top-0 left-0 bottom-0 rounded-l-full rounded-r-full bg-[#ffff]'
            ></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
        </div>
      </div>
      <div className='w-[30%] flex-auto flex items-center justify-end gap-4'>
        <div className='flex gap-2 items-center cursor-pointer'>
          <span
            onClick={() => setVolume((prev) => (prev === 0 ? 70 : 0))}
            className='text-[#ffff]'
          >
            {volume >= 50 ? (
              <FiVolume2 size={20} />
            ) : volume === 0 ? (
              <FiVolumeX size={20} />
            ) : (
              <FiVolume1 size={20} />
            )}
          </span>
          <input
            type='range'
            step={1}
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
        <span
          className='p-1 rounded-sm cursor-pointer bg-[#9B4DE0] opacity-100 hover:opacity-90'
          onClick={() => setIsShowRightSidebar((prev) => !prev)}
        >
          <RiPlayListFill size={18} color='white' />
        </span>
      </div>
    </div>
  )
}

export default Player
