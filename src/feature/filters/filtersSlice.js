export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

const initialState = {
  status: StatusFilters.All,
  colors: [],
}

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case 'filters/statusFilterChanged': {
      // console.log('status changed');
      // console.log(action.payload)
      return { ...state, status: action.payload}
    }
    case 'filters/colorFilterChanged': {
      let { color, changeType } = action.payload
      const { colors } = state;
      console.log(color, changeType)

      switch (changeType) {
        case 'added': {
          if (colors.includes(color)) return state

          return { ...state, colors: state.colors.concat(color) }
        }
        case 'removed': {
          return { ...state, colors: state.colors.filter( (existingColor) => existingColor !== color),}
        }
        default:
          return state
      }
      return state;
    }
    default:
      return state
  }
}
