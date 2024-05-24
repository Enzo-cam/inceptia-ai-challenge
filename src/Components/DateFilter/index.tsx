import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFromDate, setUntilDate } from "../../redux/slices/clientsSlice";
import { AppDispatch, RootState } from "../../redux/store"; 
/**
 * Componente `Filters` para seleccionar rangos de fechas.
 * Permite a los usuarios elegir fechas de inicio y fin para aplicar filtros de fecha en la visualización de datos.
 * Las fechas seleccionadas se gestionan a través del estado de Redux y se utilizan para filtrar datos en otros componentes.
 */


const Filters = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { from, until } = useSelector((state: RootState) => state.clients.dateFilter);

    return (
        <div className="flex space-x-4 p-2 bg-white shadow rounded-lg justify-center border items-center">
            <p>Desde </p>
            <input
                className="block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="date"
                value={from}
                onChange={(e) => dispatch(setFromDate(e.target.value))}
            />

            <p>Hasta</p>
            <input
                className="block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="date"
                value={until}
                onChange={(e) => dispatch(setUntilDate(e.target.value))}
            />
        </div>
    );
};

export default Filters;
