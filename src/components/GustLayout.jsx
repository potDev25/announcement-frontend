import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Container from './Container'
import { useSelector } from 'react-redux'

export default function GustLayout() {

  const {user, token, error, loading} = useSelector((state) => state.auth)
  
  if(token){
    window.location.replace('/dashboard')
  }

  return (
    <div className='w-full h-full'>
      {
        loading ? <>
          Loading
        </> : <>
          <Navbar/>
          <Container>
              <Outlet/>
          </Container>
        </>
      }
    </div>
  )
}
