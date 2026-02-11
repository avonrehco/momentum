import React, { useState } from 'react'
import { MdOutlineCheckBox, MdOutlineImage } from "react-icons/md";
import Gallery from './Gallery';

export default function Footer(props) {

  let [galleryOpen, setGalleryOpen] = useState(false)

  return (
    <footer>
        <div className='change-bg'>
            <MdOutlineImage onClick = {() => setGalleryOpen(galleryOpen = !galleryOpen)} className='footer-icon'/>

            {galleryOpen && (
              <Gallery photos = {props.photos} currentbg = {props.currentbg} onChangeBg = {props.onChangeBg} onAddPhoto = {props.onAddPhoto} onAddToFavorite = {props.onAddToFavorite} onDeleteFromFavorite = {props.onDeleteFromFavorite} onChangeCategory = {props.onChangeCategory} activeCategory = {props.activeCategory}/>
            )}

        </div>
        <div className='quote'>Be the flame, not the moth</div>
        <div className='tasks'>
            <div className='full-icon'>
              <div className='tasks-text'>Tasks</div>
              <MdOutlineCheckBox className='footer-icon'/>
            </div>
        </div>
    </footer>
  )
}
