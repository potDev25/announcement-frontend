import React from 'react'

export default function Form({children, onSubmit}) {
  return (
    <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">{children}</form>
  )
}
