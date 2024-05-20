import React from 'react';
import ClientList from '../../Components/ClientList';
// import BotDetailsTable from '../../Components/BotDetailsTable'; // Asumiendo que tienes otro componente para los detalles

export default function Reports() {
    return (
        <div className="flex min-h-screen">
            <div className="w-1/5">
                <ClientList />
            </div>
            <div className="w-4/5 flex flex-col p-4">
                <p>
                    Hola probando
                </p>
                {/* <BotDetailsTable /> */}
            </div>
        </div>
    );
}