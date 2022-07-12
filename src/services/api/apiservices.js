import React from "react";
import {baseUrl, baseUrlSave} from '../../components/constant'
import {resolve} from './resolver'

export async function getAllServiceList(){
    try{
        return await resolve(fetch(baseUrl+"/workflows/6e23d134ca0746039da1c6f995e91384/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=emw_-D9bzveCpETzuWVAQ9RlPk7Z5rZC8exUWp1Cfv4", {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                } 
            }).then(results =>
                (results.status == 200?results.json(): [])
            ))
    }catch(error){
        return [];
    }
}

export async function getAllServiceProviderList(payload){
    try{
        return await resolve(fetch(baseUrl+"/workflows/e57ab26c89564738a9d863210fa74c64/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ylrll4U9ECEyIi4ja3ROcrP9D9sSjnP899GcrYhPAx4", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: payload 
        }).then(results =>
            (results.status == 200?results.json(): [])
        ))
    }catch(error){
        return [];
    }
}

export async function savewebappdata(payload){
    try{
        return await resolve(fetch(baseUrlSave+"workflows/a8a585551dbb4192b286ee1ecdecf8d1/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-DUyubgConK37kDiCHUxXDbIi7kD6bypyTDqo4eGrZs", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: payload
        }).then(results =>
            (results.status == 200?{status:true}: {status:false})
        ))
    }catch(error){
        return [];
    }
}