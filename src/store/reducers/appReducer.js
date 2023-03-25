import actionTypes from '../actions/actionTypes'

const initState = {
  banner: [],
  today: {},
  top100: {},
  lastWeek: {},
  isLoading: false,
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
