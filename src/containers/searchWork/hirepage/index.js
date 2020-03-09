import React, {Component} from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import axios from "axios";
import {apiPath} from '../../../services/config';

import workerpladce from '../../../assets/img_avatar.svg';

import queryString from 'query-string';

import Spinner from '../../../components/spinner';

import {setUserType} from '../../auth/actions';
import MediaQuery from "react-responsive";



class SearchWork extends Component {
    state={
    jobtitles:null
    };
    componentDidMount(){
        window.scroll(0,0);
        axios.get(apiPath+"/hire/job-titles").then((res)=>{
            this.setState({jobtitles: res.data})
        })
    }

    render() {
        let {jobtitles}=this.state;
        return (
            <div  id="hirepage">
                <div className="hire-want-section new-home2"  >
                    <div className="container">
                        <div className="row">
                            <div className="col-6 hire-page-header-inner" style={{paddingLeft: "0px", paddingRight: "0px"}}>
                                <MediaQuery minDeviceWidth="1200px">
                                    <div className="largetext1 new-text-h1">
                                        <h1 style={{ marginTop: "44px"}}>
                                            Find Top Virtual Assistants and Freelancers.
                                        </h1>
                                    </div>
                                </MediaQuery>
                                <MediaQuery maxDeviceWidth="1199px">
                                        <span className={'hire-page-header-text'}>
                                            Find Top Virtual Assistants and Freelancers.
                                        </span>
                                </MediaQuery>
                                <div className="hire-work-buttons  ">
                                    <button className="btn text-uppercase new-search-btn " onClick={()=> this.gotohire()}>POST A JOB</button>
                                </div>
                            </div>
                            <div className="col-6 pr-0">
                                <div className="voted-div-outer">
                                    <div className="voted-div">
                                        {/*<div>*/}
                                        {/*<div className="top">*/}
                                        {/*<p>VOTED</p>*/}
                                        {/*<h4>#1</h4>*/}
                                        {/*</div>*/}
                                        {/*<p>The leader in <br /> online jobs</p>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="as-seen-as" style={{ backgroundColor: "#333333"
                }}>
                    <div className="container-fluid d-flex justify-content-center">
                        <div className="row  black-back-header black-back" style={{
                            width:"88%",
                            padding: "25px 49px"
                        }}>
                            <h2 className="text-uppercase new-style-needed">as seen on</h2>
                            <div className="black-circle-adj">
                                <div>
                                    <img src={require("../../../assets/seen1.png")} alt="" />
                                </div>
                                <div>
                                    <img className='bottom-fixed' src={require("../../../assets/seen2.png")} alt="" />
                                </div>
                                <div>
                                    <img src={require("../../../assets/seen3.png")} alt="" />
                                </div>
                                <div>
                                    <img src={require("../../../assets/seen4.png")} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row align-pad " style={{
                        padding: "0% 0px 0% 15px"
                    }}>
                        <div className="col-md-12 pl-0">
                            <h2 className="text-center text-uppercase mb-0"
                                style={{
                                    padding: "4% 0px 3% 15px",
                                    fontWeight: "700",
                                    fontSize: "28px",
                                    fontFamily:"lato"
                                }}
                            >
                                Browse our virtual assistant by skills
                            </h2>
                            <h3
                                style={{
                                    padding: "0% 0px 4% 15px",
                                    fontSize: "22px",
                                    fontWeight: "500",
                                    lineHeight: "1.3"
                                }}
                                className="mb-0 text-center">
                               Hire top-quality freelancers and virtual assistants for your next project or startup.<br/>
                                &nbsp; Learn how you can save more than 82% on salaries. Get work done today!
                            </h3>
                        </div>
                    </div>
                    <div className="row mt-4">
                        {
                            jobtitles && jobtitles.map((item, index)=> {
                                return  (<div className="w-25 col-3 p-2 d-flex hirepage-job flex-column"  key={index} style={{
                                    fontSize:"17px"
                                }}>

                                    <a className="mt-2 mb-2" style={{fontSize:"18px"}}>{item.name.toUpperCase()}</a>
                                        {item.jobTitles && item.jobTitles.map((ite)=>{
                                            return <Link to={`/hire-virtual-assistant/${ite.friendlyUrl && ite.friendlyUrl.replace("/","").toLowerCase()}/${ite.id}`} >{ite.name}</Link>
                                        })}
                                </div>)
                            })
                        }
                        {
                            !jobtitles && <div className="m-5 w-100"><Spinner/></div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ main, jobs,auth,unreadCount }) => {
    return {
        loggedIn: main.loggedIn,
        userStoreData: main.userStoreData,
        jobs,
        user:auth.user,
        searchword:unreadCount.search
    };
};

const mapDispachToProps = dispatch => {
    return {
        dispatch: dispatch
    };
};
export default connect(
    mapStateToProps,
    {mapDispachToProps,setUserType}
)(SearchWork);



