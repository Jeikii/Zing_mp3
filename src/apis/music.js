import axios from '../axios'

export const apiGetSong = (songId) =>
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

export const apiGetDetailSong = (songId) =>
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

export const apiGetDetailPlaylist = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: '/detailplaylist',
        method: 'GET',
        params: { id: pid },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })

export const apiSearch = (keyword) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: '/search',
        method: 'GET',
        params: { keyword: keyword },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
