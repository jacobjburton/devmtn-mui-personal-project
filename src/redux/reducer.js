import axios from 'axios';

const initialState =
{
    user: null,
    events: [],
    sliderImages: [],
    meets: []
}

const GET_USER_INFO = 'GET_USER_INFO',
    GET_EVENT_INFO = 'GET_EVENT_INFO',
    GET_SLIDER_IMAGES = 'GET_SLIDER_IMAGES',
    GET_MEET_NAMES = 'GET_MEET_NAMES',
    ADD_NEW_MEET = 'ADD_NEW_MEET',
    ADD_NEW_RACE = 'ADD_NEW_RACE',
    DELETE_RACE = 'DELETE_RACE',
    EDIT_RACE = 'EDIT_RACE';


export function getUser()
{
    let userData = axios.get('/auth/me').then(res => 
    {
        //console.log(res.data)
        return res.data;
    });
    return (
    {  
        type: GET_USER_INFO,
        payload: userData  
    });
}

export function getEventData(userid)
{
    let events = axios.get('/api/events/' + userid).then(res =>
    {
        return res.data;
    });
    return (
    {
        type: GET_EVENT_INFO,
        payload: events
    });
}

export function getMeetNames(userid)
{
    let meets = axios.get('/api/meetNames/' + userid).then(res =>
    {
       // console.log(res.data)
        return res.data;
    })
    return (
    {
        type: GET_MEET_NAMES,
        payload: meets
    })
}

export function getSliderImages()
{
    
    return (
    {
        type: GET_SLIDER_IMAGES,
        payload: axios.get('/api/getSliderImages')
    });
}

export function addNewMeet(date, name, format, athleteid)
{

    return (
    {
        type: ADD_NEW_MEET,
        payload: axios.post('/api/addNewMeet/', {date, name, format, athleteid}).then(res => 
        {
            console.log(res.data)
            return res.data;
        })
    });
}

export function addNewRace(name, time, meetId)
{
    return (
    {    
        type: ADD_NEW_RACE,
        payload: axios.post('/api/addNewRace/', {name, time, meetId}).then(res =>
        {
            return res.data;
        })
    });
}

export function deleteRace(id)
{
    return (
    {
        type: DELETE_RACE,
        payload: axios.delete(`/api/deleteRace/${id}`).then(res =>
        {
            return res.data;
        })
    });
}

export function editRace(id, race, time, userid)
{
    console.log(race, time)
    return (
    {
        type: EDIT_RACE,
        payload: axios.put(`/api/editRace/${id}`, {race, time, userid}).then(res =>
        {
            console.log(res.data)
            return res.data;
        })
    });
}

export default function reducer(state = initialState, action)
{
    switch (action.type)
    {
        case EDIT_RACE +'_FULFILLED':
            return Object.assign({}, state, {events: action.payload});
        case DELETE_RACE + '_FULFILLED':
            return Object.assign({}, state, {events: action.payload});
        case ADD_NEW_RACE + '_FULFILLED':
            return Object.assign({}, state);
        case ADD_NEW_MEET + '_FULFILLED':
            return Object.assign({}, state, {meets: action.payload});
        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload});
        case GET_EVENT_INFO + '_FULFILLED':
            return Object.assign({}, state, {events: action.payload});
        case GET_SLIDER_IMAGES + '_FULFILLED':
            //console.log(action.payload)
            let imageUrlArr = [];
            for (var i = 0; i < action.payload.data.length; i++)
            {
                imageUrlArr.push(action.payload.data[i].img_url);
            }
            return Object.assign({}, state, {sliderImages: imageUrlArr});
        case GET_MEET_NAMES + '_FULFILLED':
            return Object.assign({}, state, {meets: action.payload})
        default:
            return state;
    }
}