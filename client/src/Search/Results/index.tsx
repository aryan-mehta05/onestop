import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as searchClient from "../client"

export default function SearchResults() {
    const { airportCode } = useParams();
    const [data, setData] = useState();
    const getCityFromAirportCode = async () => {
        if (airportCode) {
            const cityName = await searchClient.get_airport_city_details(airportCode);
            setData(cityName);
        } else {
            throw ("Missing airportCode");
        }
    }
    useEffect(() => {
        getCityFromAirportCode();
    }, []);
    return (
        <div>
            <h1>Search Results</h1>
            <h2>{JSON.stringify(data)}</h2>
        </div>
    )
}