import React, { useEffect, useState } from 'react'

function Clock() {

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        setInterval(() => setTime(new Date()), 1000)
    }, [])

  return (
    <clock>
        <div>
            <div className='time'>{time.getHours()}:{time.getMinutes()}</div>
            <div className='date'>{getWeekDay(time.getDay())}, {getMonthName(time.getMonth())} {time.getDate()}</div>
        </div>
        <div className='quote'>Be the flame, not the moth</div>
    </clock>
  )
}

function getWeekDay (day){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return weekday[day];
}

function getMonthName (month){
    const year = ["January","February","March","April","May","June","Juky", "August", "September", "October", "November", "December"];
    return year[month];
}

export default Clock;
