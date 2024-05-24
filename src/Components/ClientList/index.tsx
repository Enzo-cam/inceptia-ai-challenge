import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients, getInboundCases } from "../../redux/slices/clientsSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { Bot } from "../../Interfaces/Clients/ClientInterfaces";
/**
 * Componente `ClientList` que muestra una lista de clientes y permite la selección de un cliente para cargar casos asociados.
 * Al seleccionar un cliente, se desencadena la carga de casos entrantes para ese cliente específico durante un rango de fechas especificado.
 * Utiliza Redux para gestionar el estado de la carga de clientes y casos, así como para manejar errores.
 */

const ClientList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bots, loadingBots, errorBots, dateFilter } = useSelector((state: RootState) => state.clients);
  const { from: startDate, until: endDate } = dateFilter;

  const [selectedBotId, setSelectedBotId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  useEffect(() => {
    if (selectedBotId) {
      dispatch(getInboundCases({ botId: selectedBotId, startDate, endDate }));
    }
  }, [dispatch, startDate, endDate, selectedBotId]);

  /**
 * Maneja la selección de un cliente (bot) de la lista.
 * Establece el ID del bot seleccionado y dispara la carga de casos entrantes para ese bot.
 *
 * @param {number} botId - El ID del bot que fue seleccionado.
 */
const handleClientList = (botId: number) => {
  setSelectedBotId(botId);
  dispatch(getInboundCases({ botId, startDate, endDate }));
};

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col items-center pt-1 border-r-2 border-black">
      <div className="w-full p-5">
        <h2 className="mb-9 text-2xl font-bold">Clientes</h2>
        {loadingBots && <p>Loading...</p>}
        {errorBots && <p>{errorBots}</p>}
        <ul className="flex flex-col gap-1">
          {bots.map((bot: Bot) => (
            <li key={bot.id}>
              <button
                onClick={() => handleClientList(bot.id)}
                className={`block font-semibold w-full rounded text-center p-2 ${selectedBotId === bot.id ? 'bg-blue-300' : 'bg-blue-100'}`}
              >
                {bot.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientList;
