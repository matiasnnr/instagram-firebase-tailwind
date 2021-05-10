import React, { useEffect } from 'react';
import Header from '../components/header';

const NotFound = () => {

    useEffect(() => {
        document.title = 'No encontrada - Instagram'
    }, [])

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <p className="text-center text-2xl">Página no encontrada</p>
            </div>
        </div>
    )
}

export default NotFound;
