import React from 'react'
import Newspress from './component/newspress';

const NewsAndPressReport = ({params,searchParams}) => {
  console.log(searchParams)
  return (
    <div>
    <Newspress params ={params}searchParams={searchParams}/>
    </div>
  )
}

export default NewsAndPressReport;