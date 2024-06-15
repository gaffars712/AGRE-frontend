"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

const DateSelector = ({ searchParams }) => {
    console.log(searchParams)
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const router = useRouter()
    useEffect(() => {
        const newDate = `${year}-${(month <= 9) && (month[0] !== '0') ? `0${month}` : month}-${day <= 9 && (day[0] !== '0') ? `0${day}` : day}`
        console.log('date', newDate)
        if ((day && month) && year) {
            router.push(`/media/news-and-press-releases?date=${newDate}`)
        }
    }, [day, month, year])
    useEffect(() => {
        if (searchParams?.date) {
            const [year, month, day] = searchParams?.date.split('-')
            console.log(month, year, day)
            setYear(year)
            setMonth(month)
            setDay(day)
        }
    }, [])
    return (
        <div className="d-flex justify-content-end gap-1">
            <select className='selectDate' value={day} onChange={(e) => setDay(e.target.value)}>
                <option value="" >Day</option>
                {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <select className='selectDate' value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="" >Month</option>
                {months.map((m, idx) => <option key={m} value={idx + 1}>{m}</option>)}
            </select>

            <select className='selectDate' value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="" >Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
        </div>
    );
};

export default DateSelector;
