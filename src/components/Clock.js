import React, { useEffect, useState } from 'react'
import { GoKebabHorizontal } from "react-icons/go";

function Clock() {

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        setInterval(() => setTime(new Date()), 1000)
    }, [])

  return (
    <clock>
        <div className='time'>
            <div className='time-clock'>{time.getHours()}:{getRightMinutes(time.getMinutes())}</div>
            <GoKebabHorizontal className='time-menu'/>
        </div>
        <div className='date'>{getWeekDay(time.getDay())}, {getMonthName(time.getMonth())} {time.getDate()}</div>
    </clock>
  )
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
