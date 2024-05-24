import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveFilter } from '../../redux/slices/clientsSlice';
import { AppDispatch, RootState } from '../../redux/store';  

interface StateFiltersProps {
  states: string[]; 
}

const StateFilters: React.FC<StateFiltersProps> = ({ states }) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeFilter = useSelector((state: RootState) => state.clients.activeFilter); 

  /**
 * Maneja el clic en un filtro específico.
 * Actualiza el filtro activo en el estado global de Redux con el estado seleccionado.
 *
 * @param {string} filter - El filtro seleccionado por el usuario.
 */
const handleFilterClick = (filter: string) => {
  dispatch(setActiveFilter(filter));
};

/**
 * Restablece el filtro activo al estado predeterminado ('Todos').
 */
const handleResetFilter = () => {
  dispatch(setActiveFilter('Todos'));
};

  return (
    /**
     * Renderiza botones para cada estado posible y un botón para resetear el filtro.
     * Los botones de estado cambian de color dependiendo del filtro activo.
    */
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
