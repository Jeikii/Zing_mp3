import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SongItems } from './'

const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.app)
  const [isActived, setIsActived] = useState(0)
  const [songs, setSongs] = useState([])

  useEffect(() => {
    if (isActived === 0) setSongs(newRelease?.items?.all)
    else if (isActived === 1) setSongs(newRelease?.items?.vPop)
    else if (isActived === 2) setSongs(newRelease?.items?.others)
  }, [isActived, newRelease])
  return (
    <div className='mt-12 px-[59px] flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <h3 className='text-[20px] font-bold'>{newRelease?.title}</h3>
        <span className='text-xs'>TẤT CẢ</span>
      </div>
      <div className='flex items-center gap-5 text-xs'>
        <button
          type='button'
          onClick={() => setIsActived(0)}
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent ${
            isActived === 0 && 'bg-[#0f7f7f] text-white'
          }`}
        >
          TẤT CẢ
        </button>
        <button
          type='button'
          onClick={() => setIsActived(1)}
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent ${
            isActived === 1 && 'bg-[#0f7f7f] text-white'
          }`}
        >
          VIỆT NAM
        </button>
        <button
          type='button'
          onClick={() => setIsActived(2)}
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent ${
            isActived === 2 && 'bg-[#0f7f7f] text-white'
          }`}
        >
          QUỐC TẾ
        </button>
      </div>
      <div className='flex flex-wrap w-full'>
        {songs
          ?.filter((item, index) => index <= 11)
          ?.map((item) => (
            <div key={item.encodeId} className='w-[45%] min-[1024px]:w-[30%]'>
              <SongItems
                thumbnail={item.thumbnail}
                title={item.title}
                artists={item.artistsNames}
                releaseDate={item.releaseDate}
                songId={item.encodeId}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default NewRelease
