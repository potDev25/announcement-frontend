import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Container from './Container'
import { useSelector } from 'react-redux'
import Loader from './Loader/Loader'

export default function GustLayout() {

  const { token, loading} = useSelector((state) => state.auth)
  
  if(token){
    return <Navigate to={'/home'}/>
  }

  return (
    <div className='w-full h-full'>
      {
        loading ? <Loader/> : <>
          <Navbar/>
          <Container>
              <Outlet/>
          </Container>
        </>
      }
    </div>
  )
}
