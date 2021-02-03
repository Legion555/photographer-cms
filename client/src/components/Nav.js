//icons
import { FaFacebook, FaTwitter } from 'react-icons/fa';
//redux
import { useSelector, useDispatch } from "react-redux"
import { updateImageList } from "../actions"
//routing
import {A} from 'hookrouter';



export default function Nav(props) {
    const dispatch = useDispatch();
    const albumList = useSelector(state => state.albumList);

    const isLoggedIn = useSelector(state => state.isLoggedIn);

    const viewAlbum = (albumImages) => {
        props.setHomeView('gallery');
        dispatch(updateImageList(albumImages));
    }
    const viewAllAlbums = () => {
        props.setHomeView('gallery');
        dispatch(updateImageList(albumList.map(album => album.images.map(image => image)).flat()))
    }

    return (
        <div className="flex justify-evenly items-center w-full h-12 pt-5">
            <div className="flex">
                <p className="p-2 hover:bg-gray-200 cursor-pointer">Logo</p>
            </div>
            <div className="flex">
                <div className="nav-dropdown py-2 hover:bg-gray-200 cursor-pointer">
                    <div>
                        <p className="px-4"
                            onClick={viewAllAlbums}>Gallery</p>
                    </div>
                    <div className="nav-dropdown-list hidden mt-2 absolute bg-gray-200">
                        {albumList.map(album => 
                            <p className="px-4 py-2 hover:bg-gray-400" key={album.name}
                                onClick={() => viewAlbum(album.images)}>{album.name}</p>
                        )}
                        <p className="px-4 py-2 hover:bg-gray-400"
                                onClick={viewAllAlbums}>All</p>
                    </div>
                </div>
                <p className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => props.setHomeView('contact')}>Contact</p>
                {isLoggedIn &&
                    <A href="/admin">
                        <p className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Dashboard</p>
                    </A>
                    
                }
            </div>
            <div className="flex">
                <FaFacebook className="text-4xl p-2 rounded-2xl hover:bg-blue-100" />
                <FaTwitter className="text-4xl p-2 rounded-2xl hover:bg-blue-100" />
            </div>
        </div>
    )
}