import React, { Fragment, Component } from 'react';
import Routes from "./routes/index";
import Header from "./components/header/index";
import Footer from "./components/footer/index";
import Alerts from './containers/alerts/index';
import store from './store/configureStore';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './containers/auth/actions';
import { getTransactionDetails , getSubscriptionDetails } from './containers/billing/actions';
import { logout } from './containers/auth/actions';
import {getSkills} from './containers/jobs/actions';
import {getProfileInfo} from './containers/accountSetting/actions';
import ReactGA from "react-ga";
import Spinner from './components/spinner/index';
import ReactPixel from 'react-facebook-pixel';
import { connect } from "react-redux";
import IdleTimer from 'react-idle-timer';
import axios from "axios";
import {apiPath} from './services/config';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends Component {

    constructor(props) {
        super(props)
        this.idleTimer = null
        this.onAction = this._onAction.bind(this)
        this.onActive = this._onActive.bind(this)
        this.onIdle = this._onIdle.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { isAuthenticated, profile, user, history } = this.props;
        const { isAuthenticated: prevIsAuthenticated, profile: prevProfile } = prevProps;
        if (isAuthenticated && !prevIsAuthenticated) {
            this.initFunction();
        }
        const isWorker = user && user.userTypeId == 2;
        if (isWorker && (profile != prevProfile)) {
            if (profile && !profile.title && !profile.profilePicturePath && (!profile.skills || !profile.skills.length)) {
                history.push('/edit-profile')
            }
        }
    }

    componentWillMount() {
        const { isAuthenticated } = this.props;
        ReactGA.initialize('UA-144720137-1');
        ReactPixel.init('434854470536025');
        ReactPixel.pageView();
        if(isAuthenticated) {
            this.initFunction();
        }
    }

    initFunction = () => {
        const { user } = this.props;
        if(user && parseInt(user.userTypeId)=== 1){
            store.dispatch(getTransactionDetails("formal"));
            store.dispatch(getSubscriptionDetails());
        }
        store.dispatch(loadUser());
        store.dispatch(getSkills());
        store.dispatch(getProfileInfo(1));
    }
    _onAction(e) {
        // console.log('user did something', e)
    }

    _onActive(e) {
        // console.log('user is active',)
        // console.log('time remaining',)
        const { isAuthenticated } = this.props;
        if(isAuthenticated ){
            axios.get(`${apiPath}/account/update-login-time`).then((res)=>{
            }).catch((err)=>{
            })
            // store.dispatch(logout());
        }
    }

    _onIdle(e) {
        // console.log('user is idle')
        // console.log('last active')
        const { isAuthenticated } = this.props;
        // if(isAuthenticated ){
            // axios.get(`${apiPath}/account/update-login-time`).then((res)=>{
            // }).catch((err)=>{
            // })
            // store.dispatch(logout());
        // }
    }


    render() {
          return (
              <Fragment>
                  <div className="overallsectionsdiv">
                      <IdleTimer
                          ref={ref => { this.idleTimer = ref }}
                          element={document}
                          onActive={this.onActive}
                          onIdle={this.onIdle}
                          onAction={this.onAction}
                          debounce={250}
                          timeout={1000 * 60 * 60} />
                      <Header/>
                      <Routes/>
                      <Footer/>
                  </div>
              </Fragment>
          );
      }
  }
const mapStateToProps = ({ auth, account }) => {
    return {
        user:auth.user,
        isAuthenticated:auth.isAuthenticated,
        profile: account.profile,
    };
};

export default connect(
    mapStateToProps,
    {  }
)(App);