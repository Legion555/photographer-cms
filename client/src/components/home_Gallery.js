//redux
import { useSelector } from 'react-redux';



export default function Gallery() {
    const imageList = useSelector(state => state.imageList);

    return (
        <div>
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