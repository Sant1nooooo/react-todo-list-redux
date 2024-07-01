import React from 'react';
import TodoListItem from './TodoListItem';
import { useSelector} from 'react-redux';



export default function TodoList (){
  //This `todos` variable is currently subcribed to 'todos' state in Redux store
  const todos = useSelector(state => state.todos); 
  
  //This `todos` variable is currently subcribed to 'filter' 
  //state(an object) that has `colors` and `status` fields from Redux store
  const {colors, status} = useSelector(state => state.filters)
  // console.log(colors);
  //useSelector hook automatically subscribed to the Redux store without needing to use store.subscribe().
  //Meaning, whenever the value of the state from the Redux store changes, selector function will run again and 
  //will force the component to re-render and make some change to the UI base on the updated value of
  //the state from the Redux store.
  //and the useSelector uses the === strict comparison to compare the previous value to the new value of the state.
  // const todos = [];
  if(colors.length > 0)
  {
    if(status === 'active')
      {
        return (
          <ul className="todo-list">
            {todos.map(todo=>{
              const isIncluded = colors.includes(todo?.color)//yellow
              console.log(isIncluded)
              if(isIncluded)
                {
                  if(!todo.completed) return <TodoListItem key={todo.id} todo={todo} /> 
                }
    
            })}
          </ul>
        );
      }
      else if(status === 'completed'){
        return (
          <ul className="todo-list">
            {todos.map(todo=>{
              const isIncluded = colors.includes(todo?.color)//yellow
              if(isIncluded)
              {
                 if(todo.completed) return <TodoListItem key={todo.id} todo={todo}/> 
              }
    
            })}
          </ul>
        );
      }
      console.log('DISPLAYING ALL TODO THAT HAS COLOR'); 
      return(
        <ul className="todo-list">
          {todos.map((todo) => {
            const isIncluded = colors.includes(todo?.color)//yellow
            if(isIncluded) return <TodoListItem key={todo.id} todo={todo} />
          })}
        </ul>
      )
  }


  if(status === 'active')
    {
      console.log('NO COLOR: Displaying all active todo');
      return (
        <ul className="todo-list">
          {todos.map(todo=>{
  
            if(!todo.completed) return <TodoListItem key={todo.id} todo={todo} /> 
  
          })}
        </ul>
      );
    }
    else if(status === 'completed'){
      console.log('NO COLOR: Displaying all completed todo');
      return (
        <ul className="todo-list">
          {todos.map(todo=>{
  
            if(todo.completed) return <TodoListItem key={todo.id} todo={todo} /> 
  
          })}
        </ul>
      );
    }
    return(
      <ul className="todo-list">
        {todos.map((todo) => {
          return <TodoListItem key={todo.id} todo={todo} />
        })}
      </ul>
    )
}
