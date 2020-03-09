import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from '../alerts/actions';
import { getPlanList } from './actions';
import TrustedCompany from "../../components/trustedcompany/index";
import Spinner from '../../components/spinner/index';
import store from '../../store/configureStore';
import {getTransactionDetails,getSubscriptionDetails} from '../billing/actions'

import MetaTags from 'react-meta-tags';

import {apiPath} from '../../services/config';
import axios from "axios";


import {Helmet} from "react-helmet";
import MediaQuery from "react-responsive";

const Pricing = ({isAuthenticated, data, getPlanList, history, userStoreData, props,email, subscripiotnandtrans }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
        getPlanList();
        if(isAuthenticated){
            axios.get(`${apiPath}/client/subscription`).then((res)=>{
                if(res.data.subscriptionStatus){
                    switch (res.data.subscriptionStatus.planName.toLowerCase()){
                        case "free":
                            setButton(["CURRENT PLAN", "upgrade","upgrade","upgrade"]);
                            break;
                        case "starter":
                            setButton(["downgrade", "CURRENT PLAN","upgrade","upgrade"]);
                            break;
                        case "popular":
                            setButton(["downgrade", "downgrade","CURRENT PLAN","upgrade"]);
                            break;
                        case "business":
                            setButton(["downgrade", "downgrade","downgrade","CURRENT PLAN"]);
                            break;
                    }

                }
                else{
                    setButton(["CURRENT PLAN", "upgrade","upgrade","upgrade"]);
                }
            })
        }


    }, [getPlanList,getSubscriptionDetails]);
    const [formData, setFormData] = useState({

    });

    const [indexvalue, setIndexValue]=useState(2);
    const [buttons, setButton]=useState([]);


    const setplan = (plan,index) => {
            if (isAuthenticated && index !== 0) {
                localStorage.setItem("plan", index);
                history.push('/payment-details');
            }
            if (isAuthenticated && index === 0) {
                const formData = new FormData();
                formData.append( 'email', null );
                formData.append( 'stripeToken', null );
                formData.append( 'planId', data[index].accessId );
                axios.post(apiPath + "/payment/charge", formData).then((res)=>{
                    if( res ) {
                        store.dispatch(getTransactionDetails("formal"));
                        store.dispatch(getSubscriptionDetails());
                        history.push('/purchased-free');
                    }
                })
            }
            else if (!isAuthenticated) {
                localStorage.setItem("plan", index);
                history.push('/register');
            }

    }
    if(isAuthenticated){

    }

    return (

        <Fragment>
            <Helmet>
                <title>GoHireNow - Pricing</title>
                <meta property="og:title" content="GoHireNow" data-react-helmet="true"/>
                <meta property="og:site_name" content="GoHireNow" data-react-helmet="true"/>
                <meta property="og:image" content="images/Capture.PNG" data-react-helmet="true" />
                <meta property="og:type" content="text" data-react-helmet="true"/>
                <meta property="og:url" content="https://www.gohirenow.com" data-react-helmet="true"/>
                <meta  property="og:description"
                       content="Job posting is completely FREE. Browse through our applicants and candidates to find your next remote employee expert!"
                       data-react-helmet="true" />
            </Helmet>
            <div className={isAuthenticated ? "registration greybf" : "registration white"} id="pricing">
                <div className="container pt-3">
                    <div className="inner-div"  style={{padding:"50px 1px"}}>
                        <div className="row flex-column top-text">
                            <h2 className="text-center">Hire your experts today!</h2>
                        </div>
                        <div className="row cards-row pricing-cards">
                            {
                                data && data.length > 0 ? data.map((item, index) => {
                                    return (
                                        <div
                                            className={index===data.length-1 ? "price-card-mobile col-sm-3 pr-0":"price-card-mobile col-sm-3"} key={index}>
                                            <div className={indexvalue===index   ? "card notloggin" : "card"}>
                                                <div className="card-head">

                                                    <h1>{item.name}</h1>
                                                    <h4><span>${item.price}</span></h4>
                                                    <div className={indexvalue===index   ? "font-weight-bold white" : "font-weight-bold"}>{!!index ?  "per month (USD)" : <br/>}</div>
                                                </div>
                                                <div className={indexvalue===index ?"card-bot padding-diferent":"card-bot"}>
                                                    <table>
                                                        <tbody>
                                                        <tr>
                                                            <td>{item.jobPosts}</td>
                                                            <td>Active Job Posts</td>
                                                        </tr>
                                                        {index  === 0 ?
                                                            <tr>
                                                                <td>
                                                                    <i className="fa fa-close"
                                                                       style={{
                                                                           color:index  === 0? "red":"green"
                                                                       }}></i>
                                                                </td>
                                                                <td>2 Days Job Post Approval</td>
                                                            </tr>
                                                            : <tr>
                                                                <td>
                                                                    <i className="fa fa-check"
                                                                       style={{
                                                                           color:indexvalue===index? "white":"green"
                                                                       }}></i>

                                                                    {/*{ item.addFavorites }*/}
                                                                </td>
                                                                <td>Instant Job Post Approval</td>
                                                            </tr>}
                                                        <tr>
                                                            <td>{item.maxApplicants}</td>
                                                            <td>Max Applications Per Job</td>
                                                        </tr>
                                                        <tr>
                                                            <td>{item.maxContacts}</td>
                                                            <td>Monthly Max Contacts</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={indexvalue===index ? "":""}>
                                                                <i className="fa fa-check"
                                                                   style={{
                                                                       color:indexvalue===index? "white":"green"
                                                                   }}></i>

                                                                {/*{ item.addFavorites }*/}
                                                            </td>
                                                            <td>Favorites</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={indexvalue===index ? "":""}>
                                                                {
                                                                    index !==0 ?
                                                                        <i className="fa fa-check"
                                                                           style={{
                                                                               color:indexvalue===index? "white":"green"
                                                                           }}
                                                                        ></i>:
                                                                        <i className="fa fa-close" style={{
                                                                            color:indexvalue===index? "white":"red"
                                                                        }}></i>
                                                                }
                                                                {/*{item.viewApplicants}*/}
                                                            </td>
                                                            <td>Contact Workers</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={indexvalue===index ? "":""}>
                                                                {
                                                                    index!==0?
                                                                        <i className="fa fa-check"
                                                                           style={{
                                                                               color:indexvalue===index? "white":"green"
                                                                           }}></i>:
                                                                        <i className="fa fa-close"
                                                                           style={{
                                                                               color:"red"}}></i>
                                                                }
                                                                {/*{item.hire}*/}
                                                            </td>
                                                            <td>Hire Workers</td>
                                                        </tr>
                                                        {
                                                            index===2 || index===3 ?
                                                                <tr>
                                                                    <td>
                                                                        <i className="fa fa-check"
                                                                           style={{
                                                                               color:indexvalue===index? "white":"green"
                                                                           }}>
                                                                        </i>
                                                                    </td>
                                                                    <td>Dedicated account manager</td>
                                                                </tr>:""
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {
                                                    !isAuthenticated &&
                                                    <div className="card-btn job-post">
                                                        <button className="btn" onClick={() => setplan(item,index)}>
                                                            {index === 0 ? "Try for free" : "Choose"}
                                                        </button>
                                                    </div>
                                                }
                                                {
                                                    isAuthenticated &&
                                                    <div className="card-btn job-post">
                                                        <button className="btn" onClick={() => setplan(item,index)}
                                                         disabled={buttons[index] && buttons[index].toLowerCase()==="current plan"}
                                                        >
                                                            {buttons && buttons[index]}
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    )
                                }):<Spinner  />
                            }
                        </div>
                        <div className="row">
                            <div className="col-sm-12 pricing-bottom">
                                <p>No contracts. No commitments. No extra fees. No commissions. Cancel subscription anytime.</p>
                            </div>
                        </div>
                        <MediaQuery minDeviceWidth="768px">
                            <TrustedCompany />
                        </MediaQuery>
                    </div>
                    <MediaQuery maxDeviceWidth="767px">
                        <TrustedCompany />
                    </MediaQuery>
                </div>
            </div></Fragment>
    )
};
const mapStateToProps = ({ auth, pricing,billing }) => ({
    isAuthenticated: auth.isAuthenticated,
    data: pricing.planList,
    userStoreData:auth.user,
    email: auth.user && auth.user.email,
    subscripiotnandtrans: billing.subscripiotnandtrans
});

export default connect(
    mapStateToProps,
    { setAlert, getPlanList }
)(Pricing);