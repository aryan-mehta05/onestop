import axios from "axios";
import qs from 'qs';

const API_KEY = "rk093sntQuHdYH9Ma4e6lrugTdKpAyGj";
const API_SECRET = "GeQt2ukuf9LINVKD";
const AUTH_API = "https://test.api.amadeus.com/v1/security/oauth2/token";

// const FLIGHT_OFFERS_API = "https://test.api.amadeus.com/v2";
const BASE_API = "https://test.api.amadeus.com/v1";
// const test_parameters = `${FLIGHT_OFFERS_API}/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2024-12-01&adults=1&max=2`;
// const test_parameters2 = `${FLIGHT_INSPO_API}/shopping/flight-destinations?origin=MAD&oneWay=false&nonStop=false&maxPrice=500`;

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";

export const get_token = async () => {
    const data = { 'grant_type': "client_credentials", 'client_id': API_KEY, 'client_secret': API_SECRET };
    const resp = await axios.post(AUTH_API, qs.stringify(data));
    const token = resp.data.access_token;
    return token;
}

export const get_flight_inspo_data = async (origin: string, one_way: boolean, nonstop: boolean, max_price?: number) => {
    const token = await get_token();
    const one_way_string = JSON.stringify(one_way)
    const nonstop_string = JSON.stringify(nonstop)
    const max_price_string = JSON.stringify(max_price)
    const API_url = `${BASE_API}/shopping/flight-destinations?origin=${origin}&oneWay=${one_way_string}&nonStop=${nonstop_string}&maxPrice=${max_price ? max_price_string : "999999"}`
    const { data } = await axios.get(API_url, { headers: { 'Authorization': `Bearer ${token}` } });
    return data;
}

export const get_airport_city_details = async (airport_code: string) => {
    const token = await get_token();
    const API_url = `${BASE_API}/reference-data/locations?subType=CITY,AIRPORT&keyword=${airport_code}&sort=analytics.travelers.score&view=LIGHT`
    const { data } = await axios.get(API_url, { headers: { 'Authorization': `Bearer ${token}` } });
    if (data.data.length > 0) {
        return data.data
    } else {
        return -1
    };
}

export const createFlightInspiration = async (flightInspiration: any) => {
    // console.log(flightInspiration);
    const response = await axios.post(`${REMOTE_SERVER}/api/flightInspiration/`, flightInspiration);
    return response.data;
}

export const findAllSearchHistory = async () => {
    const response = await axios.get(`${REMOTE_SERVER}/api/flightInspiration/`);
    return response.data;
}

export const findPostsByCity = async (city:String) => {
    const response = await axios.get(`${REMOTE_SERVER}/api/posts/getPostsByLocation/${city}`);
    return response.data;
}

export const findPostsByCityAndCountry = async (city:String, country:String) => {
    const response = await axios.get(`${REMOTE_SERVER}/api/posts/getPostsByLocation?city=${city}&country=${country}`);
    return response.data;
}

export const findPostsByQuery = async (query:String) => {
    const response = await axios.get(`${REMOTE_SERVER}/api/posts/getPostsByQuery?query=${query}`);
    return response.data;
}