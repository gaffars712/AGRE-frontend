import React from 'react'
import WaslBlog from './components/waslBlog';

const Blogs = ({params,searchParams}) => {
  return (
    <div>
      <WaslBlog params={params} searchParams={searchParams}/>
    </div>
  )
}

export default Blogs;