import { StatusFilters } from '../filters/filtersSlice';
import { availableColors, capitalize } from '../filters/colors';
import { useSelector,useDispatch } from 'react-redux';
import { colorFilterChange } from '../filters/filtersSlice';
import React from 'react';

const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? '' : 's'

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  )
}

const StatusFilter = ({ value: status, dispatch }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key] //Accessing the value using the key through Object.keys()

    function handleClick(value)
    {
      dispatch({type: 'filters/statusFilterChanged', payload: value});
    }
    
    const className = value === status ? 'selected' : '';

    return (
      <li key={value}>
        <button className={className} onClick={()=>{handleClick(value)}}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

const ColorFilters = ({ value: colors, dispatch}) => {

  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color);
    const changeType = checked ? 'removed' : 'added';

    function handleChange()
    {
      dispatch(colorFilterChange(color, changeType));// Action creator;
      // dispatch({type: 'filters/colorFilterChanged', payload: {color: color, changeType:changeType}});
    }

    return (
      <label key={color}>
        <input type="checkbox" name={color} checked={checked} onChange={handleChange}/>
        <span className="color-block" style={{ backgroundColor: color }}></span>
        {capitalize(color)}
      </label>
    )
  })

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">
        {renderedColors}
      </form>
    </div>
  )
}

const Footer = () => {
  const {colors, status} = useSelector(state=>state.filters);
  const dispatch = useDispatch();
  const todosRemaining = useSelector(state => {
    //By default, `useSelector` hook has access to the `state` of the Redux Store.
    const uncompletedTodos = state.todos.filter(todo => !todo.completed);
    return uncompletedTodos.length;
  });

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={()=>{dispatch({type:'todos/allCompleted'})}}> Mark All Completed </button>
        <button className="button" onClick={()=>{dispatch({type:'todos/completedCleared'})}}> Clear Completed </button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <StatusFilter value={status} dispatch={dispatch} />
      <ColorFilters value={colors} dispatch={dispatch} />
    </footer>
  )
}

export default Footer
