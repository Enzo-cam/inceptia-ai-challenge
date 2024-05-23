import React from 'react';
import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';

const ExportCSVButton = () => {
  const dataBot = useSelector(state => state.clients.inboundCases.results || []);

  // Preparar los datos para la exportación, asegurándote de que están en el formato correcto
  const headers = [
    { label: 'Gestionado', key: 'last_updated' },
    { label: 'ID Caso', key: 'case_uuid' },
    { label: 'Teléfono', key: 'phone' },
    { label: 'DNI', key: 'extra_metadata.dni' },
    { label: 'Grupo', key: 'extra_metadata.grupo' },
    { label: 'Orden', key: 'extra_metadata.orden' },
    { label: 'Estado', key: 'case_result.name' }
  ];

  // Convertir objetos de datos anidados para CSV
  const csvData = dataBot.map(item => ({
    ...item,
    'DNI': item.extra_metadata.dni,
    'Grupo': item.extra_metadata.grupo,
    'Orden': item.extra_metadata.orden,
    'Estado': item.case_result.name
  }));

  return (
    <CSVLink
      data={csvData}
      headers={headers}
      filename={"inboundCases.csv"}
      className="bg-green-600 p-2 text-white rounded"
    >
      Exportar data a CSV
    </CSVLink>
  );
};

export default ExportCSVButton;
