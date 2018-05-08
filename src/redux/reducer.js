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
    GET_MEET_NAMES = 'GET_MEET_NAMES';


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

export function getEventData(user)
{
    let events = axios.get('/api/events/' + user).then(res =>
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
    let meets = axios.get('api/meetnames/' + userid).then(res =>
    {
        console.log(res.data)
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
    
    
    
    //console.log(images)
    //console.log(imageUrlArr);
    return (
    {
        type: GET_SLIDER_IMAGES,
        payload: axios.get('/api/getSliderImages')
    });
}

export default function reducer(state = initialState, action)
{
    switch (action.type)
    {
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
            
            //console.log(action.payload);
            return Object.assign({}, state, {sliderImages: imageUrlArr});
        case GET_MEET_NAMES + '_FULFILLED':
            return Object.assign({}, state, {meets: action.payload})
        default:
            return state;
    }
}