import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Header (){
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  function handleKeyDown(e){
    const trimmedText = e.target.value.trim();
    if (e.key === 'Enter' && trimmedText) {
      dispatch({ type: 'todos/todoAdded', payload: trimmedText })
      setText('')
    }
  }
  return (
    <header className="header">
      <input className="new-todo" value={text} onChange={(e)=>{setText(e.target.value)}} onKeyDown={handleKeyDown}placeholder="What needs to be done?"/>
    </header>
  );
}
