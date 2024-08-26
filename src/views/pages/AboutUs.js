import React from 'react'
import AboutUsElement from '../components/AboutUsElement.js'
import Counter from '../../views/components/Counter.js'
import Service from '../../views/components/Service.js'
import FeatureAboutUs from '../../views/components/FeatureAboutUs.js'

const TeamMember = ({ name, role, image, social }) => {
    return (
        <div className="col-12 col-lg-3 col-md-6 mb-4 mb-md-0">
            <div className="border text-center py-5 px-3">
                <div className="mb-4">
                    <img className="img-fluid rounded-circle shadow overflow-hidden" src={image} alt="" />
                </div>
                <div>
                    <h5 className="mb-1">{name}</h5>
                    <small className="text-muted mb-3 d-block">{role}</small>
                    <ul className="list-inline mb-0">
                        {social.map((item) => (
                            <li key={item.id} className="list-inline-item">
                                <a className="border rounded px-2 py-1 text-dark" href={item.link}>
                                    <i className={item.icon}></i>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const AboutUs = () => {
    const TeamMembersData = [
        {
            id: 1,
            name: 'Nicole James',
            role: 'Manager',
            image: require('../../assets/img/team/01.png'),
            social: [
                { id: 1, icon: 'la la-facebook', link: '#' },
                { id: 2, icon: 'la la-dribbble', link: '#' },
                { id: 3, icon: 'la la-twitter', link: '#' },
                { id: 4, icon: 'la la-linkedin', link: '#' },
            ],
        },
        {
            id: 2,
            name: 'Lena Shea',
            role: 'Ceo',
            image: require('../../assets/img/team/02.png'),
            social: [
                { id: 1, icon: 'la la-facebook', link: '#' },
                { id: 2, icon: 'la la-dribbble', link: '#' },
                { id: 3, icon: 'la la-twitter', link: '#' },
                { id: 4, icon: 'la la-linkedin', link: '#' },
            ],
        },
        {
            id: 3,
            name: 'Mark Beele',
            role: 'Founder',
            image: require('../../assets/img/team/03.png'),
            social: [
                { id: 1, icon: 'la la-facebook', link: '#' },
                { id: 2, icon: 'la la-dribbble', link: '#' },
                { id: 3, icon: 'la la-twitter', link: '#' },
                { id: 4, icon: 'la la-linkedin', link: '#' },
            ],
        },
        {
            id: 4,
            name: 'Aubee Dion',
            role: 'Supervisor',
            image: require('../../assets/img/team/04.png'),
            social: [
                { id: 1, icon: 'la la-facebook', link: '#' },
                { id: 2, icon: 'la la-dribbble', link: '#' },
                { id: 3, icon: 'la la-twitter', link: '#' },
                { id: 4, icon: 'la la-linkedin', link: '#' },
            ],
        },

    ];
    return (
        <>
            <div class="page-content">
                <FeatureAboutUs/>
                
            </div>
        </>
    )
}

export default AboutUs
