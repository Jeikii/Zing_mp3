import actionTypes from '../actions/actionTypes'

const initState = {
  curSongId: null,
  playingMusic: false,
}

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CUR_SONG_ID:
      return {
        ...state,
        curSongId: action.songId || null,
      }
    case actionTypes.PLAY:
      return {
        ...state,
        playingMusic: action.flag,
      }

    default:
      return state
  }
}

export default musicReducer
