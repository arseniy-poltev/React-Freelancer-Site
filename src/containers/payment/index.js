import React, {Component} from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import Form from '../../components/paymentForm';
import axios from 'axios';
import {apiPath} from '../../services/config';
import {StripeProvider, Elements} from 'react-stripe-elements';
import PaymentWork from "./paymentwork/index"
import MediaQuery from "react-responsive";
import MetaTags from 'react-meta-tags';

class Payment extends Component {
    state={
        plan:"",
        data:{}
    };

    componentDidMount(){
        window.scrollTo(0, 0);
        if(!this.props.isAuthenticated){
            this.props.history.push("/sign-in")
        }
        axios.get(apiPath + "/lookup/plans-details").then(res=>{
            this.setState({data: res.data[localStorage.getItem("plan")]});
        });
    }

    render() {
        let {isAuthenticated}= this.props;
        let{ data} =this.state;
        return (
            <div className={isAuthenticated ? "registration greybf" : "registration white"} id="payment">
                {/*<MetaTags>*/}
                    {/*<title>GoHireNow</title>*/}
                    {/*<meta name="description" content="" />*/}
                {/*</MetaTags>*/}
              <div className="container pt-5 pb-5">
                <div className="inner-div">
                  <div className="row flex-column top-text ">
                    <h2 className="text-center">Payment Details</h2>
                    <p className="text-center">{ data && data.name}  -  <span>${data && data.price}/month</span></p>
                  </div>
                    <PaymentWork
                        userStoreData={this.props.user}
                        login={this.props.isAuthenticated}
                        planId={ data && data.accessId}
                        data={data}
                    />
                  {/*<StripeProvider apiKey="pk_test_9AgMfd62zgb7btbEUbesaOgd0027KYOm2t">*/}
                    {/*<Elements>*/}
                      {/*<Form*/}
                          {/*userStoreData={this.props.user}*/}
                          {/*login={this.props.isAuthenticated}*/}
                            {/*planId={ data && data.accessId}*/}
                      {/*/>*/}
                    {/*</Elements>*/}
                  {/*</StripeProvider>*/}
                </div>
              </div>
              <div className="container">
                <div className="row payment-images">
                    <MediaQuery maxDeviceWidth="767px">
                        <span className={'new-visa-img'}></span>
                        <span className={'master-img'}></span>
                        <span className={'axp-img'}></span>
                        <span className={'discover-img'}></span>
                        <span className={'mcafee-img'}></span>
                        <span className={'norton-img'}></span>
                    </MediaQuery>
                    <MediaQuery minDeviceWidth="768px">
                      <div className="col-sm-2">
                        <img src={require("../../assets/new-visa.png")} alt=""/>
                      </div>
                      <div className="col-sm-2">
                        <img src={require("../../assets/master.png")} alt=""/>
                      </div>
                      <div className="col-sm-2">
                        <img src={require("../../assets/axp.png")} alt=""/>
                      </div>
                      <div className="col-sm-2">
                        <img src={require("../../assets/discover.png")} alt=""/>
                      </div>
                      <div className="col-sm-2">
                        <img src={require("../../assets/mcafee.png")} alt=""/>
                      </div>
                      <div className="col-sm-2">
                        <img src={require("../../assets/norton.png")} alt=""/>
                      </div>
                    </MediaQuery>
                </div>
              </div>
            </div>
        )
    }
}

const mapStateToProps = ({ pricing,auth }) => {
  return {
    pricing,
      isAuthenticated:auth.isAuthenticated,
      user:auth.user
  };
};
export default connect(
  mapStateToProps,
  {  }
)(Payment);






