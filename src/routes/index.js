import React, { Component } from "react";
import { Route, Switch} from "react-router-dom";
import PrivateRoute from "./privateRoute";
import HomeContainer from "../containers/home/index";
import NewHomeContainer from "../containers/home/new-home-template";
import HowItWorkContainer from "../containers/howItWork/index";
import RegisterContainer from "../containers/auth/register/index";
import ResetContainer from "../containers/auth/forgotPass";
import SignInContainer from "../containers/auth/signIn/index";
import ContactUsContainer from "../containers/contact/index";
import PaymentContainer from "../containers/payment/index";
import ChangeContainer from "../containers/auth/changePass/index";
import ResetConfirmContainer from "../containers/auth/resetConfirm/index";
import PricingContainer from "../containers/pricing/index";
import PurchasedContainer from "../containers/purchase/index";
import PurchaseFreeWelcome from "../containers/purchase/free-purchased";
import BillingContainer from "../containers/billing/index";
import MessagesContainer from "../containers/messages/index";
import CompleteProfileContainer from "../containers/profiles/completeProfile/index";
import CompanyProfile from '../containers/profiles/clientProfile/index';
import CompanyProfileview from '../containers/profiles/client-profile/index';
import FreelancerProfileContainer from "../containers/profiles/freelancerProfile/index";
import FreelancerProfileContainerview from "../containers/profiles/worker-profile/index";
import hireFreelancerProfileContainerview from "../containers/profiles/hire-worker-profile/index";
import FreelancerEditProfileContainer from "../containers/profiles/freelancerEditProfile/index";
import ClientEditProfileContainer from "../containers/profiles/clientEditProfile/index";
import DashBoard from "../containers/DashBoard/index";
import AccountSettingContainer from '../containers/accountSetting/index';
import PostJobContainer from '../containers/jobs/postJob/index';
import PostedJobContainer from '../containers/jobs/postedjob/index';
import AppliedJobContainer from '../containers/jobs/applied-on-job/index';
import editJobContainer from '../containers/jobs/editjob/index';
import DashboardWorkContainer from '../containers/DashBoardWork/index';
import Error404Container from '../containers/Error404/index';
import FollowWorkContainer from '../containers/followWork/index';
import JobDetailsHireContainer from '../containers/jobs/JobDetailsHire/index';
import JobDetailsWorkContainer from '../containers/jobs/JobDetailsWork/index';
import JobApplicationContainer from '../containers/jobs/jobApplication/index';
import FavoritesContainer from '../containers/favorites/index';
import SearchWorkContainer from '../containers/searchWork/index';
import SearchOfflineContainer from '../containers/searchWork/SearchOffline';
import hirepage from '../containers/searchWork/hirepage/index';
import jobpage from '../containers/searchWork/job/index';
import jobpagelist from '../containers/searchWork/joblist/index';
import hirepageworker from '../containers/searchWork/developerslist/index';
import PaymentWork from "../containers/payment/paymentwork";

class Routes extends Component {
    render() {
        return (
            <Switch>
                    <Route exact path="/" component={HomeContainer}  />
                    <Route exact path="/p/default.html" component={HomeContainer}  />
                    <Route exact path="/home" component={NewHomeContainer}  />
                    <Route exact path="/smallheader" component={NewHomeContainer}  />
                    <Route exact path="/how-it-works" component={HowItWorkContainer} />
                    <Route exact path="/register" component={RegisterContainer} />
                    <Route exact path="/register/:params" component={RegisterContainer} />
                    <PrivateRoute exact path='/dashboard' component={DashBoard} />
                    <PrivateRoute exact path="/dashboard-work" component={DashboardWorkContainer} />
                    <Route exact path="/sign-in" component={SignInContainer} />
                    <Route exact path="/contact-us" component={ContactUsContainer} />
                    <Route exact path="/payment-details" component={PaymentContainer} />
                    <Route exact path="/forget-password" component={ResetContainer} />
                    <Route  path="/reset-password" component={ChangeContainer} />
                    <Route  path="/payment-work" component={PaymentWork} />
                    <Route exact path="/pricing" component={PricingContainer} />
                    <PrivateRoute exact path="/purchased" component={PurchasedContainer} />
                    <PrivateRoute exact path="/purchased-free" component={PurchaseFreeWelcome} />
                    <PrivateRoute exact path="/billing" component={BillingContainer} />
                    <PrivateRoute exact path="/messages/" component={MessagesContainer} />
                    <PrivateRoute exact path="/messages/:id" component={MessagesContainer} />
                    <PrivateRoute exact path="/complete-profile" component={CompleteProfileContainer} />
                    <PrivateRoute exact path="/edit-profile" component={FreelancerEditProfileContainer} />
                    <PrivateRoute exact path="/profile-hire" component={CompanyProfile} />
                    <Route exact path="/client-profile/:id" component={CompanyProfileview} />
                    <PrivateRoute exact path="/profile-edit-client" component={ClientEditProfileContainer} />
                    <PrivateRoute exact path="/profile-work" component={FreelancerProfileContainer} />
                    <Route exact path="/work-profile/:id" component={FreelancerProfileContainerview} />
                    <PrivateRoute exact path="/account-setting" component={AccountSettingContainer} />
                    <PrivateRoute exact path="/post-job" component={PostJobContainer} />
                    <PrivateRoute exact path="/posted-job/:id" component={PostedJobContainer} />
                    <PrivateRoute exact path="/edit-job/:id" component={editJobContainer} />
                    <PrivateRoute exact path="/follow-work" component={FollowWorkContainer} />
                    <PrivateRoute exact path="/job-details-hire/:id" component={JobDetailsHireContainer} />
                    <PrivateRoute exact path="/job-details-work/:id" component={JobDetailsWorkContainer} />
                    <PrivateRoute exact path="/job-application" component={JobApplicationContainer} />
                    <PrivateRoute exact path="/job-applied/:id" component={AppliedJobContainer} />
                    <PrivateRoute exact path="/favorites" component={FavoritesContainer} />
                    <PrivateRoute exact path="/worker-profile" component={FavoritesContainer} />
                    <PrivateRoute exact path="/search-work" component={SearchWorkContainer} />
                    <Route exact path="/search-offline/:keyword" component={SearchOfflineContainer} />
                    <Route exact path="/hire-virtual-assistant" component={hirepage} />
                    <Route exact path="/hire-virtual-assistant/:category/:id" component={hirepageworker} />
                    <Route exact path="/:combine/:category/:country/:name/:id" component={hireFreelancerProfileContainerview} />
                    <Route exact path="/job" component={jobpage} />
                    <Route exact path="/job/:category/:id" component={jobpagelist} />
                    <Route exact path="/job/:category/:title/:country/:name/:id" component={JobDetailsWorkContainer} />
                    <Route component={Error404Container} />
            </Switch>
        );
    }
}
export default Routes;
