export const baseUrl = process.env.REACT_APP_API_BASE_URL;
export const baseUrlSave = process.env.REACT_APP_API_BASE_URL_SAVE_API

export const defaultImages = {
    serviceProvider : "./assets/images/user.jpg",
}

export const ErrorMsgs = {
    firstStep : {
        postcode : 'Please enter postcode',
        postcodeValid : 'Please enter valid code',
        servicedate : 'Please select service date',
        serviceType : 'Please choose service type'
    },
    thirdStep : {
        firstname : 'Please enter firstname',
        validfirstname : 'Only alphabats are allowed in the first name. ',
        lastname : 'Please enter lastname',
        validlastname : 'Only alphabats are allowed in the last name. ',
        contact : 'Please enter contact number',
        validcontact : 'Please enter 10 digit contact number',
        email : 'Please enter email address',
        validemail : 'Please enter valid email address',
        address : 'Please enter street address',
        suburb : 'Please enter suburb',
        state : 'Please enter state',
        jobdesc : 'Please add some job description'
    }
}