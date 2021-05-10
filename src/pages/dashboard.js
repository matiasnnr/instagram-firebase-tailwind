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
            <div className="flex flex-col-reverse justify-center sm:grid sm:grid-cols-3 sm:gap-4 sm:justify-between mx-auto max-w-screen-lg">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )
}

export default Dashboard;
