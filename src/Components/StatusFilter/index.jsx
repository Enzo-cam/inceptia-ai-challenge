import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveFilter } from '../../redux/slices/clientsSlice';

const StateFilters = ({ states }) => {
  const dispatch = useDispatch();
  const activeFilter = useSelector(state => state.clients.activeFilter);

  const handleFilterClick = (filter) => {
    dispatch(setActiveFilter(filter));
  };

  const handleResetFilter = () => {
    dispatch(setActiveFilter('Todos'));
  };

  return (
    <div className="flex gap-2 mb-4 mt-4">
      <button className={`p-2 text-white rounded-md ${activeFilter === 'Todos' ? 'bg-red-600' : 'bg-blue-500'}`} onClick={handleResetFilter}>
        Todos
      </button>
      {states.map(state => (
        <button
          key={state}
          className={`p-2 rounded-md ${activeFilter === state ? 'bg-red-600' : 'bg-blue-500'} text-white`}
          onClick={() => handleFilterClick(state)}
        >
          {state}
        </button>
      ))}
    </div>
  );
};

export default StateFilters;
