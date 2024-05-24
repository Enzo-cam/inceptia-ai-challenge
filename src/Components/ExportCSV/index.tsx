import React from 'react';
import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import { RootState } from '../../redux/store';
import { InboundCasesResponse } from '../../Interfaces/Clients/ClientInterfaces';

/**
 * Componente `ExportCSVButton` para exportar datos de casos entrantes a un archivo CSV.
 * Extrae los datos de casos entrantes del estado de Redux, los transforma en el formato necesario,
 * y proporciona un enlace para descargar estos datos como un archivo CSV.
 */


const ExportCSVButton = () => {
  const inboundCases = useSelector((state: RootState) => state.clients.inboundCases as unknown as InboundCasesResponse);

  const csvData = inboundCases.results.map(item => ({
    last_updated: item.last_updated,
    case_uuid: item.case_uuid,
    phone: item.phone.toString(),
    DNI: item.extra_metadata.dni,
    Grupo: item.extra_metadata.grupo,
    Orden: item.extra_metadata.orden,
    Estado: item.case_result.name
  }));

  const headers = [
    { label: 'Gestionado', key: 'last_updated' },
    { label: 'ID Caso', key: 'case_uuid' },
    { label: 'Teléfono', key: 'phone' },
    { label: 'DNI', key: 'DNI' },
    { label: 'Grupo', key: 'Grupo' },
    { label: 'Orden', key: 'Orden' },
    { label: 'Estado', key: 'Estado' }
  ];

  return (
    <CSVLink
      data={csvData}
      headers={headers}
      filename="inboundCases.csv"
      className="bg-green-600 p-2 text-white rounded"
    >
      Exportar data a CSV
    </CSVLink>
  );
};

export default ExportCSVButton;
