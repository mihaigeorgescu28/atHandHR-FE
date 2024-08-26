import React from 'react';
import { Container, Row, Col } from "reactstrap";
import { default as svg1 } from '../../assets/img/landing/svg/01.svg'
import { default as svg2 } from '../../assets/img/landing/svg/02.svg';
import { default as svg3 } from '../../assets/img/landing/svg/03.svg';
import { default as svg4 } from '../../assets/img/landing/svg/04.svg';
import { default as svg5} from '../../assets/img/landing/svg/05.svg';
import { default as svg6} from '../../assets/img/landing/svg/06.svg';

function Feature() {
  const data1 = [
    {
      service: "Holiday Management",
      details: "Seamlessly request, approve, and track employee holidays with an intuitive interface that ensures clarity and convenience for both staff and management.",
      img: svg2,
    }
    ,
    {
      service: "Internal Documents",
      details: "Securely store, share, and manage important company documents within a centralised hub, ensuring easy access and organised workflows.",
      img:svg6,
    },


  ]
  const data2 = [
    {
      service: "Time Management",
      details: "Efficiently manage work hours, track attendance, and monitor productivity with a robust system designed to optimise your team's time.",
      img: svg1,
    },
    {
      service: "Employee Portal",
      details: "Empower your workforce with a personalised portal that provides instant access to key HR functions, company updates, and personal information.",
      img: svg4,
    },
  ]
  return (
    <>
      <Container>
      <Row>
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="col-lg-5 col-md-6 pe-lg-4">
              <div class="mb-5" style={{ paddingTop: '120px' }}>
                <h2 class="mb-0"><span class="font-w-4 d-block">Essential Tools for</span> Modern Workforce Management</h2>
              </div>
              {
                data1.map((item) => {
                  return (
                    <>
                      <div class="px-lg-7 px-4 py-5 rounded bg-white shadow text-center mb-5">
                        <div>
                          <img class="img-fluid" src={item.img} alt="" />
                        </div>
                        <h5 class="mt-4 mb-3">{item.service}</h5>
                        <p class="mb-0">{item.details}</p>
                      </div>
                    </>
                  )
                }
                )
              }

            </div>
            <div class="col-lg-5 col-md-6 ps-lg-4 mt-5 mt-lg-0">
            {
              data2.map((item)=>{
                return(
                  <>
                  <div class="px-lg-7 px-4 py-5 rounded bg-white shadow text-center mb-5">
                <div>
                  <img class="img-fluid" src={item.img} alt="" />
                </div>
                <h5 class="mt-4 mb-3">{item.service}</h5>
                <p class="mb-0">{item.details}</p>
              </div>
                  </>
                )
              })
            }
            </div>
          </div>
        </div>
        </Row>
        </Container>
    </>
  )
}

export default Feature
