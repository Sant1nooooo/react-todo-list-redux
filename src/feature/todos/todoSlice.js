const initialState = []

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      // console.log('Value of the state(Todos array) changed');
      // console.log('Triggering all the selector and subscriber callback function to re-render and update the UI of thecurrent page');
      return [ ...state, { id: nextTodoId(state), text: action.payload, completed: false}]
    }

    case 'todos/todoToggled': {
      return state.map((todo) => {
        if (todo.id !== action.payload) return todo

        return { ...todo, completed: !todo.completed}
      })
    }
    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      return state.map((todo) => {
        if (todo.id !== todoId) return todo

        return { ...todo, color}
      })
    }
    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== action.payload)
    }
    case 'todos/allCompleted': {
      console.log('asdasdads')
      return state.map((todo) => {
        return { ...todo, completed: true }
      })
    }
    case 'todos/completedCleared': {
      return state.filter((todo) => !todo.completed)
    }
    default:
      return state
  }
}


