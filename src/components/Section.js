import React, { memo, useState } from 'react'
import { SectionItems } from './'

const Section = ({ data }) => {
  return (
    <div className='mt-12 px-[59px] flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <h3 className='text-[20px] font-bold text-[#ffff]'>{data?.title}</h3>
        <span className='text-xs'>TẤT CẢ</span>
      </div>
      <div className='flex items-start justify-between gap-7'>
        {data &&
          data?.items?.length > 0 &&
          data.items
            .filter((item, index) => index <= 4)
            ?.map((item) => (
              <SectionItems
                key={item.encodeId}
                data={data}
                title={item.title}
                link={item.link}
                artistsNames={item.artistsNames}
                sortDescription={item.sortDescription}
                thumbnailM={item.thumbnailM}
              />
            ))}
      </div>
    </div>
  )
}

export default memo(Section)
