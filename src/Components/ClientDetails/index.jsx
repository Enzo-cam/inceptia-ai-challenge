import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Filters from "../DateFilter";

const TableClientDetails = ({ data }) => {
  const [dataBot, setDataBot] = useState([]);

  useEffect(() => {
    setDataBot(data);
  }, [data]);

  const onChange = (e) => {
    const value = e.target.value.toLowerCase();
    // Filtrado que incluye propiedades anidadas
    const filteredData = data.filter((item) => {
      // Revisar cada propiedad definida en las columnas
      return columns.some((column) => {
        // Acceder al valor de la propiedad, incluyendo propiedades anidadas
        const fieldValue = column.selector(item);
        // Asegurarse de que fieldValue es un valor válido y luego convertirlo a string y a lowercase
        return (
          fieldValue && fieldValue.toString().toLowerCase().includes(value)
        );
      });
    });
    setDataBot(filteredData);
  };

  const customStyles = {
    table: {
      style: {
        border: "1px solid black",
      },
    },
    headCells: {
      style: {
        backgroundColor: "red",
        color: "white",
        fontWeight: "semibold",
        fontSize: "16px",
        minHeight: "56px",
        paddingLeft: "16px",
        paddingRight: "8px",
        borderBottom: "1px solid black",
        borderRight: "1px solid black",
      },
    },
    cells: {
      style: {
        borderRight: "1px solid black",
        minWidth: "150px", // Ajusta según la necesidad
        minHeight: "auto", // Permite que la altura de la celda se ajuste al contenido
        whiteSpace: "normal", // Permite que el texto ajuste
        overflow: "visible", // Asegúrate de que el contenido no se oculte
        textOverflow: "clip", // Evita elipsis
      },
    },
  };

  // Ajustar las columnas y q se muestre TODA la data

  const columns = React.useMemo(
    () => [
      {
        name: "Gestionado",
        selector: (row) => row.last_updated,
      },
      {
        name: "ID Caso",
        selector: (row) => row.case_uuid,
      },
      {
        name: "Teléfono",
        selector: (row) => row.phone,
      },
      {
        name: "dni",
        selector: (row) => row.extra_metadata.dni,
      },
      {
        name: "group",
        selector: (row) => row.extra_metadata.grupo,
      },
      {
        name: "order",
        selector: (row) => row.extra_metadata.orden,
      },
      {
        name: "Estado",
        selector: (row) => row.case_result.name,
        cell: (row) => (
          <div title={row.case_result.name}>{row.case_result.name}</div>
        ), // Tooltip básico
      },
    ],
    []
  );

  return (
    <div>
      <div className="flex justify-between">
        <input
          type="text"
          className="text-left w-96 p-1 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          placeholder="Buscar por ID, Teléfono, DNI, Grupo, Orden o Estado"
          onChange={onChange}
        />

        <Filters />
      </div>

      <DataTable
        fixedHeaderScrollHeight="full"
        columns={columns}
        data={dataBot}
        fixedHeader
        customStyles={customStyles}
      />
    </div>
  );
};

export default TableClientDetails;
