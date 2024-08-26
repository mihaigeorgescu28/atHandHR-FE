import React from 'react'
import Herosection from '../components/Herosection.js'
import Feature from '../components/Feature.js'
import Counter from '../components/Counter.js'
import Pricing from '../components/Pricing.js'
import Step from '../components/Step.js'
import Testimonial from '../components/Testimonial.js'
import Blog from '../components/Blog.js'
import Newsletter from '../components/Newsletter.js'

import { Container, Row, Col } from "reactstrap";

function LandingPage() {
  
  return (
    <>
    <div className="page-content"
    >
    
      <Herosection />
      <Feature />
      <Counter />
        <Pricing />
        <Step />
       
      </div>
      
    </>
  )
}

export default LandingPage

/*


        <Testimonial />
        <Blog />
        <Newsletter />

      <About />
        */
