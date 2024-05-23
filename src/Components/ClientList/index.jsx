import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients, getInboundCases } from "../../redux/slices/clientsSlice";

const ClientList = () => {
  const dispatch = useDispatch();
  const { bots, loading, error, dateFilter } = useSelector((state) => state.clients);
  const { from: startDate, until: endDate } = dateFilter;

  // Estado para el bot seleccionado
  const [selectedBotId, setSelectedBotId] = useState(null);

  // Fetch inicial de los clientes
  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  // Observar cambios en las fechas y el bot seleccionado, y refetchear los casos
  useEffect(() => {
    if (selectedBotId) {
      dispatch(getInboundCases({ botId: selectedBotId, startDate, endDate }));
    }
  }, [dispatch, startDate, endDate, selectedBotId]);

  // Manejador para actualizar el bot seleccionado y fetchear sus casos
  const handleClientList = (botId) => {
    setSelectedBotId(botId);
    dispatch(getInboundCases({ botId, startDate, endDate }));
  };

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col items-center pt-1 border-r-2 border-black">
      <div className="w-full p-5">
        <h2 className="mb-9 text-2xl font-bold ">Clientes</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ul className="flex flex-col gap-1">
          {bots.map((bot) => (
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
