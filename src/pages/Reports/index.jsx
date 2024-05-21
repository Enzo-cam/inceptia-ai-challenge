import React, { useEffect, useState } from 'react';
import ClientList from '../../Components/ClientList';
import TableClientDetails from '../../Components/ClientDetails';
import { useSelector } from 'react-redux';

export default function Reports() {
    const [cases, setCases] = useState([]);  // Estado para guardar los casos
    const { inboundCases } = useSelector(state => state.clients);  // Extraer inboundCases del estado de Redux

    useEffect(() => {
        // Asegurarse de que inboundCases.results exista y tenga elementos antes de intentar usarlo
        if (inboundCases && inboundCases.results) {
            setCases(inboundCases.results);
        }
        console.log(cases)
    }, [inboundCases]);  // Agregar inboundCases como dependencia para reaccionar a sus cambios

    return (
        <div className="flex min-h-screen">
            <div className="w-60">
                <ClientList />
            </div>
            <div className="w-full flex flex-col p-4">
                {/* Mostrar la tabla solo si hay casos */}
                {cases.length > 0 && <TableClientDetails data={cases} />}
                {/* {cases.length > 0 && <p>Hola</p>} */}
            </div>
        </div>
    );
}
