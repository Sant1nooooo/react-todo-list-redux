import React from 'react';
import { useDispatch } from 'react-redux';
import { availableColors, capitalize } from '../filters/colors';
import { memo } from 'react';

function TodoListItem ({todo}){
  const { text, completed, color } = todo;
  const dispatch = useDispatch();

  function handleCompletedChanged(e){
    dispatch({ type: 'todos/todoToggled', payload: todo.id })
  }

  function handleColorChanged(e){
    dispatch({type: 'todos/colorSelected', payload: {color: e.target.value, todoId: todo.id}});
  }

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))
  console.log(todo.id);
  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input className="toggle" type="checkbox" checked={completed} onChange={handleCompletedChanged}/>
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select className="colorPicker" value={color} style={{ color }} onChange={handleColorChanged}>
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={()=>{dispatch({type:'todos/todoDeleted', payload: todo.id})}}> DEL </button>
        </div>
      </div>
    </li>
  )
}

export default memo(TodoListItem)
//To prevent the other TodoListItem from re-rendering.
//OPTIONS: shallowEqual, memo, pass only the ID from the parent component, and retrieve the actualy todo objecty inside the child component.
// export default TodoListItem
