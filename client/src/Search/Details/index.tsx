import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as searchClient from "../client"

export default function SearchDetails() {
    const { airportCode } = useParams();
    const [locationData, setLocationData] = useState<any>();
    const [posts, setPosts] = useState<any>();
    const getLocationAndRelatedPosts = async () => {
        const cityData = await getCityFromAirportCode();
        await findRelatedPostsByCity(cityData.name);
    }
    const getCityFromAirportCode = async () => {
        if (airportCode) {
            const response = await searchClient.get_airport_city_details(airportCode);
            setLocationData(response[0]);
            return response[0]
        } else {
            throw ("Missing airportCode");
        }
    };
    const findRelatedPostsByCity = async (city:String) => {
        const response = await searchClient.findPostsByCity(city);
        setPosts(response);
    }
    useEffect(() => {
        if (!locationData) {
            getLocationAndRelatedPosts();
        }
    }, []);
    return (
        <div>
            <h1>Search Results</h1>
            <h2>{locationData && locationData != -1 && JSON.stringify(locationData.name)}</h2>
            <h2>{locationData && locationData != -1 && JSON.stringify(locationData.address.countryName)}</h2>
            <br /><br />
            <h3>{posts && JSON.stringify(posts)}</h3>
        </div>
    )
}