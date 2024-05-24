import React, { useEffect, useState } from 'react';
import ClientList from '../../Components/ClientList';
import TableClientDetails from '../../Components/ClientDetails';

/**
 * Componente `Reports` que sirve como la página de reportes para la aplicación.
 * Esta página organiza visualmente la lista de clientes y los detalles de los clientes en un diseño de dos columnas.
 * Incluye el componente `ClientList` para la selección de clientes y el componente `TableClientDetails`
 * para mostrar detalles de los casos del cliente seleccionado.
 */


export default function Reports() {
    return (
        <div className="flex min-h-screen">
            <div className="w-60">
                <ClientList />
            </div>
            <div className="w-full flex flex-col p-4">
                <TableClientDetails />
            </div>
        </div>
    );
}
