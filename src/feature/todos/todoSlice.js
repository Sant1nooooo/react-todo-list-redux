import {client} from '../../api/client';
import { createSelector } from 'reselect';
import { StatusFilters } from '../filters/filtersSlice'


const initialState = []

/*
FOR LOADING:
const initialState = [
  status: 'idle',
  todos: []
];
*/

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      return [ ...state, { id: nextTodoId(state), text: action.payload, completed: false}]
      return {...state, todos: [...state.todos, {id: nextTodoId(state), text: action.payload, isCompleted: false}]};
    }
    case 'todos/todoToggled': {
      return state.map((todo) => {
        if (todo.id !== action.payload) return todo

        return { ...todo, completed: !todo.completed}
      })
      //FOR LOADING
      return {
        ...state, 
        todos: state.todos.map(eachTodo =>{
          if(eachTodo.id === action.payload){
            return {...eachTodo, isCompleted: !eachTodo.isCompleted}
          }
          return eachTodo
        })
      };
    }
    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      return state.map((todo) => {
        if (todo.id !== todoId) return todo

        return { ...todo, color}
      })
      /*
        return {...state, todo: state.todo.map(eachTodo=>{
            if(eachTodo.id === todoId)return {...eachTodo, color}
            return eachTodo;
          })}
      */
    }
    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== action.payload)
      return {...state, todo: state.todo.filter(eachTodo => eachTodo.id !== action.payload)}
    }
    case 'todos/allCompleted': {
      return state.map((todo) => {
        return { ...todo, completed: true }
      })
      return {...state, todo: state.todo.map(eachTodo => {return {...eachTodo, isCompleted: !eachTodo.isCompleted}})}
    }
    case 'todos/completedCleared': {
      return state.filter((todo) => !todo.completed)
      return {...state, todo: state.todo.filter(eachTodo => !eachTodo.isCompleted)}
    }
    case 'todos/todosLoaded':{
      console.log('Executing todosLoaded case');
      return action.payload;
    }
    case 'todos/todosLoading': {
      return { ...state, status: 'loading'};
    }
    /*
      case 'todos/todosLoaded': {
      return {...state,
        status: 'idle', 
        entities: action.payload};
      }
    */
    default:
      return state
  } 
}

export function todosLoaded(todos){
  return { type: 'todos/todosLoaded', payload: todos}
}

export function todoAdded(text)
{
  return {type: 'todos/todoAdded', payload: text};
}

export function todosLoading(){
  return { type: 'todos/todosLoading' };
}

export  function fetchTodos() 
{
  return async function(dispatch, getState){
    dispatch(todosLoaded(response.todos));
    const response = await client.get('/fakeApi/todos') //Retrieving the list of todo in a fake API route.
    dispatch(todosLoaded(response.todos));
  }
}

export function saveNewTodo(text) {
  // And then creates and returns the async thunk function:
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text };
    const response = await client.post('/fakeApi/todos', { todo: initialTodo }); //Putting to server
    // console.log('Calling the todoAdded function');
    dispatch(todoAdded(text));
  }
}




//FOR `createSelector` ONLY:
function selectTodos(state) {
  return state.todos;
}
function selectFilterStatus(state)
{
  return state.filters.status;
}

export const selectTodoIds = createSelector(
  [selectTodos], 
  (todos) => todos.map(todo => todo.id)
)

export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilterStatus], //Returning the todos array, value of status field in `filters` state.
  (todos, status) => {
    if (status === StatusFilters.All) return todos

    // Returning the all the completed todo if the value of the `completedStatus` variable is true.
    // Or else, the `completedStatus` will be false and the returned array are all active todo.
    const completedStatus = status === StatusFilters.Completed; //Completed - true, active - false
    return todos.filter(todo => todo.completed === completedStatus)
  }
)