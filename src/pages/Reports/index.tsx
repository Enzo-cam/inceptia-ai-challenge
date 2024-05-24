import React, { useEffect, useState } from 'react';
import ClientList from '../../Components/ClientList';
import TableClientDetails from '../../Components/ClientDetails';


export default function Reports() {
    return (
        <div className="flex min-h-screen">
            <div className="w-60">
                <ClientList />
            </div>
            <div className="w-full flex flex-col p-4">
                <TableClientDetails />
            </div>
        </div>
    );
}
