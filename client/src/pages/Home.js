import { useEffect, useState } from 'react';
import axios from 'axios';
//components
import Nav from '../components/Nav';
import Gallery from '../components/home_Gallery';
import Contact from '../components/home_Contact';
//redux
import { useDispatch } from 'react-redux';
import { updateAlbumList, updateImageList } from '../actions';



export default function Home() {
    const dispatch = useDispatch();

    const [homeView, setHomeView] = useState('gallery');

    
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
            <Nav setHomeView={setHomeView} />
            {homeView === 'gallery' &&
                <Gallery />
            }
            {homeView === 'contact' &&
                <Contact />
            }
        </div>
    )
}