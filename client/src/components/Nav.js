//icons
import { FaFacebook, FaTwitter } from 'react-icons/fa';
//redux
import { useSelector, useDispatch } from "react-redux"
import { updateView, updateImageList } from "../actions"
//react-router
import { useHistory } from "react-router-dom";



export default function Nav(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const albumList = useSelector(state => state.albumList);

    const view = useSelector(state => state.view);

    return (
        <div className="flex justify-evenly items-center w-full h-12 pt-5">
            <div className="flex">
                <p className="p-2 hover:bg-gray-200 cursor-pointer">Logo</p>
            </div>
            <div className="flex">
                <div className="nav-dropdown py-2 hover:bg-gray-200 cursor-pointer">
                    <div>
                        <p className="px-4"
                            onClick={() => history.push('/')}>Gallery</p>
                    </div>
                    <div className="nav-dropdown-list hidden mt-2 absolute bg-gray-200">
                        {albumList.map(album => 
                            <p className="px-4 py-2 hover:bg-gray-400" key={album.name}
                                onClick={() => dispatch(updateImageList(album.images))}>{album.name}</p>
                        )}
                        <p className="px-4 py-2 hover:bg-gray-400"
                                onClick={() => dispatch(updateImageList(albumList.map(album => album.images.map(image => image)).flat()))}>All</p>
                    </div>
                </div>
                {view === 'dashboard' &&
                    <p className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => history.push('/dashboard')}>Dashboard</p>
                }
            </div>
            <div className="flex">
                <FaFacebook className="text-4xl p-2 rounded-2xl hover:bg-blue-100" />
                <FaTwitter className="text-4xl p-2 rounded-2xl hover:bg-blue-100" />
            </div>
        </div>
    )
}