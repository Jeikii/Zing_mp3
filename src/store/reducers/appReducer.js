import actionTypes from '../actions/actionTypes'

const initState = {
  banner: [],
  today: {},
  top100: {},
  lastWeek: {},
  isLoading: false,
  newRelease: {},
  weekChart: [],
  favoriteArtists: {},
  chart: {},
  rank: [],
}

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionId === 'hSlider')?.items || null,
        today: action.homeData?.find((item) => item.sectionId === 'hEditorTheme') || {},
        top100: action.homeData?.find((item) => item.sectionId === 'h100') || {},
        lastWeek:
          action.homeData?.find((item) => item.sectionId === 'hEditorTheme2') || {},
        newRelease:
          action.homeData?.find((item) => item.sectionType === 'new-release') || {},
        weekChart:
          action.homeData?.find((item) => item.sectionType === 'weekChart')?.items || [],
        favoriteArtists:
          action.homeData?.find((item) => item.sectionId === 'hArtistTheme') || {},
        chart: action.homeData?.find((item) => item.sectionId === 'hZC')?.chart || {},
        rank: action.homeData?.find((item) => item.sectionId === 'hZC')?.items || [],
      }
    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      }

    default:
      return state
  }
}

export default appReducer
