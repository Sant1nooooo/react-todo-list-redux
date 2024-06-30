import { combineReducers } from 'redux'

import todosReducer from './feature/todos/todoSlice'
import filtersReducer from './feature/filters/filtersSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  todos: todosReducer,
  filters: filtersReducer,
})

export default rootReducer
