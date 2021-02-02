import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateAlbumList, updateImageList } from '../actions';



export default function Gallery() {
    const dispatch = useDispatch();
    const albumList = useSelector(state => state.albumList);
    const imageList = useSelector(state => state.imageList);

    
    useEffect(() => {
        getAlbums();
    // eslint-disable-next-line
    }, [])
    

    const getAlbums = () => {
        axios.get('/api/albums/')
        .then(res => {
            dispatch(updateAlbumList(res.data[0].albums));
            dispatch(updateImageList(res.data[0].albums.map(album => album.images.map(image => image)).flat()));
        })
    }

    return (
        <div>
            <Nav />
            <div className="grid w-full justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5" onClick={() => console.log(imageList)}>
            {imageList.map(image => 
                <Image img={image.url} key={image.name} />
            )}

            </div>
        </div>
    )
}

function Image(props) {
    return (
        <div className="max-w-full h-auto max-h-72">
            <img src={props.img} alt="" className="w-full h-full object-cover" />
        </div>
        
    )
}