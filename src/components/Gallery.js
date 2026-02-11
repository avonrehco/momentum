import React, { useRef } from 'react'
import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";
import { PiCheckFatFill } from "react-icons/pi";
import GalleryCategoties from './GalleryCategoties';

export default function Gallery(props) {

    const fileUploadRef = useRef(null)
    
    const handleImgUpload = (event) => {
        event.preventDefault();
        fileUploadRef.current.click();
    }
    
    const uploadImageDisplay = async (event) => {

        const files = Array.from(event.target.files)

        files.forEach(file => {
            const reader = new FileReader()
            reader.onloadend = () => {
                const objectUrl = URL.createObjectURL(file)

                const newImg = {
                    id: props.photos.length + 1,
                    img: file.name,
                    url: objectUrl,
                    isUploaded: true,
                    isFavorite: false,
                }

                props.onAddPhoto(newImg)
            }

            reader.readAsDataURL(file)
        })

        fileUploadRef.current.value = ''
    }

    const showNothing = (category) => {
        if(category === 'isFavorite'){
            return (
                <div className = 'empty'>
                    <h2>No favorite photos yet</h2>
                    <p>Click the heart icon on a photo to start your collection</p>
                </div>
            )
        } else {
            return (
                 <div className = 'empty'>
                    <h2>Personalize your dashboard with your own photos</h2>
                    <p>Click + Add Photo button</p>
                </div>
            )
        }
    }

    const showPhotos = () => {
        return props.photos.map(el => {
            if (el.url){
                return (
                    <div className={`photo ${el.id === props.currentbg && 'currentbg'}`}>
                        <PiCheckFatFill className={`setBg ${el.id === props.currentbg && 'active'}`} onClick={() => props.onChangeBg(el)}/>
                        <IoMdHeart className={`like ${el.isFavorite && 'noactive'}`} onClick={() => props.onAddToFavorite(el)}/>
                        <IoMdHeartDislike className={`unlike ${el.isFavorite && 'active'}`} onClick={() => props.onDeleteFromFavorite(el)}/>
                        <img className='img' src = {el.url}/>
                    </div>
                )
            } else {
                return (
                    <div className={`photo ${el.id === props.currentbg && 'currentbg'}`}>
                        <PiCheckFatFill className={`setBg ${el.id === props.currentbg && 'active'}`} onClick={() => props.onChangeBg(el)}/>
                        <IoMdHeart className={`like ${el.isFavorite && 'noactive'}`} onClick={() => props.onAddToFavorite(el)}/>
                        <IoMdHeartDislike className={`unlike ${el.isFavorite && 'active'}`} onClick={() => props.onDeleteFromFavorite(el)}/>
                        <img className='img' src = {"/img/" + el.img}/>
                    </div>
                )
            }
        })
    }

    return (
        <div className='gallery'>
            <div className='gallery-head'>
                <div className='gallery-title'>Photos</div>
                <div className='gallery-desc'>See a new inspiring photo each day</div>
            </div>
            <div className='gallery-menu'>
                <GalleryCategoties photos = {props.photos} onChangeCategory = {props.onChangeCategory} activeCategory = {props.activeCategory}/>
                <div className='add-btn' onClick={handleImgUpload}>+ Add Photo</div>
                <input type="file" id="file" ref={fileUploadRef} onChange={uploadImageDisplay} hidden />
            </div>
            <div className='gallery-photos'>
                {props.photos.length > 0 ?
                    showPhotos() : showNothing(props.activeCategory)}
            </div>
        </div>
    )
}
