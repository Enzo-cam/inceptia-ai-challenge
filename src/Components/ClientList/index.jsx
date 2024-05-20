import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '../../redux/slices/clientsSlice';

const ClientList = () => {
    const dispatch = useDispatch();
    const { bots, loading, error } = useSelector((state) => state.clients);

    useEffect(() => {
        dispatch(getClients());
    }, [dispatch]);
    console.log(bots)

    // const handleClientList = (id) => {
    //     dispatch(getClientDetail(id));
    //   };

    return (
        <div className="w-1/5 min-h-screen bg-gray-50 flex flex-col items-center pt-6">
            <div className="w-full p-5">
                <h2 className="mb-12 text-center text-5xl font-extrabold">Clients/Bots</h2>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <ul className="flex flex-col gap-1">
                    {bots.map(bot => (
                        <li key={bot.id}>
                            <a href="#" className="block p-3 hover:bg-blue-100">
                                {bot.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ClientList;
