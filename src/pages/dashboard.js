import React, { useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Timeline from '../components/timeline';
import Header from '../components/header';

const Dashboard = () => {

    useEffect(() => {
        document.title = 'Inicio - Instagram';
    }, [])

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )
}

export default Dashboard;
