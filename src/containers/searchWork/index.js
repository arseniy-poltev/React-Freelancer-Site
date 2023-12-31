import React, {Component} from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import axios from "axios";
import {apiPath} from '../../services/config';
import { Slider, Rail, Handles } from 'react-compound-slider'
import ReactTags from 'react-tag-autocomplete';
import workerpladce from '../../assets/img_avatar.svg';
import clientpladce from '../../assets/employer_icon.svg';
import Spinner from '../../components/spinner';
import {salaryTypes} from '../../utils/constants/SalaryTypes';
import {searchkey} from '../../components/header/action';
import store from '../../store/configureStore';
import Moment from "react-moment";
import { SliderRail, Handle } from "../../components/slider/components";
import { domain, defaultValues } from "../../utils/constants/Slider";
import queryString from 'query-string';
import { isMobile, isTablet, mobileVendor,} from "react-device-detect";
import Pagination from "../../utils/pagination";
import ReactDOM from "react-dom";
import MediaQuery from "react-responsive";
import MetaTags from 'react-meta-tags';
import TextParser from "../../utils/TextParser";


function query(tableData = "", startIndex = null, endIndex = null) {

    return tableData.length>0 && startIndex >=0 && endIndex >= 0 ? tableData.slice(startIndex, endIndex):tableData;
}
class SearchWork extends Component {
    state={
        rangevalues: ["", ""],
        countries:[],
        keyword:"",
        countryId:null,
        jobType:null,
        tags:[],
        jobSkills:[],
        allsearchclients:null,
        searchclients:null,
        search:true,
        searchloader:false,
        searchedkeyword:"",
        activejobs:true,
        expertsearch:true,
        skillssearchdash:false,
        searchedskils:[],
        startIndex: 0,
        endIndex: 10,
        page:1,
        // total:0
    }

    componentDidMount(){
        window.scroll(0,0);
        let {user}= this.props;
        let activejobs=true;
        const { props: { history: {location}}} = this;
        const currentUrl = queryString.parse(location.search);
        const { tagsQuery, searchQuery, selectorQuery, from, to, page } = currentUrl;
        const isCurrentUrlParameters = tagsQuery || searchQuery || selectorQuery || from || to || (page && page !=1) ;
        if(user && parseInt(user.userTypeId)===1 ){
            this.setState({activejobs:false});
            activejobs=false;
        }
        axios.get(`${apiPath}/lookup/countries`).then((res)=>{
            this.setState({countries:res.data});
        }).catch((err)=>{
        });
        let value=!!localStorage.getItem("keyword");
        if ( this.props.searchword !==""){
            this.setState({keyword:this.props.searchword,expertsearch:false});
            this.searchQuery(this.props.searchword);
        }
        else if(user && user.userTypeId===2 && this.props.searchword==="" && activejobs===true &&
            !isCurrentUrlParameters){
            let data= {
                Keyword: "",
                CountryId: this.state.countryId,
                WorkerTypeId:this.state.jobType,
                MinSalary:this.state.rangevalues[0],
                MaxSalary:this.state.rangevalues[1],
                page:this.state.page=== "false" ? 1:this.state.page
            }
            // this.searchQuery("",true);
            console.log("more on this qwer");
            axios.get(`${apiPath}/worker/search-jobs`,{
                params:data
            }).then((res)=>{

                    this.setState({
                        allsearchclients:res.data.jobs,
                        searchclients:query(res.data.jobs,this.state.startIndex, this.state.endIndex),total:res.data.totalJobs});
                    this.setState({search:true,searchloader:false});
                this.urlUpdate({page: 1});
            }).catch((err)=>{

            })
        }
        else if(user && user.userTypeId===1 && this.props.searchword==="" && activejobs===false &&
            !isCurrentUrlParameters && this.state.expertsearch===true){
            this.searchQuery("");
        }
    }

    componentWillReceiveProps(nextProps){
        if( nextProps.searchword!=="" && (nextProps.searchword != this.props.searchword)){
            this.setState({
                keyword: nextProps.searchword,
                jobType:null,
                tags:[],
                jobSkills:[],
                skillsArr: [],
                searchedSkills: '',
                rangevalues: ["", ""],
            }, () => {
                this.urlUpdate({searchInput: nextProps.searchword});
                this.searchQuery(nextProps.searchword)
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { props: { history: {location}, jobs: { suggestions } = {} }, state: {tags, keyword, jobType, searchedkeyword, rangevalues, startIndex, page: statePage} } = this;
        const { rangevalues: prevRangeValues } = prevState;
        const currentUrl = queryString.parse(location.search);
        const { tagsQuery, searchQuery, selectorQuery, from, to, page } = currentUrl;
        const urlHasProps = tagsQuery || searchQuery || selectorQuery || from || to || page;
        const isInitState = tags.length === 0 && keyword === "" && searchedkeyword === "" && !jobType && from != rangevalues[0] && to !=rangevalues[1] && from != prevRangeValues[0] && to != prevRangeValues[1] && startIndex == 0 && statePage == 1;
        const newState = {};
        if (urlHasProps && suggestions.length && isInitState) {
            if (tagsQuery) {
                const tagsArr = tagsQuery.split(',');
                const newTags = [];
                for (let i = 0; i < tagsArr.length; i++) {
                    newTags.push(suggestions.find(tag => tag.id === parseInt(tagsArr[i])))
                }
                newState.tags = newTags;
                newState.jobSkills = newTags;
                newState.skillsArr = newTags;
            }
            if (searchQuery) {
                newState.keyword = searchQuery;
            }
            if (selectorQuery) {
                newState.jobType = selectorQuery;
            }
            if (from) {
                newState.rangevalues = [from, rangevalues[1]]
            }
            if (to) {
                newState.rangevalues = from ? [from, to] : [rangevalues[0], to]
            }
            if ((page && page!=1) || (page && page == 1 && prevState.page && prevState.page !=1)) {
                newState.startIndex = page >= 1 ? (page - 1) * 10 : 0;
                newState.endIndex = page >= 2 ? page * 10 : 10;
                newState.page= parseInt(page);
                console.log("working on false of page", page, newState)
                // page !== false ? newState.page=page: newState.page=1;
            }
            Object.keys(newState).length != 0 && this.setState(newState, () =>this.searchQuery(searchQuery));
        }
    }

    componentWillUnmount(){
        localStorage.removeItem("keyword");
        localStorage.removeItem("jobskillsearch");
        localStorage.removeItem("browsesmiliar");
        store.dispatch(searchkey(""));
    }

    onvalue(e){
        const { target: { name, value } = {}} = e;
        if (name === 'keyword') {
            this.urlUpdate({ searchInput: value });
        }
        else if (name === 'jobType') {
            this.urlUpdate({availabilitySelector: value});
        }
        this.setState({ [name]:value });
    }

    handleChangeSelect(e){
        this.setState({countryId:e.target.value});
    }

    rangevalue = (rangevalues) => {
        this.setState({rangevalues: rangevalues}, () => this.urlUpdate({from: rangevalues[0], to: rangevalues[1]}));
    };

    onChangetag = e =>{
        // setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    handleDelete = (i) => {
        if(this.state.tags) {
            let newTags = [];
            this.state.tags.map((item,index)=>{
                if(index !== i){
                    newTags.push(item);
                }
            });
            this.urlUpdate({ tags: newTags });
            this.setState({ tags:newTags,jobSkills:newTags,skillsArr:newTags });
            // setFormData({...formData,jobSkills: newTags})
        }
    };
    handleAddition = (tag) => {
        let {tags}=this.state;
        // let tagz=[tags];
        let tager=[...tags,tag];

        if(tag){
            this.urlUpdate({ tags: tager });
            this.setState({ tags: tager, jobSkills: tager,skillsArr:tager });
        }
    };
    urlUpdate(params) {
        console.log("more on this");
        const { tags, searchInput, availabilitySelector, from, to, page } = params;
        const { props: { history } } = this;
        const { location } = history;
        const currentUrl = queryString.parse(location.search);
        if (params.hasOwnProperty('tags')) {
            tags.length > 0 ? currentUrl.tagsQuery = tags.map(tag => tag.id).toString() : delete currentUrl.tagsQuery;
        }
        if (params.hasOwnProperty('searchInput')) {
            searchInput ? currentUrl.searchQuery = searchInput : delete currentUrl.searchQuery;
        }
        if (params.hasOwnProperty('availabilitySelector')) {
            availabilitySelector ? currentUrl.selectorQuery = availabilitySelector : delete currentUrl.selectorQuery;
        }
        if (params.hasOwnProperty('from')) {
            from ? currentUrl.from = from : delete currentUrl.from;
        }
        if (params.hasOwnProperty('to')) {
            to ? currentUrl.to = to : delete currentUrl.to;
        }
        if (params.hasOwnProperty('page')) {
            page !== false  ? currentUrl.page = page : delete currentUrl.page;
        }
        history.push({
            search: "?" + new URLSearchParams(currentUrl)
        });
    }
    searchdashseid=(id)=>{
        this.setState({activejobs:false});
        let searchParams = {keyword: this.state.keyword, tagsNames: ''};
        if(this.props.user && parseInt(this.props.user.userTypeId) ===2){
            this.setState({search:false,searchloader:true})
            let SkillIds=[];
            SkillIds.push(id);
            let data= {
                Keyword: this.state.keyword,
                CountryId: this.state.countryId,
                WorkerTypeId:this.state.jobType,
                MinSalary:this.state.rangevalues[0],
                MaxSalary:this.state.rangevalues[1],
                SkillIds: SkillIds.join(",")
            }
            //worker/search-jobs
            axios.get(`${apiPath}/worker/search-jobs`,{
                params:data
            }).then((res)=>{
                this.setState({
                    allsearchclients:res.data.jobs,
                    searchclients:query(res.data.jobs,this.state.startIndex, this.state.endIndex)});
                this.updateSearchResultsQuery(searchParams);
            }).catch((err)=>{

            })
        }
    }

    searchQuery=(keyword, isManualSearch)=>{
    let searchParams = {keyword, tagsNames: ''};


        const newState = {searchedkeyword:this.state.keyword};
        this.setState({searchedskils:[]})
        if (isManualSearch){
            newState.keywordQuery = false;
            this.urlUpdate({keywordQuery: false, page: 1});
            this.setState({activejobs:false});
        }
        this.setState(newState);
        if(this.props.user && this.props.user.userTypeId ===1){
            this.setState({search:false,searchloader:true})
            let SkillIds=[];
            this.state.jobSkills.map((item)=>{
                SkillIds.push(item.id&&item.id);
                searchParams.tagsNames += item.name + ",";
            });
            this.setState({searchedskils:[...this.state.jobSkills]})
            let params= {
                Keyword: keyword,
                CountryId: this.state.countryId,
                WorkerTypeId:this.state.jobType,
                MinSalary:this.state.rangevalues[0],
                MaxSalary:this.state.rangevalues[1],
                SkillIds: SkillIds.join(","),
                page:this.state.page !== "false" ? this.state.page:1
            };
            //worker/search-jobs
            axios.get(`${apiPath}/client/search-workers`,{ params:params }).then
            ((res)=>{
                let data=res.data.workers && res.data.workers;
                this.setState({
                    allsearchclients:data,
                    searchclients:query(res.data.workers,this.state.startIndex, this.state.endIndex),
                    total:res.data.totalWorkers});
                this.updateSearchResultsQuery(searchParams);
                if (isManualSearch && (isMobile || isTablet)) {
                    const resultsNode = ReactDOM.findDOMNode(this.refs.results);
                    window.scroll(0, resultsNode.offsetTop);
                }
            })
        }
        else if(this.props.user && parseInt(this.props.user.userTypeId) ===2){
            this.setState({search:false,searchloader:true})
            let SkillIds=[];
            this.state.jobSkills.map((item)=>{
                SkillIds.push(item.id&&item.id);
                searchParams.tagsNames += ` ${item.name},`;
            })
            let data= {
                Keyword: keyword,
                CountryId: this.state.countryId,
                WorkerTypeId:this.state.jobType,
                MinSalary:this.state.rangevalues[0],
                MaxSalary:this.state.rangevalues[1],
                SkillIds: SkillIds.join(","),
                page:this.state.page=== "false" ? 1:this.state.page
            }
            //worker/search-jobs
            if(localStorage.getItem("browsesmiliar")){
                axios.get(`${apiPath}/worker/similar-jobs/${SkillIds.join(",").toString()}`).then((res)=>{
                    if (isMobile || isTablet) {
                        const resultsNode = ReactDOM.findDOMNode(this.refs.results);
                        window.scroll(0, resultsNode.offsetTop);
                    }
                    this.setState({allsearchclients:res.data, searchclients:query(res.data,this.state.startIndex, this.state.endIndex)});
                    this.updateSearchResultsQuery(searchParams);
                })
            }
            else{
                console.log("more on this");
                axios.get(`${apiPath}/worker/search-jobs`,{
                    params:data
                }).then((res)=>{
                    if (isMobile || isTablet) {
                        const resultsNode = ReactDOM.findDOMNode(this.refs.results);
                        window.scroll(0, resultsNode.offsetTop);
                    }
                    this.setState({
                        allsearchclients:res.data.jobs,
                        searchclients:query(res.data.jobs,this.state.startIndex, this.state.endIndex),total:res.data.totalJobs});
                    this.updateSearchResultsQuery(searchParams);
                })
            }
        }
    }

    localdate (date) {
        if (mobileVendor == "Apple") {
            return date
        } else {
            return new Date(
                date.getTime() - date.getTimezoneOffset() * 60 * 1000
            );
        }
    }

    gotoprofile (item,check) {

        let {user}=this.props;
        if(user && parseInt(user.userTypeId)===1 ){
            if(check==="picture"){
                localStorage.setItem("profileId",item.userId);
            }
            if(check==="name"){
                localStorage.setItem("profileId",item.userId);
            }
        }
        else if(user && parseInt(user.userTypeId)===2 ){
            if(check==="picture"){
                localStorage.setItem("profileId", item.client.id);
            }
        }
    }

    updateSearchResultsQuery = ( params ) => {

        const { keyword, tagsNames } = params;
        this.setState({
            search:true,
            searchloader:false,
            searchedkeyword:keyword || "",
            searchedSkills: tagsNames[tagsNames.length -1] === ',' ? tagsNames.slice(0, -1) : tagsNames
        })
    };

    handleChangePage=(startIndex, endIndex, currentPage) => {
        console.log("handle chanfe")
        const tesNode = ReactDOM.findDOMNode(this.refs.results);
        if (!isTablet && !isMobile) {
            window.scrollTo(0, tesNode.offsetTop - 20);
        }
        else {
            window.scrollTo(0, tesNode.offsetTop + 10);
        }
        this.setState({ startIndex:  startIndex, endIndex: endIndex,page: currentPage!=="false" ? currentPage:1
        }, () => {
            this.urlUpdate({page: currentPage!=="false" ? currentPage:1});
            this.searchQuery(this.state.keyword);
        });
    };

    render() {


        let{dispatch, loggedIn, user, history: {location}}= this.props;
        let {countries,search,searchloader,searchedkeyword,activejobs, searchedSkills, rangevalues}= this.state;
        let placeholder=user && user.userTypeId===1 ? workerpladce :clientpladce;
        let pager=queryString.parse(location.search).page;
        const currentPage =  pager !== "false" ? pager :1;
        return (
            <div  id="search">
                <MetaTags>
                    <title>GoHireNow - Hire Top‑Quality Virtual Assistants</title>
                </MetaTags>
                <div className="container pl-0 " >
                    <div className="row align-pad ">
                        <div className="col-md-12 pl-0">
                            <h2>Search</h2>
                        </div>
                    </div>
                    <div className="row" ref="test">
                        <div className="col-md-4  ">
                            <div className="left-side">
                                <h4>FIND
                                    {user &&
                                    user.userTypeId ===1? " AN EXPERT": " A JOB"
                                    }
                                </h4>
                                <div className="search">
                                    <input type="text" name="keyword" onChange={(e)=> this.onvalue(e)}
                                           value={this.state.keyword} placeholder="Keyword" />
                                    <i className="fa fa-search" />
                                </div>
                                <ReactTags
                                    name="jobSkills"
                                    placeholder="Skills"
                                    onChange={e => this.onChangetag(e)}
                                    tags={this.state.tags}
                                    suggestions={this.props.jobs && this.props.jobs.suggestions}
                                    handleDelete={this.handleDelete.bind(this)}
                                    handleAddition={this.handleAddition.bind(this)}
                                    allowBackspace={false}
                                    autofocus={false}
                                />
                                <select name="jobType" onChange={(e)=> this.onvalue(e)}>
                                    <option value="">Availability</option>
                                    <option selected={this.state.jobType === "1"} value="1">Full-time</option>
                                    <option selected={this.state.jobType === "2"} value="2">Part-time</option>
                                    <option selected={this.state.jobType === "3"} value="3">Freelance</option>
                                </select>
                                {
                                    parseInt(this.props.user.userTypeId)===1 &&
                                    <div className='range-div'>
                                        <p className="ml-4">Monthly Salary (USD)</p>
                                        <Slider
                                            mode={1}
                                            step={1}
                                            domain={domain}
                                            className='slider-ghn'
                                            onUpdate={this.rangevalue}
                                            onChange={this.rangevalue}
                                            values={rangevalues[0] || rangevalues[1] ? [rangevalues[0], rangevalues[1]] : defaultValues}
                                        >
                                            <Rail>
                                                {({ getRailProps }) =>
                                                    <SliderRail getRailProps={getRailProps} />
                                                }
                                            </Rail>
                                            <Handles>
                                                {({ handles, activeHandleID, getHandleProps }) => (
                                                    <div className="slider-handles">
                                                        {handles.map(handle => (
                                                            <Handle
                                                                key={handle.id}
                                                                handle={handle}
                                                                domain={domain}
                                                                isActive={handle.id === activeHandleID}
                                                                getHandleProps={getHandleProps}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </Handles>
                                        </Slider>
                                        <p>${this.state.rangevalues[0] || 0}
                                            <span>${typeof this.state.rangevalues[1] === 'number' ? this.state.rangevalues[1] : '2000+'}
                                                {this.state.rangevalues[1] && parseInt(this.state.rangevalues[1])===2000 && "+"}
                                     </span></p>
                                    </div>
                                }

                                <button  onClick={()=>{
                                    this.setState({ expertsearch:false });
                                    this.searchQuery(this.state.keyword, true)
                                }} className="btn text-uppercase button"
                                         disabled={
                                             this.state.keyword === "" && this.state.jobSkills.length === 0&&
                                             !this.state.rangevalues[1] && !this.state.jobType
                                         }
                                >{search ? "Search": <Spinner/>}</button>
                                <p className="">
                                    {/*3829 jobs posted the past 30 days.*/}
                                </p>
                            </div>
                        </div>
                        <div ref="results" className="col-md-8 pr-0">
                            <div className="right-side" style={{
                                minHeight: "532px"
                            }}>
                                <div className="top">
                                    {searchedkeyword==="" && activejobs && user && parseInt(user.userTypeId) ===2 &&
                                    <h2>Recent Jobs</h2>
                                    }
                                    {
                                        (searchedkeyword || searchedSkills) &&
                                        <h2>Search Results for {searchedkeyword ? `'${searchedkeyword}'` : ''}
                                            {searchedSkills ? (searchedkeyword ? `, with skills: ${searchedSkills}` : `skills: ${searchedSkills}`) : ''}</h2>
                                    }
                                    {
                                        user && user.userTypeId===1 && this.props.searchword==="" && !this.state.keyword && this.state.activejobs===false &&
                                        this.state.expertsearch===true && this.state.searchedskils.length===0 &&
                                        this.state.skillssearchdash === false &&
                                        <h2>Expert candidates</h2>
                                    }
                                </div>
                                {
                                    searchloader &&
                                    <div className="whole-div">
                                        <Spinner/>
                                    </div>
                                }
                                {
                                    !searchloader && this.state.allsearchclients !== null && parseInt(this.state.allsearchclients.length) === 0 &&
                                    <div className="whole-div">
                                        There are no results for your search
                                    </div>
                                }
                                {
                                    !searchloader && this.state.allsearchclients !== null && this.state.allsearchclients.length >0 &&
                                    // query(,this.state.startIndex,this.state.endIndex)
                                    this.state.allsearchclients.map((item,index)=>{
                                        return(
                                            [<MediaQuery maxDeviceWidth="767px">
                                                {parseInt(user.userTypeId)===2 &&
                                                <div className="whole-div-new-worker" key={index}>
                                                    <Link to={parseInt(user.userTypeId)===1 ? `/work-profile/${item.userId}` : `/job-details-work/${item.id}`}>
                                                        <div onClick={()=>this.gotoprofile(
                                                            item,"picture")} className="img-div">
                                                            <img src={
                                                                item.client ? item.client.profilePicturePath
                                                                    ? item.client.profilePicturePath:placeholder:
                                                                    item.profilePicturePath?item.profilePicturePath: placeholder
                                                            }
                                                                 alt=""
                                                            />
                                                        </div>
                                                    </Link>
                                                    <div className="info">
                                                        <div className={`first-div`}>
                                                            <div className="content">
                                                                <Link to={`/job-details-work/${item.id}`}>
                                                                    <p style={{color: 'black'}} onClick={()=>this.gotoprofile(item,"title")}
                                                                       className={this.props.user && this.props.user.userTypeId===2 ? "pointer b-900":"pointer "}
                                                                    ><TextParser text={item.title}/></p>
                                                                </Link>
                                                            </div>
                                                            {user && user.userTypeId===2 &&
                                                            <Link to={`/job-details-work/${item.id}`}>
                                                                <p className={`client-title-search`}>
                                                                    {item.client.companyName}
                                                                </p>
                                                            </Link>
                                                            }
                                                            <p className={`skills`}>
                                                                {
                                                                    item.skills.map((ite, index)=>{
                                                                        return item.skills.length-1 !== index ? ite.name+", ":
                                                                            ite.name
                                                                    })
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className={`second-div`}>
                                                            {
                                                                item.salary && item.salary !== "Salary/Month (USD)" &&
                                                                <h4>
                                                                    ${item.salary}
                                                                    {item.salary==="2000" && "+"}/{
                                                                    user && user.userTypeId===2 ?
                                                                        salaryTypes[item.salaryTypeId - 1].name.toLowerCase().replace("ly",""):
                                                                        "month"}
                                                                </h4>
                                                            }
                                                            <p>
                                                                {   item.availability? parseInt(item.availability)!==0 &&item.availability :
                                                                    item.type
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                {parseInt(user.userTypeId) === 1 && item.title &&
                                                <div className="whole-div-new" key={index}>
                                                    <div className="first-new">
                                                        <Link to={parseInt(user.userTypeId)===1 ? `/work-profile/${item.userId}` : `/job-details-work/${item.id}`}>
                                                            <div onClick={()=>this.gotoprofile(
                                                                item,"picture")} className="ava-div-new">
                                                                <img src={
                                                                    item.client ? item.client.profilePicturePath
                                                                        ? item.client.profilePicturePath:placeholder:
                                                                        item.profilePicturePath?item.profilePicturePath: placeholder} alt=""/>
                                                            </div>
                                                        </Link>
                                                        <div className="content-new">
                                                            <div className="content-name">
                                                                <Link to={`/work-profile/${item.userId}`}>
                                                                    <h4 onClick={()=>this.gotoprofile(item,"name")} className="pointer">
                                                                        {item.name && item.name}
                                                                    </h4>
                                                                </Link>
                                                                {parseInt(user.userTypeId)===2 ?
                                                                    <Link to={`/job-details-work/${item.id}`}>
                                                                        <p style={{color: 'black'}} onClick={()=>this.gotoprofile(item,"title")}
                                                                           className={this.props.user && this.props.user.userTypeId===2 ? "pointer b-900":"pointer "}
                                                                        ><TextParser text={item.title}/></p>
                                                                    </Link>
                                                                    :
                                                                    <p style={{color: 'black'}} className={this.props.user && this.props.user.userTypeId===2 ? "b-900":""}
                                                                    ><TextParser text={item.title}/></p>
                                                                }
                                                            </div>
                                                            <div className="salary-new">
                                                                {
                                                                    item.salary && item.salary !== "Salary/Month (USD)" &&
                                                                    <h4>${item.salary}
                                                                        {item.salary==="2000" && "+"}/{
                                                                            user && user.userTypeId===2?
                                                                                salaryTypes[item.salaryTypeId-1].name.toLowerCase().replace("ly",""):
                                                                                "month"
                                                                        }
                                                                    </h4>
                                                                }
                                                                <p>
                                                                    {   item.availability? parseInt(item.availability)!==0 &&item.availability :
                                                                        item.type
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="second-new">
                                                        <p>
                                                            {
                                                                item.skills.map((ite, index)=>{
                                                                    return item.skills.length-1 !== index ? ite.name+", ":
                                                                        ite.name
                                                                })
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="last-new">
                                                        {
                                                            this.props.user && parseInt(this.props.user.userTypeId) ===1 &&
                                                            item.lastLoginDate !== null &&
                                                            <p>
                                                                Last logged:&nbsp;
                                                                <Moment fromNow ago>
                                                                    { this.localdate(new Date(item.lastLoginDate))}
                                                                </Moment> ago
                                                            </p>
                                                        }
                                                    </div>
                                                </div>
                                                }
                                            </MediaQuery>,
                                                <MediaQuery minDeviceWidth="768px">
                                                    <div className="whole-div" key={index}>
                                                        <div className="first">
                                                            <Link to={parseInt(user.userTypeId)===1 ? `/work-profile/${item.userId}` : `/job-details-work/${item.id}`}>
                                                                <div onClick={()=>this.gotoprofile(
                                                                    item,"picture")} className="img-div pointer">
                                                                    <img src={
                                                                        item.client ? item.client.profilePicturePath
                                                                            ? item.client.profilePicturePath:placeholder:
                                                                            item.profilePicturePath?item.profilePicturePath: placeholder} alt=""/>
                                                                </div>
                                                            </Link>
                                                            <div className="content">
                                                                <Link to={`/work-profile/${item.userId}`}>
                                                                    <h4 onClick={()=>this.gotoprofile(item,"name")} className="pointer">
                                                                        {item.name && item.name}
                                                                    </h4>
                                                                </Link>
                                                                {parseInt(user.userTypeId)===2 ?
                                                                    <Link to={`/job-details-work/${item.id}`}>
                                                                        <p style={{color: 'black'}} onClick={()=>this.gotoprofile(item,"title")}
                                                                           className={this.props.user && this.props.user.userTypeId===2 ? "pointer b-900":"pointer "}
                                                                        ><TextParser text={item.title}/></p>
                                                                    </Link>
                                                                    :
                                                                    <p style={{color: 'black'}} className={this.props.user && this.props.user.userTypeId===2 ? "b-900":""}
                                                                    ><TextParser text={item.title}/></p>
                                                                }
                                                                {user && user.userTypeId === 2 &&
                                                                <Link to={`/job-details-work/${item.id}`}>
                                                                    <p className={`client-title-search`}>
                                                                        {item.client.companyName}
                                                                    </p>
                                                                </Link>
                                                                }
                                                                <p>
                                                                    {
                                                                        item.skills.map((ite, index)=>{
                                                                            return item.skills.length-1 !== index ? ite.name+", ":
                                                                                ite.name
                                                                        })
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="second">
                                                            {
                                                                item.salary && item.salary !== "Salary/Month (USD)" &&
                                                                <h4>
                                                                    ${item.salary}
                                                                    {item.salary==="2000" && "+"}/{
                                                                    user && user.userTypeId===2?
                                                                        salaryTypes[item.salaryTypeId-1].name.toLowerCase().replace("ly",""):
                                                                        "month"
                                                                }
                                                                </h4>
                                                            }
                                                            <p>
                                                                {   item.availability? parseInt(item.availability)!==0 &&item.availability :
                                                                    item.type
                                                                }
                                                            </p>
                                                            {
                                                                this.props.user && parseInt(this.props.user.userTypeId) ===1 &&
                                                                item.lastLoginDate !== null &&
                                                                <p>
                                                                    <Moment fromNow ago>
                                                                        { this.localdate(new Date(item.lastLoginDate))}
                                                                    </Moment> ago
                                                                </p>
                                                            }
                                                        </div>
                                                    </div>
                                                </MediaQuery>
                                            ]
                                        )
                                    })
                                }
                            </div>
                            {
                                this.state.allsearchclients !== null &&
                                <Pagination
                                    forcedPage={parseInt(currentPage!=="false" ? currentPage:1)}
                                    pageSize={10}
                                    countItems={
                                        this.state.total!== null ? this.state.total:
                                            []
                                    }
                                    onChangePage={this.handleChangePage.bind(this)}
                                />
                            }


                        </div>
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
    mapDispachToProps
)(SearchWork);
