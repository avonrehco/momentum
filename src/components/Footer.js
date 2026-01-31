import React, { useState } from 'react'
import { MdOutlineCheckBox, MdOutlineImage } from "react-icons/md";

export default function Footer() {

  let [galleryOpen, setGalleryOpen] = useState(false)

  return (
    <footer>
        <div className='change-bg'>
            <MdOutlineImage onClick = {() => setGalleryOpen(galleryOpen = !galleryOpen)} className='footer-icon'/>

            {galleryOpen && (
              <div className='gallery'></div>
            )}

        </div>
        <div className='quote'>Be the flame, not the moth</div>
        <div className='tasks'>
            <div className='tasks-text'>Tasks</div>
            <MdOutlineCheckBox className='footer-icon'/>
        </div>
    </footer>
  )
}
