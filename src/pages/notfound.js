import React, { useEffect } from 'react'

const NotFound = () => {

    useEffect(() => {
        document.title = 'No encontrada - Instagram'
    }, [])

    return (
        <div className="bg-gray-background">
            <div className="mx-auth max-w-screen-lg">
                <p className="text-center text-2xl">¡No encontrada!</p>
            </div>
        </div>
    )
}

export default NotFound;
