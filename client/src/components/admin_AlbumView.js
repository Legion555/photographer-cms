import axios from "axios";
import Upload from './Upload';
import { storage } from '../firebase/firebase';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData, updateAlbumData} from '../actions';
//icons
import { BsTrash } from 'react-icons/bs';

export default function AddAlbum(props) {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);
    const albumData = useSelector(state => state.albumData);

    const deleteImage = (imageid, imageName) => {
        const payload = {
            userId: userData._id,
            albumId: albumData._id,
            imageId: imageid
        }
        axios.put("/api/images/deleteImage", payload)
        .then(res => {
            //update local user data
            axios.get('/api/users', {
                params: {
                    email: userData.email
                }
            })
            .then(res => {
                //delete on firebase storage
                let imageRef = storage.ref(`/images/${imageName}`);
                imageRef.delete()
                .then(() => {
                    //set user data
                    dispatch(updateUserData(res.data[0]));
                    //set album data
                    dispatch(updateAlbumData( res.data[0].albums.filter(album => album._id === albumData._id)[0]))
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0">
            <div className="w-full h-full bg-gray-50 bg-opacity-80" onClick={() => props.setAlbumView('')}></div>
            <div className="w-max h-5/6 absolute px-5 py-3 rounded bg-gray-100 shadow overflow-y-scroll">
                <div>
                    <h1 className="text-center text-4xl">{albumData.name}</h1>
                    <Upload />
                </div>
                <div className="grid w-full justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                {albumData.images && albumData.images.map(image => 
                    <Image img={image.url} key={image.name} imageId={image._id} imageName={image.name} deleteImage={deleteImage} />
                )}
                </div>
            </div>
        </div>
    )
}

function Image(props) {
    return (
        <div className="w-72 max-h-72">
            <img src={props.img} alt="" className="w-full h-full object-cover" />
            <div className="w-full h-full relative bottom-full opacity-0 hover:opacity-100">
                <BsTrash className="float-right text-5xl text-red-600 bg-gray-200 mt-2 mr-2 p-2 rounded-xl cursor-pointer hover:bg-red-600 hover:text-gray-200"
                    onClick={() => props.deleteImage(props.imageId, props.imageName)} />
            </div>
        </div>
        
    )
}