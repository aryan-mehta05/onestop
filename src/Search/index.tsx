import { useEffect, useState } from "react";
import * as client from "./client";

export default function Search() {
    const [search_params, setSearch_params] = useState({ origin: "MAD", one_way: false, nonstop: false, max_price: 999999 });
    const [data, setData] = useState([{ "id": 1 }]);
    const testAPI = async (origin: string, one_way: boolean, nonstop: boolean, max_price?: number) => {
        try {
            const response = await client.test_api(origin, one_way, nonstop, max_price);
            setData(response.data);
        } catch (error) {
            alert("Something went wrong.  Please ensure your origin is a valid Airport code.")
        }
    };
    // useEffect(() => {
    //     testAPI();
    // }, []);
    return (
        <div>
            <h1>Search</h1>
            <form action="">
                <label htmlFor="origin-input">Origin: </label>
                <input id="origin-input" type="text" onChange={(e) => setSearch_params({ ...search_params, origin: e.target.value })} />
                <br />
                <label htmlFor="one-way-input">One Way? </label>
                <input id="one-way-input" type="checkbox" onChange={(e) => setSearch_params({ ...search_params, one_way: !search_params.one_way })} />
                <br />
                <label htmlFor="nonstop-input">Nonstop?</label>
                <input id="nonstop-input" type="checkbox" onChange={(e) => setSearch_params({ ...search_params, nonstop: !search_params.nonstop })} />
                <br />
                <label htmlFor="max-price-input">Max Price (optional): </label>
                <input id="max-price-input" type="number" onChange={(e) => setSearch_params({ ...search_params, max_price: parseInt(e.target.value) })} />
                <br />
                <button onClick={() => {
                    if (!search_params.origin) {
                        alert("Please select an origin.")
                    } else {
                        testAPI(search_params.origin, search_params.one_way, search_params.nonstop, search_params.max_price)
                    }
                }
                }>alert</button>
            </form>
            <ul>
                {data.map((object: any) => (
                    <div>
                        <li>
                            <div>Origin: {object.origin}</div>
                            <div>Destination: {object.destination}</div>
                            <div>Departure Date: {object.departureDate}</div>
                            <div>Return Date: {object.returnDate}</div>
                            {object && object.price && <div>Price: {JSON.stringify(object.price.total, null, 2)}</div>}
                            <br />
                        </li>
                        {/* <li>{JSON.stringify(object, null, 2)}</li> */}
                    </div>
                ))}
            </ul>
        </div>
    )
}

// { "type": "flight-destination", "origin": "BOS", "destination": "LAX", "departureDate": "2024-12-10", "returnDate": "2024-12-11", "price": { "total": "188.20" }, "links": { "flightDates": "https://test.api.amadeus.com/v1/shopping/flight-dates?origin=BOS&destination=LAX&departureDate=2024-11-18,2025-05-16&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION", "flightOffers": "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=BOS&destinationLocationCode=LAX&departureDate=2024-12-10&returnDate=2024-12-11&adults=1&nonStop=false" } }
// { "type": "flight-destination", "origin": "BOS", "destination": "LHR", "departureDate": "2025-01-18", "returnDate": "2025-01-19", "price": { "total": "321.31" }, "links": { "flightDates": "https://test.api.amadeus.com/v1/shopping/flight-dates?origin=BOS&destination=LHR&departureDate=2024-11-18,2025-05-16&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION", "flightOffers": "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=BOS&destinationLocationCode=LHR&departureDate=2025-01-18&returnDate=2025-01-19&adults=1&nonStop=false" } }
// { "type": "flight-destination", "origin": "BOS", "destination": "CDG", "departureDate": "2024-12-02", "returnDate": "2024-12-08", "price": { "total": "360.31" }, "links": { "flightDates": "https://test.api.amadeus.com/v1/shopping/flight-dates?origin=BOS&destination=CDG&departureDate=2024-11-18,2025-05-16&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION", "flightOffers": "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=BOS&destinationLocationCode=CDG&departureDate=2024-12-02&returnDate=2024-12-08&adults=1&nonStop=false" } }
// { "type": "flight-destination", "origin": "BOS", "destination": "DUB", "departureDate": "2025-01-07", "returnDate": "2025-01-11", "price": { "total": "377.91" }, "links": { "flightDates": "https://test.api.amadeus.com/v1/shopping/flight-dates?origin=BOS&destination=DUB&departureDate=2024-11-18,2025-05-16&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION", "flightOffers": "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=BOS&destinationLocationCode=DUB&departureDate=2025-01-07&returnDate=2025-01-11&adults=1&nonStop=false" } }
// { "type": "flight-destination", "origin": "BOS", "destination": "BCN", "departureDate": "2025-01-12", "returnDate": "2025-01-17", "price": { "total": "386.21" }, "links": { "flightDates": "https://test.api.amadeus.com/v1/shopping/flight-dates?origin=BOS&destination=BCN&departureDate=2024-11-18,2025-05-16&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION", "flightOffers": "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=BOS&destinationLocationCode=BCN&departureDate=2025-01-12&returnDate=2025-01-17&adults=1&nonStop=false" } }
// { "type": "flight-destination", "origin": "BOS", "destination": "FCO", "departureDate": "2025-01-16", "returnDate": "2025-01-23", "price": { "total": "415.71" }, "links": { "flightDates": "https://test.api.amadeus.com/v1/shopping/flight-dates?origin=BOS&destination=FCO&departureDate=2024-11-18,2025-05-16&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION", "flightOffers": "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=BOS&destinationLocationCode=FCO&departureDate=2025-01-16&returnDate=2025-01-23&adults=1&nonStop=false" } }
// { "type": "flight-destination", "origin": "BOS", "destination": "MAD", "departureDate": "2025-01-19", "returnDate": "2025-01-31", "price": { "total": "418.51" }, "links": { "flightDates": "https://test.api.amadeus.com/v1/shopping/flight-dates?origin=BOS&destination=MAD&departureDate=2024-11-18,2025-05-16&oneWay=false&duration=1,15&nonStop=false&viewBy=DURATION", "flightOffers": "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=BOS&destinationLocationCode=MAD&departureDate=2025-01-19&returnDate=2025-01-31&adults=1&nonStop=false" } }