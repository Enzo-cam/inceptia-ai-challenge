import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveFilter } from '../../redux/slices/clientsSlice';
import { AppDispatch, RootState } from '../../redux/store';  // Asegúrate de importar correctamente RootState si lo utilizas para tipar el useSelector

interface StateFiltersProps {
  states: string[];  // Define que `states` es un array de strings
}

const StateFilters: React.FC<StateFiltersProps> = ({ states }) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeFilter = useSelector((state: RootState) => state.clients.activeFilter); // Tipa el useSelector con el estado global

  const handleFilterClick = (filter: string) => { // Especifica que filter es un string
    dispatch(setActiveFilter(filter));
  };

  const handleResetFilter = () => {
    dispatch(setActiveFilter('Todos'));
  };

  return (
    <div className="flex gap-2 mb-4 mt-4">
      <button
        className={`p-2 text-white rounded-md ${activeFilter === 'Todos' ? 'bg-red-600' : 'bg-blue-500'}`}
        onClick={handleResetFilter}
      >
        Todos
      </button>
      {states.map((state: string) => ( 
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
