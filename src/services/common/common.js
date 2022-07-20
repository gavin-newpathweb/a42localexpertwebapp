import React from "react";
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';

export function tConvert(time){
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}

export function dFormat(month){
  var month = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"][month];

  return month;
}

export function SplitTimeSlots(date1,date2){

    let allTimes = [];
    let newTimes = [];
    let slotTimes = [];
    let pdate = [];
    let uniqueDates = [];

    let diff1 = moment(date1,"YYYY-MM-DD"); 
    let diff2 = moment(date2,"YYYY-MM-DD");
    let diff3 = diff2.diff(diff1, 'days');

    let time1 = (new Date(date1).getUTCHours() < 10) ? '0'+new Date(date1).getUTCHours() : new Date(date1).getUTCHours();
    let time2 = (new Date(date2).getUTCHours() < 10) ? '0'+new Date(date2).getUTCHours() : new Date(date2).getUTCHours(); 

    let timemin1 = (new Date(date1).getUTCMinutes() < 10) ? '0'+new Date(date1).getUTCMinutes() : new Date(date1).getUTCMinutes();
    let timemin2 = (new Date(date2).getUTCMinutes() < 10) ? '0'+new Date(date2).getUTCMinutes() : new Date(date2).getUTCMinutes(); 
    
    let x = {
      slotInterval: 60,
      openTime: diff1.format("YYYY-MM-DD")+' '+time1+':'+timemin1,
      closeTime: diff2.format("YYYY-MM-DD")+' '+time2+':'+timemin2
    };

    // console.log(x);
    
    let startTime = moment(x.openTime, "YYYY-MM-DD hh:mm");
    let endTime;
    if(diff3 < 1){
      endTime = moment(x.closeTime, "YYYY-MM-DD hh:mm");
    }else{
      endTime = moment(x.closeTime, "YYYY-MM-DD hh:mm");
    }
    
    
    
    while (startTime < endTime) {
      allTimes.push(startTime.format("YYYY-MM-DD hh:mm a"));
      if(diff3 < 1){
        startTime.add(x.slotInterval, 'minutes');
      }else{
        startTime.add(x.slotInterval, 'minutes');
      }
     
    }

    if(allTimes.length > 0){
        if(allTimes.indexOf(moment(x.closeTime, "YYYY-MM-DD hh:mm a").format("YYYY-MM-DD hh:mm a"),allTimes[allTimes.length - 1])===-1){
          allTimes.push(moment(x.closeTime, "YYYY-MM-DD hh:mm").format("YYYY-MM-DD hh:mm a"));
        }
    }

    

    if(allTimes.length > 0){

        allTimes.map((e,i) => {
            if(i<allTimes.length - 1){
              pdate.push(moment(e, "YYYY-MM-DD").format("YYYY-MM-DD"))
            }
        })

        for(let i=0; i < pdate.length; i++){
            if(uniqueDates.indexOf(pdate[i]) === -1) {
                uniqueDates.push(pdate[i]);
            }
        }
        pdate = [];
        pdate = uniqueDates;
        
        
        if(pdate.length > 0){
            
            pdate.map((ele,ind) => {
                

                    let pd = [];
                    allTimes.forEach((e,i) => {
                        if(i<allTimes.length - 1){ 
                            if(ele === moment(e,"YYYY-MM-DD").format("YYYY-MM-DD")){
                                let pd2 = moment(allTimes[i],"YYYY-MM-DD HH:mm a").format("HH:mm a")+' to '+moment(allTimes[i+1],"YYYY-MM-DD HH:mm a").format("HH:mm a");
                                pd.push(pd2)
                            }
                        }
                    })

                    pdate[ind] = {
                        date : ele,
                        time : pd
                    }

                
                
            })
            
        }
       
    }

    return pdate;

    // console.log(allTimes);  

    if(allTimes.length > 0){
      allTimes.map((e,i) => {
        // if(e.toString() === moment(x.closeTime, "hh:mm a").format("hh:mm a")){
        //   console.log(i);
        //   return;
        // }else{}
        if(diff3<1){
          if(i%60===0){
            newTimes.push(e);
          }
          // if(i === (allTimes.length - 1)){
          //   newTimes.push(e);
          // }
        }else{
          if(i%1===0){
            newTimes.push(e);
          }
        }
        
       
        
      })
    }

    

    if(newTimes.length > 0){
      if(newTimes.indexOf(moment(x.closeTime, "YYYY-MM-DD hh:mm a").format("YYYY-MM-DD hh:mm a"),allTimes[allTimes.length - 1])===-1){
        newTimes.push(moment(x.closeTime, "YYYY-MM-DD hh:mm").format("YYYY-MM-DD hh:mm a"));
      }

      
      newTimes.map((e,i) => {
        if(i<newTimes.length - 1){
          // slotTimes.push(pdate);
          pdate.push(moment(e, "YYYY-MM-DD").format("YYYY-MM-DD"))
          slotTimes.push(e+' to '+newTimes[i+1]);
        }
      })

      pdate.push(moment(newTimes[newTimes.length-1], "YYYY-MM-DD").format("YYYY-MM-DD"))

      if(pdate.length > 0){
        var uniqueArray = [];
        
        // Loop through array values
        for(let i=0; i < pdate.length; i++){
            if(uniqueArray.indexOf(pdate[i]) === -1) {
                uniqueArray.push(pdate[i]);
            }
        }
        pdate = [];
        pdate = uniqueArray;

        if(pdate.length > 0){
          if(slotTimes.length > 0){
            slotTimes.map((e,i) => {
              let spl = e.split(' to ');
              console.log(spl);
            })
          }
        }
      }
    }  
    

    

    return pdate;
}

export function FilterServiceProviderList(list){
  let getAvail = [];
  let filteredResource = [];
  if(list.FilteredResource.length > 0){
        
    list.FilteredResource.map((e,i) => {
        if(list.TimeSlots.length > 0){
            list.TimeSlots.map((ele,ind) => {
                if(ele.Type===0){
                    if(ele.Resource.Resource.bookableresource === e){
                      getAvail.push(ele);
                    }
                }
            });
        }
    })

  }

  if(getAvail.length > 0){  
    let duplicate = [];
    getAvail.map((e,i) => {
        if(duplicate.indexOf(e.Resource.Resource.bookableresource) ===-1){
            duplicate.push(e.Resource.Resource.bookableresource);

            // let stime1 = new Date(e.StartTime); 
            // let cnvrtHour = (stime1.getUTCHours() < 10) ? '0'+stime1.getUTCHours() : stime1.getUTCHours();
            // let cnvrtMin = (stime1.getUTCMinutes() < 10) ? '0'+stime1.getUTCMinutes() : stime1.getUTCMinutes();
            // let cnvrtSec = (stime1.getUTCSeconds() < 10) ? '0'+stime1.getUTCSeconds() : stime1.getUTCSeconds();

            // let cnvrtdate1 = ((stime1.getUTCDate() < 10) ? '0'+stime1.getUTCDate() : stime1.getUTCDate()) +
            // ' '+dFormat(stime1.getUTCMonth()) +
            // ' '+stime1.getUTCFullYear()
            
            // let cnvrttime1 = tConvert(cnvrtHour+':'+cnvrtMin);

            // let st_time1 = cnvrtdate1+', '+cnvrttime1

            // let stime2 = new Date(e.EndTime)
            // let cnvrtHour2 = (stime2.getUTCHours() < 10) ? '0'+stime2.getUTCHours() : stime2.getUTCHours();
            // let cnvrtMin2 = (stime2.getUTCMinutes() < 10) ? '0'+stime2.getUTCMinutes() : stime2.getUTCMinutes();
            // let cnvrtSec2 = (stime2.getUTCSeconds() < 10) ? '0'+stime2.getUTCSeconds() : stime2.getUTCSeconds();

            // let cnvrtdate2 = ((stime2.getUTCDate() < 10) ? '0'+stime2.getUTCDate() : stime2.getUTCDate()) +
            //                 ' '+dFormat(stime2.getUTCMonth()) +
            //                 ' '+stime2.getUTCFullYear()
                            
            // let cnvrttime2 = tConvert(cnvrtHour2+':'+cnvrtMin2);
            // let st_time2;
            // if(cnvrtdate2 === cnvrtdate1){
            //     st_time2 = cnvrtdate1+', '+cnvrttime1+' to '+cnvrttime2
            // }else{
            //     st_time2 = st_time1+' to '+cnvrtdate2+', '+cnvrttime2
            // }

            getAvail[i]['serviceTime'] = [{
                    starttime : e.StartTime,
                    endtime : e.EndTime,
                    arrivaltime : e.ArrivalTime,
                    // dtime : st_time2,
                    // etime : st_time2,
                    slots : SplitTimeSlots(e.StartTime,e.EndTime)
            }]
        }else{

        //   let stime1 = new Date(e.StartTime)
        //   let cnvrtHour = (stime1.getUTCHours() < 10) ? '0'+stime1.getUTCHours() : stime1.getUTCHours();
        //   let cnvrtMin = (stime1.getUTCMinutes() < 10) ? '0'+stime1.getUTCMinutes() : stime1.getUTCMinutes();
        //   let cnvrtSec = (stime1.getUTCSeconds() < 10) ? '0'+stime1.getUTCSeconds() : stime1.getUTCSeconds();

        //   let cnvrtdate1 = ((stime1.getUTCDate() < 10) ? '0'+stime1.getUTCDate() : stime1.getUTCDate()) +
        //                       ' '+dFormat(stime1.getUTCMonth()) +
        //                       ' '+stime1.getUTCFullYear()
                              
        //   let cnvrttime1 = tConvert(cnvrtHour+':'+cnvrtMin+':'+cnvrtSec);

        //   let st_time1 = cnvrtdate1+', '+cnvrttime1
          
        //   let stime2 = new Date(e.EndTime)
        //   let cnvrtHour2 = (stime2.getUTCHours() < 10) ? '0'+stime2.getUTCHours() : stime2.getUTCHours();
        //   let cnvrtMin2 = (stime2.getUTCMinutes() < 10) ? '0'+stime2.getUTCMinutes() : stime2.getUTCMinutes();
        //   let cnvrtSec2 = (stime2.getUTCSeconds() < 10) ? '0'+stime2.getUTCSeconds() : stime2.getUTCSeconds();

        //   let cnvrtdate2 = ((stime2.getUTCDate() < 10) ? '0'+stime2.getUTCDate() : stime2.getUTCDate()) +
        //   ' '+dFormat(stime2.getUTCMonth()) +
        //   ' '+stime2.getUTCFullYear()
                          
        //   let cnvrttime2 = tConvert(cnvrtHour2+':'+cnvrtMin2+':'+cnvrtSec2);

        //   let st_time2;
        //   if(cnvrtdate2 === cnvrtdate1){
        //       st_time2 = cnvrtdate1+', '+cnvrttime1+' to '+cnvrttime2
        //   }else{
        //       st_time2 = st_time1+' to '+cnvrtdate2+', '+cnvrttime2
        //   }

          getAvail[duplicate.indexOf(e.Resource.Resource.bookableresource)]['serviceTime'].push({
                starttime : e.StartTime,
                endtime : e.EndTime,
                arrivaltime : e.ArrivalTime,
                // dtime : st_time2,
                // etime : st_time2,
                slots : SplitTimeSlots(e.StartTime,e.EndTime)
            })
            delete getAvail[i];
            // getAvail.splice(i,1);
        }
        filteredResource.push(getAvail[i]);
    })
  }

  console.log(getAvail);

  return getAvail;

}



export function sampleJson(){
  var json = {
    "TimeSlots": [
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "50cfdd51-9be2-4e44-b0ee-348c0092da0b",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-21T07:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "pranav.patel@newpath.com.au",
                "CalendarId": "91a11ed0-9189-4413-90db-5157d466777e",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "96655138-4cd8-ec11-a7b6-0022481864f8",
                    "__DisplayName__": "Pranav Lad"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "b67fdfd6-6fc0-4c00-a6c6-5384277c3607",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-21T07:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "cio@aspire42.com.au",
                "CalendarId": "f827a02e-b2f6-4187-8c09-e3ff22a3e777",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "96655138-4cd8-ec11-a7b6-0022481864f8",
                    "__DisplayName__": "SP -Demo 8th June"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "05f3130e-c527-4381-9c82-db84331e504b",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "deepakahujacu@gmail.com",
                "CalendarId": "d5b79c75-0a4d-4955-ba5c-304bb8ec2713",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "33124b2a-1ddb-ec11-bb3d-002248186b99",
                    "__DisplayName__": "DA SP"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "4f3c7bcb-7b93-4214-8675-e89dc03518d4",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "deepakahuja5500@gmail.com",
                "CalendarId": "52fab276-a221-4045-a760-9e4a43c99a88",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "94dc7bfd-3ddb-ec11-bb3d-002248186b99",
                    "__DisplayName__": "DA SP 2"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "5f13b0ff-b684-4eec-af0a-5478e7271736",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "polgbjr@yahoo.com.ph",
                "CalendarId": "0397153f-bdac-483c-a501-5a87812269a0",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "250b9e56-fdc5-ec11-a7b5-00224814df96",
                    "__DisplayName__": "Antonio Jr. Banday"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "c9695ea2-faf6-4a68-8960-ec353d7d268d",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "canberra@hsrservices.com.au",
                "CalendarId": "6cb8f531-0fe4-45d1-8a66-161e2555929c",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "27bfe8b8-fdc5-ec11-a7b5-00224814df96",
                    "__DisplayName__": "Markus Blasko"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "39ba3cdc-1954-4088-b4c7-d23c33ff0d23",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "Himansffhudd33@ne.com.au",
                "CalendarId": "14204595-2d1e-4f8e-82fd-47846686eaf3",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "7e6e55d5-b1c6-ec11-a7b5-00224814df96",
                    "__DisplayName__": "Himanshu Sharma"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "a082bd39-459b-443f-96b4-0f21b258ab52",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "paulwatsoccn134333@mailinator.com",
                "CalendarId": "2e309615-79cd-4c1e-852f-831a9b32b847",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "075e6dcc-e0c9-ec11-a7b6-00224814df96",
                    "__DisplayName__": "Paul Watson"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "3e7f7aa9-bd43-4e62-aef7-13c193f2dff8",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "pranavtest@mailinator.com",
                "CalendarId": "529eb2ec-9532-4f39-8470-d44d501d6055",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "cfa55bf1-ecc9-ec11-a7b6-00224814df96",
                    "__DisplayName__": "Pranav SP"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "c53cbf89-8bf1-4146-8a2c-376bd2dbd00f",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "andrew.sampsonidis@aspire42.com.au",
                "CalendarId": "c6af0931-98d8-4684-a452-832498278b0c",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "f55ab095-10c6-ec11-a7b5-0022481598e0",
                    "__DisplayName__": "Andrew Sampsonidis"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "3f472f31-6ff3-4115-a526-6b08276fdde6",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "michele.spillman@aspire42.com.au",
                "CalendarId": "3da35952-2e18-497d-94b5-ccf717de84bc",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "5a8c7ded-87c6-ec11-a7b5-0022481598e0",
                    "__DisplayName__": "Michele Spillman"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "7d0b5d9d-de4f-4676-a55b-7aa8e51dd8af",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "archie.hood@localexpert.com.au",
                "CalendarId": "ad2a6e01-788a-4a8d-8dc9-5e72ce6eb863",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "a3d09934-89c6-ec11-a7b5-0022481598e0",
                    "__DisplayName__": "Archie Hood"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "8b868969-303d-49fc-b4c7-b173e66c2959",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "daniel.richards@aspire42.com.au",
                "CalendarId": "eb994500-e0b2-41ae-b842-19bf38de903c",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "bf64a34c-89c6-ec11-a7b5-0022481598e0",
                    "__DisplayName__": "Daniel Richards"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "39cdd029-bbd0-4769-ae6f-7f0e60989e4c",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "CalendarId": "48ea571c-02a4-4ded-a7ab-f12413f88009",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "604453f0-b7c6-ec11-a7b5-0022481598e0",
                    "__DisplayName__": "Ambisha Dixit 1"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "5392dea6-fab1-45a3-8779-2cd70021a0a5",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "ambisha3424242@newpath.com.au",
                "CalendarId": "b4d77503-2d3d-446c-9cc8-ae03e68cff92",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "a4ba804c-38db-ec11-bb3d-0022481864f8",
                    "__DisplayName__": "pnnSP"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "8c27a677-f514-4185-9ffe-33c8cb34a611",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "er.himanshusharma@outlook.com",
                "CalendarId": "3c9c7800-82bd-45c4-82ba-281b8089659a",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "269a0fa7-83e5-ec11-bb3d-0022481864f8",
                    "__DisplayName__": "Himanshu Sharma"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "037bdb55-8a84-485e-b023-550a7e7917e0",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "Customer8thJune@gmail.com",
                "CalendarId": "63d6b286-0091-4cc5-9c2b-bd9ab71b226a",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "4c486a8c-67e6-ec11-bb3d-0022481864f8",
                    "__DisplayName__": "1 7th June"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "834163d3-1221-40c9-b650-51233bfc1de9",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "ambishadixit24@gmail.com",
                "CalendarId": "74e62b66-8375-4889-b94e-4cf45630bcca",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "53a178f9-80e7-ec11-bb3d-0022481864f8",
                    "__DisplayName__": "Ambisha Dixit Test"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "df33c456-4ab9-45c6-8c73-ce6e7f712780",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "venkattest@gmail.com",
                "CalendarId": "5b78ed59-ebf6-4c24-b515-3a38ddea0683",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "451b36b7-63f3-ec11-bb3d-0022481864f8",
                    "__DisplayName__": "Quote Deposit Yes SP"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "97b5da98-f876-478f-a8be-9038e4e42ac6",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "brooke.bsssell@makeitmine.onmicrosoft.com",
                "CalendarId": "be7ec949-871f-48f2-b217-9763fbc18c3d",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "2f9fe147-a1e1-ec11-bb3e-0022481864f8",
                    "__DisplayName__": "Brooke Bell"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "d0d6e5bf-128f-46d5-9162-ae83044ea59d",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "kmursalin123@gmail.com",
                "CalendarId": "150c759b-e18b-47d5-a387-741bf275af50",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "abcbe699-8dda-ec11-bb3d-002248186b99",
                    "__DisplayName__": "Kim Smith"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "c6472fe7-ebcf-4aea-adcb-0b75f4abf2ea",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "powerapp_auth@aspire42.com.au",
                "CalendarId": "b3f78e45-20ef-4f27-9356-d7b4623bad7b",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "a6afdbdb-8dda-ec11-bb3d-002248186b99",
                    "__DisplayName__": "Local Expert - Service Provider"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "74fc3a54-7566-47a2-996a-d7c4a544efc8",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "SPQuoteAccepted@bigpond.com",
                "CalendarId": "b0cebdb9-3bf0-4479-8d7c-9211f2db73ae",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "5ababd87-5bdc-ec11-bb3d-002248186b99",
                    "__DisplayName__": "nnq1554 11155weqwe"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "d685d7f1-9a9a-481c-8c73-fd135cee7d5b",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "SPQuoteAccepted@bigpond.com",
                "CalendarId": "e2a83525-6464-41fb-a965-7d359d7d52f4",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "8be78293-5cdc-ec11-bb3d-002248186b99",
                    "__DisplayName__": "Login55 cvcTesting55"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "e079a1f8-7445-4a52-b946-65f2575e6933",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "SPQuoteAccepted@bigpond.com",
                "CalendarId": "d84430a9-b73d-416e-afe0-b156f8602150",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "4dd4d18a-5ddc-ec11-bb3d-002248186b99",
                    "__DisplayName__": "Login55 Testing55www"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "91d04e4b-3fa0-4193-95f4-58b16268b998",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "SPQuoteAccepted@bigpond.com",
                "CalendarId": "8f70a66d-049d-47dc-9095-9878484cb883",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "fd9dd68f-5edc-ec11-bb3d-002248186b99",
                    "__DisplayName__": "11Login55 Testing55"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "14e6b6e5-650c-426b-87ca-6520997a564d",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "simonphani@yahoo.com.au",
                "CalendarId": "52c7ec4a-8692-4e85-83a7-596365c31ea0",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "3aec0996-5fdc-ec11-bb3d-002248186b99",
                    "__DisplayName__": "11Simon Phani"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "78f6bb26-6c74-450c-bc1d-3cca1fe532dd",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "SPQuoteAccepted@bigpond.com",
                "CalendarId": "5f3a53c2-cc10-469c-bd14-9ab10b71bcb2",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "1d45e376-60dc-ec11-bb3d-002248186b99",
                    "__DisplayName__": "11Login55 Testing55"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "cfc96f19-942e-49e2-8b11-adec86622607",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "simonphani@yahoo.com.au",
                "CalendarId": "f8ea3985-87bc-4db5-9ec1-a4434f393c3d",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "56efa809-61dc-ec11-bb3d-002248186b99",
                    "__DisplayName__": "111sam11"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "c8f5008e-bba6-4ef7-8073-dc9c6f317982",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "simonphani@yahoo.com.au",
                "CalendarId": "f7cb511b-0493-4147-bee1-cbdd2a26086f",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "2bb4e86d-79b9-ec11-983f-00224818ce29",
                    "__DisplayName__": "Simon Phani"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "6b6487da-fd05-4b1e-92c2-bdcc3ad88556",
            "Type": 0,
            "StartTime": "2022-07-21T00:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T00:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "SPQuoteAccepted@bigpond.com",
                "CalendarId": "7d07e869-2d81-4fce-b1d0-d2f3ca6a67f7",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "7336e708-87b9-ec11-983f-00224818ce29",
                    "__DisplayName__": "SP Quote Accepted Contact"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "6ebb6f2c-b074-435b-9e47-ab43adace8c8",
            "Type": 2,
            "StartTime": "2022-07-21T07:00:00Z",
            "EndTime": "2022-07-21T22:00:00Z",
            "ArrivalTime": "2022-07-21T07:00:00Z",
            "Effort": 0.0,
            "Potential": false,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "pranav.patel@newpath.com.au",
                "CalendarId": "91a11ed0-9189-4413-90db-5157d466777e",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "84736ed2-98c4-ec11-a7b5-00224814df96",
                    "__DisplayName__": "Pranav Lad"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "bc37e554-38a8-4afe-9103-083ff9f6eb02",
            "Type": 2,
            "StartTime": "2022-07-21T07:00:00Z",
            "EndTime": "2022-07-21T23:00:00Z",
            "ArrivalTime": "2022-07-21T07:00:00Z",
            "Effort": 0.0,
            "Potential": false,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "cio@aspire42.com.au",
                "CalendarId": "f827a02e-b2f6-4187-8c09-e3ff22a3e777",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "b005b75f-10c6-ec11-a7b5-0022481598e0",
                    "__DisplayName__": "SP -Demo 8th June"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "8daba49c-d6bd-4473-b448-75e4870ac4e0",
            "Type": 0,
            "StartTime": "2022-07-21T22:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T22:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "pranav.patel@newpath.com.au",
                "CalendarId": "91a11ed0-9189-4413-90db-5157d466777e",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "84736ed2-98c4-ec11-a7b5-00224814df96",
                    "__DisplayName__": "Pranav Lad"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "Id": "d2234df1-aff7-407c-8819-402081c1e583",
            "Type": 0,
            "StartTime": "2022-07-21T23:00:00Z",
            "EndTime": "2022-07-22T00:00:00Z",
            "ArrivalTime": "2022-07-21T23:00:00Z",
            "Effort": 1.0,
            "Potential": true,
            "IsDuplicate": false,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "ResourceType": 2,
                "PoolId": "00000000-0000-0000-0000-000000000000",
                "CrewId": "00000000-0000-0000-0000-000000000000",
                "HasStartLocation": false,
                "HasEndLocation": false,
                "Email": "cio@aspire42.com.au",
                "CalendarId": "f827a02e-b2f6-4187-8c09-e3ff22a3e777",
                "Resource": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                    "bookableresource": "b005b75f-10c6-ec11-a7b5-0022481598e0",
                    "__DisplayName__": "SP -Demo 8th June"
                },
                "Characteristics@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "Characteristics": [],
                "BusinessUnit": {
                    "@odata.type": "#Microsoft.Dynamics.CRM.businessunit",
                    "businessunit": "9400fb0e-9a2f-ec11-b6e6-002248182cea",
                    "__DisplayName__": "orgbf52731b"
                }
            },
            "Availability": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "AvailableIntervals@odata.type": "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)",
                "AvailableIntervals": []
            },
            "Location": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "WorkLocation": 1,
                "LocationSourceSlot": 1
            },
            "Travel": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "Distance": 0.0,
                "TravelTime": 0.0,
                "DistanceMethodSourceSlot": 2
            },
            "TimeGroup": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando",
                "TimeGroupId": "00000000-0000-0000-0000-000000000000"
            },
            "Next": {
                "@odata.type": "#Microsoft.Dynamics.CRM.expando"
            }
        }
    ],
    "Resources": [
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "63d6b286-0091-4cc5-9c2b-bd9ab71b226a",
                "name": "1 7th June",
                "resourcetype": 2,
                "_contactid_value": "c5f57d73-67e6-ec11-bb3d-0022481864f8",
                "bookableresourceid": "4c486a8c-67e6-ec11-bb3d-0022481864f8"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "f8ea3985-87bc-4db5-9ec1-a4434f393c3d",
                "name": "111sam11",
                "resourcetype": 2,
                "_contactid_value": "9d7556c6-6264-ec11-8f8e-00224815a9d9",
                "bookableresourceid": "56efa809-61dc-ec11-bb3d-002248186b99"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "8f70a66d-049d-47dc-9095-9878484cb883",
                "name": "11Login55 Testing55",
                "resourcetype": 2,
                "_contactid_value": "3f1aa40f-4264-ec11-8f8e-00224815a9b5",
                "bookableresourceid": "fd9dd68f-5edc-ec11-bb3d-002248186b99"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "5f3a53c2-cc10-469c-bd14-9ab10b71bcb2",
                "name": "11Login55 Testing55",
                "resourcetype": 2,
                "_contactid_value": "3f1aa40f-4264-ec11-8f8e-00224815a9b5",
                "bookableresourceid": "1d45e376-60dc-ec11-bb3d-002248186b99"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "52c7ec4a-8692-4e85-83a7-596365c31ea0",
                "name": "11Simon Phani",
                "resourcetype": 2,
                "_contactid_value": "9d7556c6-6264-ec11-8f8e-00224815a9d9",
                "bookableresourceid": "3aec0996-5fdc-ec11-bb3d-002248186b99"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "48ea571c-02a4-4ded-a7ab-f12413f88009",
                "name": "Ambisha Dixit 1",
                "resourcetype": 2,
                "bookableresourceid": "604453f0-b7c6-ec11-a7b5-0022481598e0"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "74e62b66-8375-4889-b94e-4cf45630bcca",
                "name": "Ambisha Dixit Test",
                "resourcetype": 2,
                "_contactid_value": "984fb7c0-80e7-ec11-bb3d-0022481864f8",
                "bookableresourceid": "53a178f9-80e7-ec11-bb3d-0022481864f8"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "c6af0931-98d8-4684-a452-832498278b0c",
                "name": "Andrew Sampsonidis",
                "resourcetype": 2,
                "_contactid_value": "8c707c8f-10c6-ec11-a7b5-0022481598e0",
                "bookableresourceid": "f55ab095-10c6-ec11-a7b5-0022481598e0"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "0397153f-bdac-483c-a501-5a87812269a0",
                "name": "Antonio Jr. Banday",
                "resourcetype": 2,
                "_contactid_value": "666a083d-fdc5-ec11-a7b5-00224814df96",
                "bookableresourceid": "250b9e56-fdc5-ec11-a7b5-00224814df96"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "ad2a6e01-788a-4a8d-8dc9-5e72ce6eb863",
                "name": "Archie Hood",
                "resourcetype": 2,
                "_contactid_value": "7bbcd724-89c6-ec11-a7b5-0022481598e0",
                "bookableresourceid": "a3d09934-89c6-ec11-a7b5-0022481598e0"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "be7ec949-871f-48f2-b217-9763fbc18c3d",
                "name": "Brooke Bell",
                "resourcetype": 2,
                "_contactid_value": "269fe147-a1e1-ec11-bb3e-0022481864f8",
                "bookableresourceid": "2f9fe147-a1e1-ec11-bb3e-0022481864f8"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "d5b79c75-0a4d-4955-ba5c-304bb8ec2713",
                "name": "DA SP",
                "resourcetype": 2,
                "_contactid_value": "645df451-40c5-ec11-a7b5-00224814df96",
                "bookableresourceid": "a8bc0975-40c5-ec11-a7b5-00224814df96"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "52fab276-a221-4045-a760-9e4a43c99a88",
                "name": "DA SP 2",
                "resourcetype": 2,
                "_contactid_value": "295fb2b5-53c5-ec11-a7b5-00224814df96",
                "bookableresourceid": "654160e1-53c5-ec11-a7b5-00224814df96"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "eb994500-e0b2-41ae-b842-19bf38de903c",
                "name": "Daniel Richards",
                "resourcetype": 2,
                "_contactid_value": "ae53a940-89c6-ec11-a7b5-0022481598e0",
                "bookableresourceid": "bf64a34c-89c6-ec11-a7b5-0022481598e0"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "3c9c7800-82bd-45c4-82ba-281b8089659a",
                "name": "Himanshu Sharma",
                "resourcetype": 2,
                "_contactid_value": "ca3d4ba1-83e5-ec11-bb3d-002248186b99",
                "bookableresourceid": "269a0fa7-83e5-ec11-bb3d-0022481864f8"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "14204595-2d1e-4f8e-82fd-47846686eaf3",
                "name": "Himanshu Sharma",
                "resourcetype": 2,
                "_contactid_value": "e3b167bb-b1c6-ec11-a7b5-00224814df96",
                "bookableresourceid": "7e6e55d5-b1c6-ec11-a7b5-00224814df96"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "150c759b-e18b-47d5-a387-741bf275af50",
                "name": "Kim Smith",
                "resourcetype": 2,
                "_contactid_value": "98cbe699-8dda-ec11-bb3d-002248186b99",
                "bookableresourceid": "abcbe699-8dda-ec11-bb3d-002248186b99"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "b3f78e45-20ef-4f27-9356-d7b4623bad7b",
                "name": "Local Expert - Service Provider",
                "resourcetype": 2,
                "_contactid_value": "98afdbdb-8dda-ec11-bb3d-002248186b99",
                "bookableresourceid": "a6afdbdb-8dda-ec11-bb3d-002248186b99"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "e2a83525-6464-41fb-a965-7d359d7d52f4",
                "name": "Login55 cvcTesting55",
                "resourcetype": 2,
                "_contactid_value": "3f1aa40f-4264-ec11-8f8e-00224815a9b5",
                "bookableresourceid": "8be78293-5cdc-ec11-bb3d-002248186b99"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "d84430a9-b73d-416e-afe0-b156f8602150",
                "name": "Login55 Testing55www",
                "resourcetype": 2,
                "_contactid_value": "3f1aa40f-4264-ec11-8f8e-00224815a9b5",
                "bookableresourceid": "4dd4d18a-5ddc-ec11-bb3d-002248186b99"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "6cb8f531-0fe4-45d1-8a66-161e2555929c",
                "name": "Markus Blasko",
                "resourcetype": 2,
                "_contactid_value": "06f8dd9c-fdc5-ec11-a7b5-00224814df96",
                "bookableresourceid": "27bfe8b8-fdc5-ec11-a7b5-00224814df96"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "3da35952-2e18-497d-94b5-ccf717de84bc",
                "name": "Michele Spillman",
                "resourcetype": 2,
                "_contactid_value": "7ab317d4-87c6-ec11-a7b5-0022481598e0",
                "bookableresourceid": "5a8c7ded-87c6-ec11-a7b5-0022481598e0"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "b0cebdb9-3bf0-4479-8d7c-9211f2db73ae",
                "name": "nnq1554 11155weqwe",
                "resourcetype": 2,
                "_contactid_value": "3f1aa40f-4264-ec11-8f8e-00224815a9b5",
                "bookableresourceid": "5ababd87-5bdc-ec11-bb3d-002248186b99"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "2e309615-79cd-4c1e-852f-831a9b32b847",
                "name": "Paul Watson",
                "resourcetype": 2,
                "_contactid_value": "1fc730ad-e0c9-ec11-a7b6-00224814df96",
                "bookableresourceid": "075e6dcc-e0c9-ec11-a7b6-00224814df96"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "b4d77503-2d3d-446c-9cc8-ae03e68cff92",
                "name": "pnnSP",
                "resourcetype": 2,
                "_contactid_value": "9eba804c-38db-ec11-bb3d-0022481864f8",
                "bookableresourceid": "a4ba804c-38db-ec11-bb3d-0022481864f8"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "91a11ed0-9189-4413-90db-5157d466777e",
                "name": "Pranav Lad",
                "resourcetype": 2,
                "_contactid_value": "bbcf9098-98c4-ec11-a7b5-00224814df96",
                "bookableresourceid": "84736ed2-98c4-ec11-a7b5-00224814df96"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "529eb2ec-9532-4f39-8470-d44d501d6055",
                "name": "Pranav SP",
                "resourcetype": 2,
                "_contactid_value": "39a32ebb-ecc9-ec11-a7b6-00224814df96",
                "bookableresourceid": "cfa55bf1-ecc9-ec11-a7b6-00224814df96"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "5b78ed59-ebf6-4c24-b515-3a38ddea0683",
                "name": "Quote Deposit Yes SP",
                "resourcetype": 2,
                "_contactid_value": "429a357a-63f3-ec11-bb3d-0022481864f8",
                "bookableresourceid": "451b36b7-63f3-ec11-bb3d-0022481864f8"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "f7cb511b-0493-4147-bee1-cbdd2a26086f",
                "name": "Simon Phani",
                "resourcetype": 2,
                "_contactid_value": "9d7556c6-6264-ec11-8f8e-00224815a9d9",
                "bookableresourceid": "2bb4e86d-79b9-ec11-983f-00224818ce29"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "f827a02e-b2f6-4187-8c09-e3ff22a3e777",
                "name": "SP -Demo 8th June",
                "resourcetype": 2,
                "_contactid_value": "18450c27-10c6-ec11-a7b5-0022481598e0",
                "bookableresourceid": "b005b75f-10c6-ec11-a7b5-0022481598e0"
            }
        },
        {
            "@odata.type": "#Microsoft.Dynamics.CRM.expando",
            "TotalAvailableTime": 0.0,
            "Resource": {
                "@odata.type": "#Microsoft.Dynamics.CRM.bookableresource",
                "_calendarid_value": "7d07e869-2d81-4fce-b1d0-d2f3ca6a67f7",
                "name": "SP Quote Accepted Contact",
                "resourcetype": 2,
                "_contactid_value": "3f1aa40f-4264-ec11-8f8e-00224815a9b5",
                "bookableresourceid": "7336e708-87b9-ec11-983f-00224818ce29"
            }
        }
    ],
    "FilteredResource": [
        "96655138-4cd8-ec11-a7b6-0022481864f8",
        "33124b2a-1ddb-ec11-bb3d-002248186b99",
        "94dc7bfd-3ddb-ec11-bb3d-002248186b99"
    ]
}

  return json;
}