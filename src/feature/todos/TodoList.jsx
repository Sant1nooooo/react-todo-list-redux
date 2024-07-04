import React from 'react';
import TodoListItem from './TodoListItem';
import { useSelector} from 'react-redux';
import { selectTodoIds } from './todoSlice'


export default function TodoList (){
  // const todoIDList = useSelector(selectTodoIds); //This creates an array of IDs to each todo in the todo-list;
  const todos = useSelector(state => state.todos);
  const {colors, status} = useSelector(state => state.filters)
  
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
      // console.log('DISPLAYING ALL TODO THAT HAS COLOR'); 
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
    // console.log('NO COLOR: Displaying all active todo');
    return (
      <ul className="todo-list">
        {todos.map(todo=>{

          if(!todo.completed) return <TodoListItem key={todo.id} todo={todo} /> 
          //<TodoListItem key={todo.id} todoID={eachID} /> for createSelector ONLY. 
        })}
      </ul>
    );
  }
  else if(status === 'completed'){
    // console.log('NO COLOR: Displaying all completed todo');
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
