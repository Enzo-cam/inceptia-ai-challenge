import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients, getInboundCases } from "../../redux/slices/clientsSlice";

const ClientList = () => {
  const dispatch = useDispatch();
  const { bots, loading, error } = useSelector((state) => state.clients);
  const results = useSelector(state => state.clients.inboundCases.results);

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  // console.log(results)

  const handleClientList = (botId) => {
    dispatch(
      getInboundCases({ botId, startDate: "2021-03-01", endDate: "2022-03-25" })
    );
  };


//   Aplicar la tabla, mostrar los distintos datos fetcheados desde aca
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
