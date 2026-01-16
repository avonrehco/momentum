import React from 'react'
import { TbClockCog, TbSun } from "react-icons/tb";


export default function Header() {
  return (
    <header>
        <div className='nav'>
            <div className='focus'>
                <TbClockCog className='nav-icon'/>
                <div>Focus</div>
            </div>
            <div className='weather'>
                <div className='degrees-icon'>
                    <TbSun className='nav-icon'/>
                    <div className='degrees'>-33°</div>
                </div>
                <div className='city'>City</div>
            </div>
        </div>
    </header>
  )
}
