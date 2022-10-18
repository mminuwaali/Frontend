import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { EmployersFeature } from '../components/EmployersFeature';
import {Footer} from '../../components/Footer'

export const EmployersHome = () => {
  return (
    <>
    <Navbar />
    <Hero />
    <EmployersFeature />
    <Footer />
    
    </>
  )
}
