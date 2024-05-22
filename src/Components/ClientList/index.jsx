import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients, getInboundCases } from "../../redux/slices/clientsSlice";


const ClientList = () => {
  const dispatch = useDispatch();
  const { bots, loading, error, dateFilter } = useSelector((state) => state.clients);
  const { from: startDate, until: endDate } = dateFilter;

  // Fetch inicial de los clientes
  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  // Bot seleccionado, por defecto el primero de la lista si existe
  const selectedBotId = bots.length > 0 ? bots[0].id : null;

  // Observar cambios en las fechas y refetchear los casos del bot seleccionado
  useEffect(() => {
    if (selectedBotId) {
      dispatch(getInboundCases({ botId: selectedBotId, startDate, endDate }));
    }
  }, [dispatch, startDate, endDate, selectedBotId]);

  const handleClientList = (botId) => {
    dispatch(getInboundCases({ botId, startDate, endDate }));
  };

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col items-center pt-6">
      <div className="w-full p-5">
        <h2 className="mb-6 text-2xl font-bold text-gray-500">
          Clientes
        </h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ul className="flex flex-col gap-1">
          {bots.map((bot) => (
            <li key={bot.id}>
              <button
                onClick={() => handleClientList(bot.id)}
                className="block font-semibold w-full text-left p-2 bg-blue-100"
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
