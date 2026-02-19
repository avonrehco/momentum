import React, { useEffect, useState } from 'react'
import { GoKebabHorizontal } from "react-icons/go";
import ClickOutside from './ClickOutside';

function Clock() {

    let [menuOpen, setMenuOpen] = useState(false)

    const [time, setTime] = useState(new Date())

    let [toggled, setToggled] = useState(false)

    useEffect(() => {
        setInterval(() => setTime(new Date()), 1000)
    }, [])

  return (
    <clock>
        <div className='time'>
            <div className='time-clock'>{getTimeFormat(time.getHours(), toggled)}:{getRightMinutes(time.getMinutes())}</div>
            <ClickOutside onClickOutside={() => setMenuOpen(false)}>
                <GoKebabHorizontal onClick  = {() => setMenuOpen(menuOpen = !menuOpen)} className={`time-menu ${menuOpen && "active"}`} />
                {menuOpen && (
                <div className='clock-menu'>
                    <div className='12-clock'>12-hour clock</div>
                    <label className = 'switch'>
                        <input type='checkbox' checked = {toggled} onChange = {() => setToggled(!toggled)}/>
                        <span className='slider'></span>
                    </label>
                </div>
                )}
            </ClickOutside>
        </div>
        <div className='date'>{getWeekDay(time.getDay())}, {getMonthName(time.getMonth())} {time.getDate()}</div>
    </clock>
  )
}

function getTimeFormat (hour, toggled) {
    if (toggled){
        if (hour > 12) return hour - 12;
        else return hour
    } else {
        if (hour < 10) return '0' + hour; 
        else return hour
    }
}

function getWeekDay (day){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return weekday[day];
}

function getMonthName (month){
    const year = ["January","February","March","April","May","June","July", "August", "September", "October", "November", "December"];
    return year[month];
}

function getRightMinutes(minute){
    if (minute < 10) return '0' + minute;
    else return minute;
}

export default Clock;
