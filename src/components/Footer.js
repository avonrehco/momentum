import React from 'react'
import { MdOutlineCheckBox, MdOutlineImage } from "react-icons/md";

export default function Footer() {
  return (
    <footer>
        <div className='change-bg'>
            <MdOutlineImage className='footer-icon'/>
        </div>
        <div className='quote'>Be the flame, not the moth</div>
        <div className='tasks'>
            <div className='tasks-text'>Tasks</div>
            <MdOutlineCheckBox className='footer-icon'/>
        </div>
    </footer>
  )
}
