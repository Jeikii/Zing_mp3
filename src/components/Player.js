import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as apis from '../apis'
import icons from '../ultis/icons'

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
} = icons

const Player = () => {
  const audioEle = new Audio()
  const { curSongId, playingMusic } = useSelector((state) => state.music)
  const [songInfo, setSongInfo] = useState(null)
  const [source, setSource] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  console.log(audioEle)

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ])
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data)
      }
      if (res2.data.err === 0) {
        setSource(res2.data.data['128'])
      }
    }

    fetchDetailSong()
  }, [curSongId])

  useEffect(() => {
    // audioEle.play()
  }, [curSongId])

  const handleTogglePlayMusic = () => {
    setIsPlaying((prev) => !prev)
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
          <span className='font-semibold text-gray-700 text-sm'>{songInfo?.title}</span>
          <span className='text-xs text-gray-500'>{songInfo?.artistsNames}</span>
        </div>
        <div className='flex gap-4 pl-2'>
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className='w-[40%] flex-auto border flex items-center justify-center flex-col gap-2 border-red-600 py-2'>
        <div className='flex gap-8 justify-center items-center'>
          <span className='cursor-pointer' title='Bật phát ngẫu nhiên'>
            <CiShuffle size={24} />
          </span>
          <span className='cursor-pointer'>
            <MdSkipPrevious size={24} />
          </span>
          <span
            className='p-1 border border-gray-700 hover:text-main-500 cursor-pointer rounded-full'
            onClick={handleTogglePlayMusic}
          >
            {isPlaying ? <BsPauseFill size={30} /> : <BsFillPlayFill size={30} />}
          </span>
          <span className='cursor-pointer'>
            <MdSkipNext size={24} />
          </span>
          <span className='cursor-pointer' title='Bật phát lại tất cả'>
            <CiRepeat size={24} />
          </span>
        </div>
        <div className=''>Progress bar</div>
      </div>
      <div className='w-[30%] flex-auto border border-red-600'>Volume</div>
    </div>
  )
}

export default Player
