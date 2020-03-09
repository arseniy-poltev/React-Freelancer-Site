import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link ,Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {setUserType} from '../../containers/auth/actions'

const Footer = ({ isAuthenticated, user,history,setUserType }) => {

    const gotowork=()=>{
        setUserType(2);
        history.push("/register")
    }
    const gotohire=()=>{
        setUserType(1);
        history.push("/register")
    }
    const postajobs=()=>{
        if(isAuthenticated){
            if(user && user.userTypeId === 1 ){
                return <Link to='/post-job'><p>Post a job</p></Link>
            }
            else{
                return <Link to={'/search-work'}><p>Browse Jobs</p></Link>
            }}
        else{ return <p className="pointer" onClick={()=> gotohire()}>Post a job</p>
        }
    }
    const getajobs=()=>{

        if(isAuthenticated){
            if(user && user.userTypeId === 1 ){
                return <Link to='/search-work'><p>Browse Workers</p></Link>
            }
            else{
                return <Link to={'/search-work'}><p>Get a job</p></Link>
            }
        }
        else {
                return <p className="pointer" onClick={()=> gotowork()}>Get a job</p>
        }
        // isAuthenticated ? <p>Get a job</p> :
    }
    return (
        <div className={!isAuthenticated ? "footer footer-logining" : "footer footer-login"}>
            <div className="container ">
                <div className="row info-div">
                    <div className="col-sm-3 img-div">
                        <img src={require("../../assets/chaticon.png")} alt="" />
                    </div>
                    <div className="col-sm-5 content-div">
                        <h1>Want more Information?</h1>
                        <p>
                            Let's start your startup, grow and expand your business!
                        </p>
                    </div>
                    <div className="col-sm-4 btn-div">
                        <Link to="/contact-us">   <button className="btn text-uppercase get-a-quote">Contact us</button></Link>
                    </div>
                </div>
                <div className="footer-mid">
                    <div className="row footer-anchors">
                        <div className="col-sm-3">
                        </div>
                        <div className="col-sm-2">
                            <Link to="how-it-works">How it works</Link>
                        </div>
                        <div className="col-sm-2">
                            {
                                postajobs()
                            }

                        </div>
                        <div className="col-sm-2">
                            <a href="https://www.gohirenow.com/online-jobs/" target="_blank">Blog</a>
                        </div>
                        <div className="col-sm-3">
                        </div>
                    </div>
                    <div className="row footer-anchors">
                        <div className="col-sm-3">
                        </div>
                        <div className="col-sm-2">
                            {
                                isAuthenticated && user && user.userTypeId === 1 &&
                                <Link to="/pricing">Pricing</Link>
                            }
                            {
                                isAuthenticated && user && user.userTypeId === 2 &&
                                <p>Pricing</p>
                            }
                            {
                                !isAuthenticated &&
                                <Link to="/pricing">Pricing</Link>
                            }
                        </div>
                        <div className="col-sm-2">
                            {
                               getajobs()
                            }
                        </div>
                        <div className="col-sm-2">
                            <Link to="/contact-us">Contact us</Link>
                        </div>
                        <div className="col-sm-3">
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="row">
                        <div className="cont-center">
                            <hr />
                            <p>Copyright © 2020 - GoHireNow All Rights Reserved.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="cont-center">
                            <div className="footer-icon">
                                <a href="https://www.facebook.com/gohirenowcom" target="_blank" > <i className="fa fa-facebook" /> </a>
                                <a href="https://twitter.com/GoHireNow" target="_blank"><i className="fa fa-twitter" /> </a>
                                <a href="https://www.instagram.com/gohirenow/" target="_blank"><i className="fa fa-instagram" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps,{setUserType})(withRouter(Footer));