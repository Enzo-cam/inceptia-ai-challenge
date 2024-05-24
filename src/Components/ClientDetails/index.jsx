import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Filters from "../DateFilter";
import StateFilters from "../StatusFilter";
import ExportCSVButton from "../ExportCSV";
import { useSelector } from "react-redux";

const TableClientDetails = () => {
  const { inboundCases, activeFilter } = useSelector((state) => state.clients);
  const [dataBot, setDataBot] = useState([]);

  useEffect(() => {
    if (activeFilter === "Todos") {
      setDataBot(inboundCases.results || []);
    } else {
      const filteredData = (inboundCases.results || []).filter(
        (item) => item.case_result.name === activeFilter
      );
      setDataBot(filteredData);
    }
  }, [inboundCases.results, activeFilter]);

  const onChange = (e) => {
    const value = e.target.value.toLowerCase();
    if (!value) {
      // Si el input está vacío, restablece los datos.
      if (activeFilter === "Todos") {
        setDataBot(inboundCases.results || []);
      } else {
        const filteredData = (inboundCases.results || []).filter(
          (item) => item.case_result.name === activeFilter
        );
        setDataBot(filteredData);
      }
    } else {
      // Aplica el filtro basado en el valor ingresado.
      const filteredData = dataBot.filter((item) => {
        return columns.some((column) => {
          const fieldValue = column.selector(item);
          return (
            fieldValue && fieldValue.toString().toLowerCase().includes(value)
          );
        });
      });
      setDataBot(filteredData);
    }
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

  const columns = React.useMemo(
    () => [
      {
        name: "Gestionado",
        maxWidth: "200px",
        selector: (row) => row.last_updated,
      },
      {
        name: "ID Caso",
        maxWidth: "90px",
        selector: (row) => row.case_uuid,
      },
      {
        name: "Teléfono",
        maxWidth: "200px",
        selector: (row) => row.phone,
      },
      {
        name: "dni",
        maxWidth: "90px",
        selector: (row) => row.extra_metadata.dni,
      },
      {
        name: "group",
        maxWidth: "90px",
        selector: (row) => row.extra_metadata.grupo,
      },
      {
        name: "order",
        maxWidth: "90px",
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
      {!inboundCases.results ? (
        <div className="p-10 mx-52 text-center border-2 border-black mt-20">
          <p className="text-xl">
            Seleccione un bot para mostrar los detalles de los casos.
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <input
              type="text"
              className="text-left w-96 p-1 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Buscar por ID, Teléfono, DNI, Grupo, Orden o Estado"
              onChange={onChange} // Implementar si es necesario
            />
            <Filters />
          </div>
          <div className="flex justify-between items-center">
            <StateFilters
              states={[
                "Mail Enviado",
                "Transferido",
                "Indefinido",
                "Cortó cliente",
                "Cliente no encontrado en DB",
              ]}
            />
            {/* <ExportCSVButton /> */}
          </div>
          <DataTable
            fixedHeaderScrollHeight="full"
            columns={columns}
            noDataComponent="No hay data disponible con los filtros que utilizó"
            data={dataBot}
            fixedHeader
            persistTableHead={true}
            customStyles={customStyles}
          />
        </>
      )}
    </div>
  );
};

export default TableClientDetails;
