import React from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';
import Post from './post';

const Timeline = () => {
    // we need to get the logged in user's photos
    const { photos } = usePhotos();

    // on loading the photos, we need to use react skeleton
    // if we have photos, render them (create a post component)
    // if the user has no photos, tell to create some photos
    return (
        <div className="container col-span-3 md:col-span-2 px-2 md:pl-2" >
            {
                !photos
                    ?
                    (
                        <>
                            <Skeleton count={4} height={500} className="w-full mb-5" />
                        </>
                    )
                    :
                    photos?.length > 0
                        ?
                        (
                            photos.map((content) => <Post key={content.docId} content={content} />)
                        )
                        :
                        (
                            <p className="text-center text-2xl">Sigue a personas para ver fotos</p>
                        )
            }
        </div>
    )
}

export default Timeline;
