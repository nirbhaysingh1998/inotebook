import React from 'react'
import { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
export default function About() {
  const a=useContext(noteContext)
  // useEffect(() => {
  //   return () => {
  //    // a.update()
  //   };
  // }, []);
  return (
    <div>
     this is  About 
    </div>
  )
}
