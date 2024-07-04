import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveNewTodo } from '../todos/todoSlice';

export default function Header (){
  const [text, setText] = useState('');
  const dispatch = useDispatch();


  function customizedThunk(dispatch, getState){
    console.log('THIS IS CUSTOMIZED THUNK!');
    return;
  }

  function handleKeyDown(e)
  {
    const trimmedText = text.trim()
    if (e.key === 'Enter' && trimmedText) {
      //simpleng call-function lang, pero nag re-return ng thunk-function na idi-dispatch
      const thunkFunction = saveNewTodo(trimmedText);
      // dispatch({ type: 'todos/todoAdded', payload: trimmedText });
      // dispatch(customizedThunk);
      dispatch(thunkFunction);
      setText('')
    }
  }


  return (
    <header className="header">
      <input className="new-todo" value={text} onChange={(e)=>{setText(e.target.value)}} onKeyDown={handleKeyDown} placeholder="What needs to be done?"/>
    </header>
  );
}
