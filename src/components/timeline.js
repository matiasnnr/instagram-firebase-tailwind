import React from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';
import Post from './post';

const Timeline = () => {
    // we need to get the logged in user's photos
    const { photos } = usePhotos();

    console.log(`photos`, photos)

    // on loading the photos, we need to use react skeleton
    // if we have photos, render them (create a post component)
    // if the user has no photos, tell to create some photos
    return (
        <div className="container col-span-2" >
            {
                !photos
                    ?
                    (
                        <>
                            <Skeleton count={4} height={500} className="w-full mb-5 ml-2 md:ml-0" />
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
