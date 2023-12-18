import React from 'react'
import '../styles/aboutStyle.css'
import Header from './Header'
import Footer from './Footer'

function About(props) {
    return (
        // Convert HTML to JSX
        <>
            <Header loggedInState={props.loggedInState}></Header>
            <div className="about-container">
                <div className="responsive-container-block bigContainer">
                    <div className="responsive-container-block Container">
                        <p className="text-blk heading">
                            About Us
                        </p>
                        <p className="text-blk subHeading">
                        We are passionate about sharing delicious and easy recipes for busy home cooks.

We started our website in 2023 as a hobby project to document our cooking adventures. Since then, we have grown to a community of over 10,000 subscribers who love our recipes and tips.

Over the years, we have improved our website design, added video tutorials, created a newsletter, and launched a cookbook. We are always listening to our readers and striving to provide the best content possible.
</p>
                        <div className="social-icons-container">
                            <a className="social-icon">
                                <img className="socialIcon image-block" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb33.png" />
                            </a>
                            <a className="social-icon">
                                <img className="socialIcon image-block" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb34.png" />
                            </a>
                            <a className="social-icon">
                                <img className="socialIcon image-block" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb35.png" />
                            </a>
                            <a className="social-icon">
                                <img className="socialIcon image-block" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/bb36.png" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default About