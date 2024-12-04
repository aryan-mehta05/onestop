import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as searchClient from "../client"

export default function SearchResults() {
    const { airportCode } = useParams();
    const [data, setData] = useState<any>();
    const getCityFromAirportCode = async () => {
        if (airportCode) {
            const response = await searchClient.get_airport_city_details(airportCode);
            setData(response);
        } else {
            throw ("Missing airportCode");
        }
    }
    useEffect(() => {
        if (!data) {
            getCityFromAirportCode();
        }
    }, []);
    return (
        <div>
            <h1>Search Results</h1>
            <h2>{data && data != -1 && JSON.stringify(data[0].name)}</h2>
            <h2>{data && data != -1 && JSON.stringify(data[0].address.countryName)}</h2>
        </div>
    )
}