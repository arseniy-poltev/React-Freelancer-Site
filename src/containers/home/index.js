 import React, { Component, Fragment , useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TrustedCompany from "../../components/trustedcompany/index";


import MetaTags from 'react-meta-tags';

import {setUserType} from '../auth/actions';
import {Helmet} from "react-helmet";



const MainLayout = ({ isAuthenticated, user,setUserType, history }) => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    })

    const gotowork= () => {
        setUserType(2);
        history.push('/register')
    }

    const gotohire=()=>{
        setUserType(1);
        history.push('/register')
    }

    if (isAuthenticated) {
        if (user && user.userTypeId === 1) return <Redirect to='/dashboard' />
        if (user && user.userTypeId === 2) return <Redirect to='/dashboard-work' />
    }

    return (
        <Fragment>
            <Helmet>
                {/*<title>GoHireNow - Hire Top‑Quality Virtual Assistants</title>*/}
                {/*<meta property="og:title" content="GoHireNow" data-react-helmet="true"/>*/}
                {/*<meta property="og:site_name" content="GoHireNow" data-react-helmet="true"/>*/}
                {/*<meta property="og:image" content="images/Capture.PNG" data-react-helmet="true" />*/}
                {/*<meta property="og:type" content="text" data-react-helmet="true"/>*/}
                {/*<meta property="og:url" content="https://www.gohirenow.com" data-react-helmet="true"/>*/}
                {/*<meta property="og:description" content="Sign in to connect to your dashboard and start browsing jobs and candidates."*/}
                      {/*data-react-helmet="true"/>*/}
            </Helmet>
            <div className="hire-want-section">
                <div className="container">
                    <div className="row">
                        <div className="col-6 second-two" style={{paddingLeft: "0px", paddingRight: "0px"}}>
                            <div className="largetext">
                                <h2>
                                    Hire experts directly for any online jobs!
                                </h2>
                            </div>
                            <div className="smalltext">
                                <p>We take 0% commissions</p>
                            </div>
                            <div className="hire-work-buttons ">
                                <button className="btn text-uppercase" onClick={()=> gotohire()}>i want to hire</button>
                                <button className="btn text-uppercase" onClick={()=> gotowork()}>i want to work</button>
                            </div>
                        </div>
                        <div className="col-6 pr-0">
                            <div className="voted-div-outer">
                                <div className="voted-div">
                                    <div>
                                        <div className="top">
                                            <p>VOTED</p>
                                            <h4>#1</h4>
                                        </div>
                                        <p>The leader in <br /> online jobs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="as-seen-as">*/}
            {/*    <div className="container">*/}
            {/*        <div className="row black-back ">*/}
            {/*            <h2 className="text-uppercase">as seen on</h2>*/}
            {/*            <div className="black-circle-adj">*/}
            {/*                <div>*/}
            {/*                    <img src={require("../../assets/seen1.png")} alt="" />*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                    <img className='bottom-fixed' src={require("../../assets/seen2.png")} alt="" />*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                    <img src={require("../../assets/seen3.png")} alt="" />*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                    <img src={require("../../assets/seen4.png")} alt="" />*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="what-are-you-looking">
                <div className="container">
                    <div className="row flex-column top-text align-items-center margin-9">
                        <h2>What are you looking for?</h2>
                        <p>Choose a category of expertise</p>
                    </div>
                    <div className="row ovals">
                        <div className="single-oval col-md-2">
                            <img src={require("../../assets/group1.png")} alt="" />
                            <p>Social Media</p>
                        </div>
                        <div className="single-oval col-md-2">
                            <img src={require("../../assets/group2.png")} alt="" />
                            <p>Virtual Assistant</p>
                        </div>
                        <div className="single-oval col-md-2">
                            <img src={require("../../assets/group3.png")} alt="" />
                            <p>Wordpress</p>
                        </div>
                        <div className="single-oval col-md-2">
                            <img src={require("../../assets/group4.png")} alt="" />
                            <p>Shopify</p>
                        </div>
                        <div className="single-oval col-md-2">
                            <img src={require("../../assets/group5.png")} alt="" />
                            <p>Design & Creative</p>
                        </div>
                        <div className="single-oval col-md-2">
                            <img src={require("../../assets/group6.png")} alt="" />
                            <p>Sales</p>
                        </div>
                        <div className="single-oval col-md-2">
                            <img src={require("../../assets/group7.png")} alt="" />
                            <p>Customer Service</p>
                        </div>
                        <div className="single-oval col-md-2">
                            <img src={require("../../assets/group8.png")} alt="" />
                            <p>Marketing</p>
                        </div>
                        <div className="single-oval col-md-2">
                            <img src={require("../../assets/group9.png")} alt="" />
                            <p>Writing</p>
                        </div>
                        <div className="single-oval col-md-2">
                            <img src={require("../../assets/group10.png")} alt="" />
                            <p>Admin support</p>
                        </div>
                        <div className="single-oval col-md-2">
                            <img src={require("../../assets/group11.png")} alt="" />
                            <p>Management</p>
                        </div>
                        <div className="single-oval col-md-2">
                            <img src={require("../../assets/group12.png")} alt="" />
                            <p>Web, Mobile & Software Dev</p>
                        </div>
                    </div>
                    <div className="post-a-job-btn">
                        <Link className="unstyled-link-improved" to="/register">
                            <button className="btn text-uppercase "
                            style={{backgroundColor: "rgb(237, 123, 24)"}}
                            >Sign Up</button>
                            </Link>
                    </div>
                </div>
            </div>
            <div className="why-gohirenow">
                <div className="container pt-3">
                    <div className="inner-div">
                        <div className="row">
                            <div className="gohire-why">
                                <h2>Why GoHireNow</h2>
                                <p>We are the leading experts in direct outsourcing</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="black-ovals">
                                    <img src="/images/whygohirenow/searchglass1.png" className="black-ovalwhy" />
                                    <div className="oval-paragraph">
                                        <p className="dummy-text">
                                            <span className="font-weight-bold">Find Experts in Minutes</span> <br />
                                            It's so easy to find experts, post a job,
                                            get applicants within minutes and hire.
                                        </p>
                                    </div>
                                </div>
                                <div className="black-ovals">
                                    <img src="/images/whygohirenow/people3.png" className="black-ovalwhy" />
                                    <div className="oval-paragraph">
                                        <p className="dummy-text">
                                            <span className="font-weight-bold">Create a Dream Team</span><br />
                                            Our experts have degrees in their expertise.
                                            It's the best place to create your dream team.
                                        </p>
                                    </div>
                                </div>
                                <div className="black-ovals">
                                    <img src="/images/whygohirenow/graph5.png" className="black-ovalwhy" />
                                    <div className="oval-paragraph">
                                        <p className="dummy-text">
                                            <span className="font-weight-bold">Grow Your Company</span><br />
                                            Our talent pool will give you the leverage to grow your company. We have
                                            over 1,500 skill sets.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="black-ovals">
                                    <img src="/images/whygohirenow/upping2.png" className="black-ovalwhy" />
                                    <div className="oval-paragraph">
                                        <p className="dummy-text">
                                            <span className="font-weight-bold">Reduce Payroll</span><br />
                                            Outsourcing is the future, cut on office space,
                                            benefits, equipment, insurance by hiring online.
                                            </p>
                                    </div>
                                </div>
                                <div className="black-ovals">
                                    <img src="/images/whygohirenow/dollarhand4.png" className="black-ovalwhy" />
                                    <div className="oval-paragraph">
                                        <p className="dummy-text">
                                            <span className="font-weight-bold">Hire & Pay Direct</span><br />
                                            We put you directly in contact with your worker.
                                            You manage and pay your team directly.
                                        </p>
                                    </div>
                                </div>
                                <div className="black-ovals">
                                    <img src="/images/whygohirenow/handshake1.png" className="black-ovalwhy" />
                                    <div className="oval-paragraph">
                                        <p className="dummy-text">
                                            <span className="font-weight-bold">
                                                Save & Change Their Lives
                                            </span>
                                            <br />
                                            Not only you reduce your expenses. You also create opportunities for
                                            families in emerging countries.
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center mt-5  mb-5 ">
                            <Link to="/register">
                                <button className="btn text-uppercase post-a-job">post a job </button>
                            </Link>
                        </div>
                        <TrustedCompany />
                        <div className="row flex-column align-items-center many-ovals quotes " >
                            <h2>They saved a lot!</h2>
                            <div className="save-a-lot">
                                <div className="save-a-lot-item">
                                    <img src={"images/compabny/boda.jpg"} className="orange-oval " />
                                    <div className="header">
                                        <h1>MesureX</h1>
                                    </div>
                                    <div className="para">
                                        <p>We found a great app developer at a lower salary.
                                            It really gave us the leverage we needed to grow our company.
                                            There is no way we could have find a developer at this rate in United States.
                                        </p>
                                    </div>
                                    <div className="author">
                                        <h1>- Joseph P. Owner</h1>
                                    </div>
                                </div>
                                <div className="save-a-lot-item">
                                    <img src={"images/compabny/larja.jpg"} className="orange-oval " />
                                    <div className="header">
                                        <h1>PetsDirectn</h1>
                                    </div>
                                    <div className="para">
                                        <p>We were struggling to have 24h/7 live chat support.
                                            Within 48 hours we hired truly amazing virtual assistants, they are now doing
                                            our live chat 24/7. Not only our Live Chat is always online, we have also increased
                                            our sales.  </p>
                                    </div>
                                    <div className="author">
                                        <h1>- William W. CEO</h1>
                                    </div>
                                </div>
                                <div className="save-a-lot-item">
                                    <img src={"images/compabny/ahmad.jpg"} className="orange-oval " />
                                    <div className="header">
                                        <h1>The Virtual Force</h1>
                                    </div>
                                    <div className="para">
                                        <p>
                                            Being a digital agency is really hard to make profit.
                                            Our salaries expenses were too high. We have turned expenses into profit by hiring
                                            remote employees. It really helped us to go from a break even point to profitable!
                                        </p>
                                    </div>
                                    <div className="author">
                                        <h1>- M.Ahmad Owner</h1>
                                    </div>
                                </div>
                                <div className="save-a-lot-item">
                                    <img src={"images/compabny/larki.jpg"} className="orange-oval " />
                                    <div className="header">
                                        <h1>Lab Sellers</h1>
                                    </div>
                                    <div className="para">
                                        <p>I am a passive income lover. I have automated all my Shopify stores
                                            using virtual assistants. I went from 28 hours per week of work to
                                            less than 1 hour per day. They manage everything, orders, inventory,
                                            management and support.
                                        </p>
                                    </div>
                                    <div className="author">
                                        <h1>- Shaina S. Owner</h1>
                                    </div>
                                </div>
                            </div>
                            <h2>We changed their lives!</h2>
                            <div className="save-a-lot">
                                <div className="save-a-lot-item">
                                    <img src={"images/01.png"} className="orange-oval blue-ovals" />

                                    <div className="header">
                                        <h1>Sales Manager</h1>
                                    </div>
                                    <div className="para">
                                        <p>
                                            As a sales manager in real estate, I have the best jobs in the world! I work anytime that I can right at the comfort of my home while being a full-time mom.
                                        </p>
                                    </div>
                                    <div className="author">
                                        <h1>- Mafe F</h1>
                                    </div>
                                </div>
                                <div className="save-a-lot-item">
                                    <img src={"images/02.png"} className="orange-oval blue-ovals" />
                                    <div className="header">
                                        <h1>Real Estate</h1>
                                    </div>
                                    <div className="para">
                                        <p>
                                            Working from home helps me to work smart. Value in time management less travel expenses. More time for me and my Family
                                        </p>
                                    </div>
                                    <div className="author">
                                        <h1>- Julie Christie F</h1>
                                    </div>
                                </div>
                                <div className="save-a-lot-item">
                                    <img src={"images/03.jpg"} className="orange-oval blue-ovals" />
                                    <div className="header">
                                        <h1>Social Media</h1>
                                    </div>
                                    <div className="para">
                                        <p>

                                            Freelancing has helped me a ton especially when it comes to managing my time. I can take care and give more time to my
                                            family and maintain good health

                                        </p>
                                    </div>
                                    <div className="author">
                                        <h1>- Aldrin L</h1>
                                    </div>
                                </div>
                                <div className="save-a-lot-item">
                                    <img src={"images/04.jpg"} className="orange-oval blue-ovals" />
                                    <div className="header">
                                        <h1>Affiliate Marketing</h1>
                                    </div>
                                    <div className="para">
                                        <p>

                                            Working from home enables me to gain full control of my time. I can be beyond 100% productive as I pursue my passion.
                                            The most important thing is that I get to spend more time with my loved ones.

                                        </p>
                                    </div>
                                    <div className="author">
                                        <h1>- Yna Isabelle F</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="post-a-job-btn">
                                <Link to="/register">
                                    <button className="btn text-uppercase post-a-job">
                                    post a job
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
 });
export default connect(mapStateToProps,{setUserType})(MainLayout);