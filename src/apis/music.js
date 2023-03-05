import axios from '../axios'

export const getSong = (songId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: '/song',
        method: 'GET',
        params: { id: songId },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })

export const getDetailSong = (songId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: '/infosong',
        method: 'GET',
        params: { id: songId },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
