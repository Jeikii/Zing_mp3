import React, { memo, useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import bgChart from '../assets/bg-chart.jpg'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import SongItems from './SongItems'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import path from '../ultis/path'
import icons from '../ultis/icons'

const { BsFillPlayFill } = icons

const ChartSection = () => {
  const [data, setData] = useState(null)
  const { chart, rank } = useSelector((state) => state.app)
  // console.log({ chart, rank })

  const chartRef = useRef()
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    left: 0,
    top: 0,
  })
  const [selected, setSelected] = useState(null)

  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: 'rgba(255,255,255,0.1)', drawTicks: false },
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: 'white' },
        grid: { color: 'transparent' },
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: ({ tooltip }) => {
          if (!chartRef || !chartRef.current) return
          if (tooltip.opacity === 0) {
            if (tooltipState.opacity !== 0)
              setTooltipState((prev) => ({ ...prev, opacity: 0 }))
            return
          }
          const counters = []
          for (let i = 0; i < 3; i++) {
            counters.push({
              data: chart?.items[Object.keys(chart?.items)[i]]
                ?.filter((item) => item.hour % 2 === 0)
                ?.map((item) => item.counter),
              encodeId: Object.keys(chart?.items)[i],
            })
          }
          // console.log(counters)
          const result = counters.find((i) =>
            i.data.some(
              (number) => number === +tooltip.body[0]?.lines[0]?.replace(',', '')
            )
          )
          setSelected(result.encodeId)
          const newTooltipData = {
            opacity: 1,
            left: tooltip.caretX,
            top: tooltip.caretY,
          }
          if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData)
        },
      },
    },
    hover: {
      mode: 'dataset',
      intersect: false,
    },
  }

  useEffect(() => {
    const labels = chart?.times
      ?.filter((item) => item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`)
    const datasets = []
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
            ?.filter((item) => item.hour % 2 === 0)
            ?.map((item) => item.counter),
          borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
          tension: 0.2,
          borderWidth: 2,
          pointBackgroundColor: 'white',
          pointHoverRadius: 4,
          pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
          pointHoverBorderWidth: 3,
        })
      }
      // console.log({ labels, datasets })
      setData({ labels, datasets })
    }
  }, [chart])

  return (
    <div className='px-[59px] mt-12 relative max-h-[460px] rounded-md'>
      <img
        src={bgChart}
        alt='bg-chart'
        className='w-full object-cover rounded-md max-h-[460px]'
      />
      <div className='absolute z-10 top-0 right-[59px] bottom-0 left-[59px] bg-[rgba(77,34,104,0.9)] rounded-md'></div>
      <div className='absolute z-20 top-0 right-[59px] bottom-0 left-[59px] p-5 flex flex-col gap-8 rounded-md'>
        <Link to={path.ZING_CHART} className='flex gap-2 items-center'>
          <h3 className='text-2xl text-white font-bold hover:text-[#9B4DE0]'>
            #zingchart
          </h3>
          <span className='p-1 rounded-full bg-white hover:bg-gray-200'>
            <BsFillPlayFill size={18} color='#9B4DE0' />
          </span>
        </Link>
        <div className='flex gap-4 h-full'>
          <div className='flex-3 flex flex-col gap-4'>
            {rank
              ?.filter((i, index) => index < 3)
              ?.map((item, index) => (
                <SongItems
                  key={item.encodeId}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  artists={item.artistsNames}
                  songId={item.encodeId}
                  order={index + 1}
                  percent={Math.round((item.score * 100) / chart?.totalScore)}
                  style='text-[#ffff] bg-[hsla(0,0%,100%,0.07)] hover:bg-[#a874b8]'
                />
              ))}
            <Link
              to={path.ZING_CHART}
              className='text-[#ffff] px-4 py-2 rounded-l-full rounded-r-full border border-white w-fit m-auto'
            >
              Xem thêm
            </Link>
          </div>
          <div className='flex-7 h-[90%] relative'>
            {data && <Line data={data} ref={chartRef} options={options} />}
            <div
              className='tooltip'
              style={{
                top: tooltipState.top,
                left: tooltipState.left,
                opacity: tooltipState.opacity,
                position: 'absolute',
              }}
            >
              <SongItems
                thumbnail={rank?.find((item) => item.encodeId === selected)?.thumbnail}
                title={rank?.find((item) => item.encodeId === selected)?.title}
                artists={rank?.find((item) => item.encodeId === selected)?.artistsNames}
                songId={rank?.find((item) => item.encodeId === selected)?.encodeId}
                style='bg-gray-800'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ChartSection)
