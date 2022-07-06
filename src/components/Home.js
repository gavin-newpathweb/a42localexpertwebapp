/* eslint-disable */
import React from "react";
import logo from '../logo.svg';
// import './App.css';
import '../assets/css/style.css';
import  Header  from './Header'
import Footer from './Footer';
import LoadingSpinner from './Loadingspinner'
import {baseUrl, defaultImages, ErrorMsgs, baseUrlSave} from './constant'
import {getAllServiceList, getAllServiceProviderList, savewebappdata} from '../services/api/apiservices'
import srImage from '../assets/images/user.jpg';
import findExpertImg  from '../assets/images/find-expert.svg'
window.$payload = {}
function Home() {

   
  
const currentDate = new Date();
let cdate = currentDate.getFullYear()+'-'+((currentDate.getMonth()+1) < 10 ? '0'+(currentDate.getMonth()+1) : (currentDate.getMonth()+1))
            +'-'+((currentDate.getDate() < 10) ? '0'+(currentDate.getDate()) : currentDate.getDate());  

// console.log(cdate.toString())

    const [currentStep, setCurrentStep] = React.useState(1);
    const [successMsg, setSuccess] = React.useState('');
    const [errorMsg, setError] = React.useState([]);

    
    //For step1
    const [postcode, setPostcode] = React.useState('');
    const [servicedate, setServicedate] = React.useState(cdate.toString());
    const [service_type, setServicetype] = React.useState('');

    //for step2
    const [service, setService] = React.useState('');
    const [sverror, setErrorService] = React.useState('');
    const [svisLoaded, setsvIsLoaded] = React.useState(false);
    const [svitems, setsvItems] = React.useState([]);

    //for step3
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [contact, setContact] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAdderss] = React.useState('');
    const [suburb, setSuburb] = React.useState('');
    const [s_state, setS_state] = React.useState('');
    const [jobdetails, setJobdetails] = React.useState('');

    //for step4
    const [providerList, setProviderList] = React.useState([]);
    const [service_provider, setServiceProvider] = React.useState('');
    const [service_provider_name, setServiceProviderName] = React.useState('');
    const [startTime, setStarttime] = React.useState('');
    const [endTime, setEndtime] = React.useState('');
    const [arrivalTime, setArrivaltime] = React.useState('');
    const [showDiv, setShowDiv] = React.useState({});

    const [srerror, setServiceError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [items, setItems] = React.useState([]);

    const toggleHide = index => {
        setShowDiv({ ...showDiv, [index]: !showDiv[index] });
    };


    const getServiceList = async () => {
        setsvIsLoaded(true)
        const servicelist = await getAllServiceList();
        if(servicelist.error){
            setsvIsLoaded(false);
        }else{
            setsvIsLoaded(false);
            setsvItems(servicelist.data);
        }
    }

    
    const validateStep1 = () => {
        let flag = true;
        let regexpostcode = /^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/
        if(postcode == ''){
            setError({postcode : ErrorMsgs.firstStep.postcode});
            flag = false;
        }else if(!regexpostcode.test(postcode)){
            setError({postcode : ErrorMsgs.firstStep.postcodeValid});
            flag = false;
        }else if(servicedate == ''){
            setError({servicedate : ErrorMsgs.firstStep.servicedate});
            flag = false;
        }else if(service_type == ''){
            setError({servicetype : ErrorMsgs.firstStep.serviceType});
            flag = false;
        }else{
            flag = true;
        }

        if(flag){
            let payload1 = {
                postcode:postcode,
                servicedate: new Date(servicedate).toISOString(),
                service_type: service_type,
            }
            window.$payload = payload1
            
            getServiceList();
            gotoNext(2);
        }
    }


    const getServiceProviderList = async () => {
        setIsLoaded(true)
        let sdate = new Date(servicedate).toISOString();

        let payl = {
            PostalCode:postcode,
            Service:service,
            fromdate:sdate,
            todate:sdate
        }

        const resp = await getAllServiceProviderList(JSON.stringify(payl));
        if(resp.error){
            setIsLoaded(false)
        }else{
            setIsLoaded(false)
            let sdata = resp.data;
            if(sdata && sdata.TimeSlots && sdata.TimeSlots.length > 0){
                
                // setItems(data.TimeSlots);
                let cnt = 0
                let getAvail = []
                let grouping = [];
                
                if(sdata.TimeSlots.length > 0){
                    sdata.TimeSlots.map((e,i) => {
                        if(e.Type===0){
                            cnt = cnt+1;
                            getAvail.push(e);
                        }
                    });
                }
                
                if(getAvail.length > 0){
                    
                   
                    let duplicate = [];
                    getAvail.map((e,i) => {
                        if(duplicate.indexOf(e.Resource.Resource.bookableresource) ===-1){
                            duplicate.push(e.Resource.Resource.bookableresource);
                            // if(duplicate.length>0){
                                getAvail[i]['serviceTime'] = [{
                                    starttime : e.StartTime,
                                    endtime : e.EndTime,
                                    arrivaltime : e.ArrivalTime
                                }]
                            // }
                            
                        }else{
                            getAvail[duplicate.indexOf(e.Resource.Resource.bookableresource)]['serviceTime'].push({
                                starttime : e.StartTime,
                                endtime : e.EndTime,
                                arrivaltime : e.ArrivalTime
                            })
                            delete getAvail[i];
                        }
                    })

                    setItems(getAvail);
                    setIsLoaded(false);
                    gotoNext(4);
                }else{
                    window.$payload['resource_selected'] = false;
                    submitData(6);
                }
            }else{
                window.$payload['resource_selected'] = false;
                //console.log('window.$payload=====',window.$payload);
                submitData(6);
            }
        }
    }




    const validateStep3 = () => {
        let flag = true;
        var regName = /^[a-zA-Z]+$/;
        var regEmail = /^[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/
        if(firstname == ''){
            setError({firstname: ErrorMsgs.thirdStep.firstname});
            flag=false;
        }else if(!regName.test(firstname)){
            setError({firstname: ErrorMsgs.thirdStep.validfirstname});
            flag=false;
        }else if(lastname == ''){
            setError({lastname: ErrorMsgs.thirdStep.lastname});
            flag=false;
        }else if(!regName.test(lastname)){
            setError({lastname: ErrorMsgs.thirdStep.validlastname});
            flag=false;
        }else if(contact == ''){
            setError({contact: ErrorMsgs.thirdStep.contact});
            flag=false;
        }else if(contact.length < 10){
            setError({contact: ErrorMsgs.thirdStep.validcontact});
            flag=false;
        }else if(email == ''){
            setError({email: ErrorMsgs.thirdStep.email});
            flag=false;
        }else if(!regEmail.test(email)){
            setError({email: ErrorMsgs.thirdStep.validemail});
            flag=false;
        }else if(address == ''){
            setError({address: ErrorMsgs.thirdStep.address});
            flag=false;
        }else if(suburb == ''){
            setError({suburb: ErrorMsgs.thirdStep.suburb});
            flag=false;
        }else if(s_state == ''){
            setError({s_state: ErrorMsgs.thirdStep.state});
        }else if(jobdetails == ''){
            setError({jobdetails: ErrorMsgs.thirdStep.jobdesc});
            flag=false;
        }else{
            flag = true;
        }

        if(flag){
            window.$payload['firstname'] = firstname;
            window.$payload['lastname'] = lastname;
            window.$payload['contact'] = contact;
            window.$payload['email'] = email;
            window.$payload['address'] = address+', '+suburb+', '+s_state+', '+postcode;
            window.$payload['jobdetails'] = jobdetails;
            console.log(window.$payload);
            getServiceProviderList();
            gotoNext(4);
        }
        

    }
  
    const gotoNext = (step, isClearForms = false) => {
        setCurrentStep(step)
        if(isClearForms){
            clearAllForms();   
        }
    }

    const clearErrorMsg = () => {
        setError([]);
    }

    const clearAllForms = () => {
        setPostcode(''); setServicedate(cdate.toString()); setServicetype('');
        setService(''); setFirstname(''); setLastname(''); setContact('');
        setEmail(''); setAdderss(''); setJobdetails(''); setServiceProvider('');
        setStarttime(''); setEndtime(''); setArrivaltime(''); setSuburb(''); setS_state('');

        window.$payload = {};
    }


    const utcConverterToLocalTimezone = (fechaUTC) => {
        var d = new Date(fechaUTC);
        d.toLocaleString('en-US', { timeZone: 'UTC' })
        return d;
    }

    const submitData = async (step) => {
        // make final api call here
        setIsLoaded(true);
        const saveresp = await savewebappdata(JSON.stringify(window.$payload));
        if(saveresp.error){
            setIsLoaded(false);
        }else{
            setIsLoaded(false);
            gotoNext(step);
        }
    }

    const selectServiceProviderSlot = (timeslot,Id) => {
        let t = timeslot.split('|');
        window.$payload['StartTime'] = t[0];
        window.$payload['Endtime'] = t[1];
        window.$payload['ArrivalTime'] = t[2];
        setStarttime(t[0]);
        setEndtime(t[1]);
        setArrivaltime(t[2]);
        setServiceProvider(Id); 
        window.$payload['resourceid'] = Id;
        window.$payload['resource_selected'] = true;
       
        // gotoNext(5); 
        // submitData(5)
    }

    const selectServiceProvider = (id) => {
        if(!window.$payload['StartTime']){
            alert('please pick service time');
        }else if(window.$payload['resourceid'] && window.$payload['resourceid'] !== id){
            delete window.$payload['StartTime'];
            delete window.$payload['Endtime'];
            delete window.$payload['ArrivalTime'];
            delete window.$payload['resourceid'];
            delete window.$payload['resource_selected'];
            setServiceProvider('');
            setStarttime('');
            setEndtime('');
            setArrivaltime('');
            alert('please pick service time');    
        }else{
            setServiceProvider(id); 
            window.$payload['resourceid'] = id;
            window.$payload['resource_selected'] = true;
            console.log('window.$payload===',window.$payload);
            submitData(5)
            // gotoNext(5); 
        }
    }

    if(currentStep === 1){
      
        return(
            <React.Fragment>
                <Header step1={currentStep}/>
            <div className="page-wrapper d-flex">
                
                <div className="sidebar get-started">
                    <div className="sidebar-inner">
                    <h4>obligation free quote</h4>
                    <h2>Request a quote from a Local Expert</h2>
                    <p>It’s quick and easy to request quotes for the work you need done. Simply select a service and request a quote.</p>			
                </div>
                <button className="btn" onClick={() =>  {window.location.href='https://localexpert.com.au/'}}>return home</button>
                </div>
                <div className="page-content">
                    <div className="page-content-inner">
                    <div className="page-heading">
                    <h2>Make an enquiry</h2>
                    <p>Fames ut cras sed nulla varius eu. Arcu fusce nisi, eu neque tempus eget eget dictumst. Ac integer diam nibh consequat.</p>
                </div>
                    <form className="enquiry-form d-flex getting-started" method="post" action="#">
                    <div className="form-group half-width">
                        <label>Enter your postcode</label>
                        <input type="text" value={postcode} maxLength="4" onInput={e => {  clearErrorMsg(); setPostcode(e.target.value)}}  className="form-input" name="postcode" placeholder="0000" />
                        
                        {errorMsg && <label style={{'color':'red'}}>{errorMsg.postcode}</label>}
                        
                    </div>
                    <div className="form-group half-width">
                        <label>Service date</label>
                        <input type="date" min={cdate} value={servicedate} onInput={e => { clearErrorMsg(); setServicedate(e.target.value)}}  className="form-input" name="service_date" placeholder="0000" />
                        {errorMsg && <label style={{'color':'red'}}>{errorMsg.servicedate}</label>}
                        
                    </div>
                    <div className="form-group half-width radio-input">
                        <label>Type of service</label>
                        <div className="radio-outer">
                            <input id="residential" defaultChecked={service_type==='residential'}  type="radio" value="residential" onClick={e => { setServicetype(e.target.value)}} name="service_type" />
                            <span></span>
                            <label htmlFor="residential">Residential</label>
                        </div>
                        <div className="radio-outer">
                            <input id="commercial" defaultChecked={service_type==='commercial'} type="radio" value="commercial" onClick={e => { setServicetype(e.target.value)}} name="service_type" />
                            <span></span>
                            <label htmlFor="commercial">Commercial</label>
                        </div>
                        {errorMsg && <label style={{'color':'red'}}>{errorMsg.servicetype}</label>}
                    </div>	
                    <div className="form-group button-group">
                        <button type="button" className="btn btn-filled mobile-btn" onClick={() =>  {window.location.href='https://localexpert.com.au/'}}>Return home</button>
                        <button type="button" onClick={() => {validateStep1()}} className="btn btn-filled">Next</button>
    
                    </div>	
    
                    </form>
                </div>
                </div>
    
            </div>
            <Footer />
            </React.Fragment>
        )

   
}
if(currentStep === 2){
    let sdate = new Date(servicedate);
    sdate =  sdate.getDate()+'/'+((sdate.getMonth()+1) < 10 ? '0'+(sdate.getMonth()+1) : (sdate.getMonth()+1))+'/'+sdate.getFullYear();

    if (sverror) {
        
        return (
            <React.Fragment>
                <Header step1={currentStep}/>
            <div className="page-wrapper d-flex">
            <div className="sidebar">
                    <div className="sidebar-inner">
                        <div className="sidebar-top">
                            <h4>obligation free quote</h4>
                            <h2>Request a quote from a Local Expert</h2>
                            <p>It’s quick and easy to request quotes for the work you need done. Simply select a service and request a quote.</p>
                        </div>
                        <div className="quote-box">
                            <h2>Your quote so far...</h2>
                            <div className="quote-row"><label>Postcode</label><span>{postcode}</span></div>
                            <div className="quote-row"><label>Service date</label><span>{sdate}</span></div>
                        </div>

                    </div>
                    <button onClick={() => {gotoNext(1)}} className="btn">Back</button>
                </div>
            <div className="page-content">
                <div className="page-content-inner">
                    <div className="page-heading">
                    <h2>Pick your service</h2>
                    </div>
                    Error: {srerror.message}
            </div>
            </div>

            </div>
            <Footer />
            </React.Fragment>
        )
    }else if(svisLoaded){
        
        return (
        <React.Fragment>
                <Header step1={currentStep}/>
            <div className="page-wrapper d-flex">
                <div className="sidebar">
                    <div className="sidebar-inner">
                        <div className="sidebar-top">
                            <h4>obligation free quote</h4>
                            <h2>Request a quote from a Local Expert</h2>
                            <p>It’s quick and easy to request quotes for the work you need done. Simply select a service and request a quote.</p>
                        </div>
                        <div className="quote-box">
                            <h2>Your quote so far...</h2>
                            <div className="quote-row"><label>Postcode</label><span>{postcode}</span></div>
                            <div className="quote-row"><label>Service date</label><span>{sdate}</span></div>
                        </div>

                    </div>
                    <button onClick={() => {gotoNext(1)}} className="btn">Back</button>
                </div>
            <div className="page-content">
                <div className="page-content-inner">
                    <div className="page-heading">
                    <h2>Pick your service</h2>
                    
                    </div>
                   <LoadingSpinner /><br/>
                   
            </div>
            </div>

            </div>
            <Footer />
            </React.Fragment>
        );
    }else {
        return(
            <React.Fragment>
                <Header step1={currentStep}/>
            <div className="page-wrapper d-flex">
                <div className="sidebar">
                    <div className="sidebar-inner">
                        <div className="sidebar-top">
                            <h4>obligation free quote</h4>
                            <h2>Request a quote from a Local Expert</h2>
                            <p>It’s quick and easy to request quotes for the work you need done. Simply select a service and request a quote.</p>
                        </div>
                        <div className="quote-box">
                            <h2>Your quote so far...</h2>
                            <div className="quote-row"><label>Postcode</label><span>{postcode}</span></div>
                            <div className="quote-row"><label>Service date</label><span>{sdate}</span></div>
                        </div>

                    </div>
                    <button onClick={() => {gotoNext(1)}} className="btn">Back</button>
                </div>
                <div className="page-content">
                    <div className="page-content-inner">
                        <div className="page-heading">
                            <h2>Pick your service</h2>
                        </div>
                        
                        <div className="services_outer">
                        {svitems.map((item,index) => (
                            <div key={index} htmlFor={item.name} onClick={() => { setService(item.name); gotoNext(3); window.$payload['service'] = item.name} } className="services-card" 
                                style={(service === item.name) ? {'border':'2px solid #0054A6'} : {}}>
                                <h2>{item.name}</h2>
                                <p>Don’t take the risk. Find a Local Expert experienced in tree and stump removal, pruning, and chipping.</p>
                            </div>
                        ))}
                        </div>
                        <div className="form-group button-group mobile">
                            <button className="btn btn-filled mobile-btn">Back</button>
                            <button type="button"  className="btn btn-filled">Next</button>

                        </div>
                    </div>
                </div>

            </div>
            <Footer />
           </React.Fragment>
        )
    }

   
}

if(currentStep === 3){



    return(
        <React.Fragment>
            <Header step1={currentStep}/>
        <div className="page-wrapper d-flex">
            <div className="sidebar">
                <div className="sidebar-inner">
                    <div className="sidebar-top">
                <h4>obligation free quote</h4>
                <h2>Request a quote from a Local Expert</h2>
                <p>It’s quick and easy to request quotes for the work you need done. Simply select a service and request a quote.</p>	
                </div>
                <div className="quote-box">
                    <h2>Your quote so far...</h2>
                    <div className="quote-row"><label>Postcode</label><span>{postcode}</span></div>
                    <div className="quote-row"><label>Service date</label><span>{servicedate}</span></div>
                    <div className="quote-row"><label>Service type</label><span>{service}</span></div>
                </div>		
            </div>
            <button onClick={() => {gotoNext(2)}} className="btn">Back</button>
        </div>
        <div className="page-content">
            <div className="page-content-inner">
            <div className="page-heading">
            <h2>Add your details</h2>
            <p>Fames ut cras sed nulla varius eu. Arcu fusce nisi, eu neque tempus eget eget dictumst. Ac integer diam nibh consequat.</p>
        </div>
            <form className="enquiry-form d-flex getting-started" method="post" action="#">
            <div className="form-group half-width">
                <label>First name<span style={{'color':'red'}}>*</span></label>
                <input type="text" className="form-input" name="first_name" placeholder="First name" value={firstname} onChange={e => { clearErrorMsg(); setFirstname(e.target.value)}} />
                {errorMsg && <label style={{'color':'red'}}>{errorMsg.firstname}</label>}
            </div>
            <div className="form-group half-width">
                <label>Last name<span style={{'color':'red'}}>*</span></label>
                <input type="text" className="form-input" name="last_name" placeholder="Last name" value={lastname}  onChange={e => { clearErrorMsg(); setLastname(e.target.value)}}/>
                {errorMsg && <label style={{'color':'red'}}>{errorMsg.lastname}</label>}
            </div>
            <div className="form-group half-width">
                <label>Contact number<span style={{'color':'red'}}>*</span></label>
                <input type="number" className="form-input" name="contact" placeholder="0000 000 000" 
                    value={contact}  onChange={(e) => { if(e.target.value.length===11) return false; clearErrorMsg(); setContact(e.target.value)}}/>
                {errorMsg && <label style={{'color':'red'}}>{errorMsg.contact}</label>}
            </div>
            <div className="form-group half-width">
                <label>Email<span style={{'color':'red'}}>*</span></label>
                <input type="email" className="form-input" name="email" placeholder="example@gmail.com"
                    value={email}  onChange={e => { clearErrorMsg(); setEmail(e.target.value)}}/>
                    {errorMsg && <label style={{'color':'red'}}>{errorMsg.email}</label>}
            </div>
            <div className="form-group half-width">
                <label>Street address<span style={{'color':'red'}}>*</span></label>
                <input type="text" className="form-input" name="address" placeholder="100 example road"
                    value={address}  onChange={e => { clearErrorMsg(); setAdderss(e.target.value)}}/>
                    {errorMsg && <label style={{'color':'red'}}>{errorMsg.address}</label>}
            </div>
            <div className="form-group half-width">
                <label>Suburb<span style={{'color':'red'}}>*</span></label>
                <input type="text" className="form-input" name="suburb" placeholder="example street"
                    value={suburb}  onChange={e => { clearErrorMsg(); setSuburb(e.target.value)}}/>
                    {errorMsg && <label style={{'color':'red'}}>{errorMsg.suburb}</label>}
            </div>
            <div className="form-group half-width">
                <label>State<span style={{'color':'red'}}>*</span></label>
                {/* <input type="text" className="form-input" name="state" placeholder="example state"
                    value={s_state}  onChange={e => { clearErrorMsg(); setS_state(e.target.value)}}/> */}
                    <select className="form-input" onChange={(e) => { clearErrorMsg(); setS_state(e.target.value || null) }} defaultValue={s_state || ""}>
                    <option value="Please Select">Please Select</option>
                    <option value="ACT">ACT</option>
                    <option value="NSW">NSW</option>
                    <option value="NT">NT</option>
                    <option value="QLD">QLD</option>
                    <option value="SA">SA</option>
                    <option value="TAS">TAS</option>
                    <option value="VIC">VIC</option>
                    <option value="WA">WA</option>
                        
                    </select>
                    {errorMsg && <label style={{'color':'red'}}>{errorMsg.s_state}</label>}
            </div>
            <div className="form-group">
                <label>Job Details<span style={{'color':'red'}}>*</span></label>
                <textarea value={jobdetails} placeholder='Enter a description of your requirements here'  onChange={e => { clearErrorMsg(); setJobdetails(e.target.value)}}></textarea>
                {errorMsg && <label style={{'color':'red'}}>{errorMsg.jobdetails}</label>}
            </div>
                
            <div className="form-group button-group form-action">
                <button className="btn btn-outline mobile-only btn-green">Back</button>
                <button type="button" onClick={() => {validateStep3()}} className="btn btn-filled">Next</button>
            </div>	

            </form>
        </div>
        </div>

    </div>
    <Footer />
    </React.Fragment>
    )
}

if(currentStep ===4 ){

    if (srerror) {
        
        return (
            <React.Fragment>
                <Header step1={currentStep}/>
            <div className="page-wrapper d-flex">
            <div className="sidebar">
                <div className="sidebar-inner">
                <div className="sidebar-top">
                <h4>obligation free quote</h4>
                <h2>Request a quote from a Local Expert</h2>
                <p>It’s quick and easy to request quotes for the work you need done. Simply select a service and request a quote.</p>	
            </div>
                <div className="quote-box">
                    <h2>Your quote so far...</h2>
                    <div className="quote-row"><label>Postcode</label><span>{postcode}</span></div>
                    <div className="quote-row"><label>Service date</label><span>{servicedate}</span></div>
                    <div className="quote-row"><label>Service type</label><span>{service}</span></div>
                </div>		
            </div>
            <button onClick={() => { gotoNext(3); } } className="btn">Back</button>
            </div>
            <div className="page-content">
                <div className="page-content-inner">
                    <div className="page-heading">
                    {/* <h2>Select your service provider  </h2>
                    <p>Fames ut cras sed nulla varius eu. Arcu fusce nisi, eu neque tempus eget eget dictumst. Ac integer diam nibh consequat.</p> */}
                    </div>
                    Error: {srerror.message}
            </div>
            </div>

            </div>
            <Footer />
            </React.Fragment>
        )
    }else if(isLoaded){
        
        return (
        <React.Fragment>
                <Header step1={currentStep}/>
            <div className="page-wrapper d-flex">
            <div className="sidebar">
                <div className="sidebar-inner">
                <div className="sidebar-top">
                <h4>obligation free quote</h4>
                <h2>Request a quote from a Local Expert</h2>
                <p>It’s quick and easy to request quotes for the work you need done. Simply select a service and request a quote.</p>	
            </div>
                <div className="quote-box">
                    <h2>Your quote so far...</h2>
                    <div className="quote-row"><label>Postcode</label><span>{postcode}</span></div>
                    <div className="quote-row"><label>Service date</label><span>{servicedate}</span></div>
                    <div className="quote-row"><label>Service type</label><span>{service}</span></div>
                </div>		
            </div>
            <button onClick={() => { gotoNext(3); } } className="btn">Back</button>
            </div>
            <div className="page-content">
                <div className="page-content-inner">
                    <div className="page-heading">
                    {/* <h2>Select your service provider  </h2>
                    <p>Fames ut cras sed nulla varius eu. Arcu fusce nisi, eu neque tempus eget eget dictumst. Ac integer diam nibh consequat.</p> */}
                    </div>
                    <LoadingSpinner />
            </div>
            </div>

            </div>
            <Footer />
            </React.Fragment>
        );
    }else {
        
        return (
        <React.Fragment>
        <Header step1={currentStep}/>
    <div className="page-wrapper d-flex">
    <div className="sidebar">
        <div className="sidebar-inner">
        <div className="sidebar-top">
        <h4>obligation free quote</h4>
        <h2>Request a quote from a Local Expert</h2>
        <p>It’s quick and easy to request quotes for the work you need done. Simply select a service and request a quote.</p>	
    </div>
        <div className="quote-box">
            <h2>Your quote so far...</h2>
            <div className="quote-row"><label>Postcode</label><span>{postcode}</span></div>
            <div className="quote-row"><label>Service date</label><span>{servicedate}</span></div>
            <div className="quote-row"><label>Service type</label><span>{service}</span></div>
        </div>		
    </div>
    <button onClick={() => { gotoNext(3); } } className="btn">Back</button>
    </div>
    <div className="page-content">
        <div className="page-content-inner">
            <div className="page-heading">
            <h2>Select your service provider  </h2>
            <p>Fames ut cras sed nulla varius eu. Arcu fusce nisi, eu neque tempus eget eget dictumst. Ac integer diam nibh consequat.</p>
            </div>
            <div style={{'height':'800px','overflow':'scroll'}}>
            {items.map((item, index) => (
            <div key={index} className="ser_provider">
                {/* <span className="tick2"></span> */}
                <span className="ser_avatar" style={{'background': 'url('+srImage+')'}}></span>
                <div className="ser_content">
                    {/* <span className="ser_availablitly">Available</span> */}

                     
                    <h2 onClick={() => { toggleHide(index)}}>{item.Resource.Resource.__DisplayName__}</h2>
                    <div className="ser_tags">
                        {/* <span>Cleaning</span> */}
                        <span>{service}</span>
                    </div>
                    {!showDiv[index] && <div className="ser_description">
                        <p>Hide</p>
                    </div>}
                    {!showDiv[index] && 
                        item.serviceTime.length > 0 ? 
                                
                                <div>Pick time slots<br/>
                                    {item.serviceTime.map((e,i) => (
                                    // let d1 = new Date(e.starttime)
                                    // let e1 = new Date(e.endtime);    
                                    // console.log('Start------------| ',d1.toLocaleString('en-AU'));
                                    // console.log('End------------| ',e1.toLocaleString('en-AU'));
                                    // console.log(item.Resource.Resource.bookableresource,'=====================')
                                    
                                    <button key={i} style={startTime == e.starttime && service_provider ==item.Resource.Resource.bookableresource ? 
                                        {'cursor':'pointer','padding':'7px','margin':'10px','background':'#0054A6','border':'0px solid #0054A6',borderRadius:'7px','color':'white',fontWeight:'bold'} :
                                        {'cursor':'pointer','padding':'7px','margin':'10px',backgroundColor:'#55c2b8','border':'0px',borderRadius:'7px','color':'white',fontWeight:'bold'}
                                        }
                                        type="button" id={'ser_btn'+item.Resource.Resource.bookableresource+'_'+i} onClick={() => { selectServiceProviderSlot(e.starttime+'|'+e.endtime+'|'+e.arrivaltime,item.Resource.Resource.bookableresource) }}>
                                            {new Date(e.starttime).toLocaleString('en-AU')} To {new Date(e.endtime).toLocaleString('en-AU')}
                                    </button>
                                    ))}
                                </div>
                                
                        : <div></div>
                    }
                </div>
                <div className="ser_action">
                    <button type="button" style={service_provider == item.Resource.Resource.bookableresource ? 
                            {'background':'#0054A6','color':'#fff',borderColor:'#0054A6'} : 
                            null} 
                        onClick={() => { selectServiceProvider(item.Resource.Resource.bookableresource); setServiceProviderName(item.Resource.Resource.__DisplayName__) } }  className="btn btn-filled">Book</button>
                </div>
            </div>
            ))}
            </div>
    </div>
    </div>

    </div>
    <Footer />
    </React.Fragment>
        )
    }


}

if(currentStep === 5 ){
    return (
        <React.Fragment>
            <Header step1={currentStep}/>
        <div className="page-wrapper d-flex background-light">
            <div className="sidebar">
                <div className="sidebar-inner">
                    <div className="sidebar-top">
                    <h4>obligation free quote</h4>
                    <h2>Request a quote from a Local Expert</h2>
                    <p>It’s quick and easy to request quotes for the work you need done. Simply select a service and request a quote.</p>	
                </div>
                    <div className="quote-box">
                        <h2>Your quote details</h2>
                        <div className="quote-row"><label>Postcode</label><span>{postcode}</span></div>
                        <div className="quote-row"><label>Service date</label><span>{servicedate}</span></div>
                        <div className="quote-row"><label>Service type</label><span>{service}</span></div>
                        <div className="quote-row"><label>Local expert</label><span>{service_provider_name}</span></div>
                    </div>		
                </div>
                {/* <button onClick={() => { gotoNext(4);} } className="btn">Back</button> */}
            </div>
            <div className="page-content thankyou-page get-expert">
                <div className="page-content-inner">
                    <h1>Thank you for requesting a quote</h1>
                    <div className="expert-detail">
                    <div className="expert-detail-inner">
                        <span className="expert-avatar rounded"><img src={srImage} /></span>
                        <p><strong>{service_provider_name}&nbsp;</strong> will be in touch shortly.</p></div>
                    </div>
                    <div className="form-group button-group">
                        <button onClick={() => {gotoNext(1, true)}} className="btn btn-outline btn-add">Add another service</button>
                        <button type="button" onClick={() =>  {window.location.href='https://localexpert.com.au/'}} className="btn btn-filled">return home</button>

                    </div>
                    
                </div>
            </div>

        </div>
        <Footer />
        </React.Fragment>
    )
}

if(currentStep === 6){
    return (
        <React.Fragment>
            <Header step1={currentStep}/>
        <div className="page-wrapper d-flex background-light">
            <div className="sidebar">
                <div className="sidebar-inner">
                    <div className="sidebar-top">
                    <h4>obligation free quote</h4>
                    <h2>Request a quote from a Local Expert</h2>
                    <p>It’s quick and easy to request quotes for the work you need done. Simply select a service and request a quote.</p>
                    </div>	
                    <div className="quote-box">
                        <h2>Your quote details</h2>
                        <div className="quote-row"><label>Postcode</label><span>{postcode}</span></div>
                        <div className="quote-row"><label>Service date</label><span>{servicedate}</span></div>
                        <div className="quote-row"><label>Service type</label><span>{service}</span></div>
                    </div>		
                </div>
                <button onClick={() => {gotoNext(1)}} className="btn">Back</button>
            </div>
            <div className="page-content thankyou-page search-expert">
                <div className="page-content-inner">
                    <h1>Thank you for requesting a quote</h1>
                    <div className="expert-detail">
                    <div className="expert-detail-inner">
                        <span className="expert-avatar"><img src={findExpertImg} /></span>
                        <p>We’ll find a Local Expert and be in touch shortly.</p></div>
                    </div>
                    <div className="form-group button-group">
                        <button onClick={() => {gotoNext(1, true)}} className="btn btn-outline btn-add">Add another service</button>
                        <button type="button" onClick={() =>  {window.location.href='https://localexpert.com.au/'}} className="btn btn-filled">return home</button>

                    </div>
                    
                </div>
            </div>

        </div>
        <Footer />
        </React.Fragment>
    )
}
}

export default Home;
