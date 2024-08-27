import React from 'react';
import OwlCarousel from 'react-owl-carousel2';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import logo from '../../assets/img/business/athandhrlogo_transparent_small.png'; 

function Herosection() {
    const options = {
        items: 1,
        autoplay: true,
        loop: true,
        margin: 30,
    };

    const teamMembers = [
        { image: require("../../assets/img/landing/dashboard2.png") },
        { image: require("../../assets/img/landing/my-account.png") },
        { image: require("../../assets/img/landing/time-management.png") },
        { image: require("../../assets/img/landing/calendar.png") },
        { image: require("../../assets/img/landing/news-feed.png") },
    ];

    return (
            <Container>
                <Row>
                
                    <div className="col-12 col-lg-5" style={{ paddingTop: '100px'}}>
                        <h1 className="mb-4 font-w-4" >
                        Your <span className="font-w-6 text-primary">HR </span>needs, at the tip of your<span className="font-w-6 text-primary"> fingers</span>
                        </h1>
                        <p className="lead mb-4">Effortless employee management, just a click away.</p>
                        <a href="https://calendly.com/mihai-georgescu-athandhr/30min" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Book a demo</a>
                    </div>
                   
                    <div className="col-12 col-lg-6 mt-5 mt-lg-6">
                        <div className="bg-white shadow-primary rounded overflow-hidden p-3 me-lg-n8">
                            <OwlCarousel options={options}  >
                                {teamMembers.map((member, index) => (
                                    <div key={index}>
                                        <img className="img-fluid border border-light" src={member.image} alt="" />
                                    </div>
                                ))}
                            </OwlCarousel>
                        </div>
                </div>
                </Row>
                </Container>
    );
}

export default Herosection;


/*

<div className='bg-white shadow-primary rounded overflow-hidden p-3 me-lg-n8'>
                                <OwlCarousel
                                    className="owl-carousel"
                                    dotData={false}
                                    items={2}
                                    autoplay={true}
                                    margin={30}
                                    dots={false}
                                    loop={true}
                                    height={1000}
                                    responsive={{
                                        0: {
                                            items: 1 // Show 1 item for screens with width less than or equal to 0px (mobile screens)
                                        },
                                        768: {
                                            items: 1 // Show 3 items for screens with width greater than or equal to 768px (larger screens)
                                        }
                                    }}
                                >
                                    {teamMembers.map((member, index) => (
                                        <div key={index}>
                                            <img className="img-fluid border border-light" src={member.image} alt="" />
                                        </div>
                                    ))
                                    }
                                </OwlCarousel>
                            </div>

                            */
