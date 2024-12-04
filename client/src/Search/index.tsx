import { useEffect, useState } from "react";
import * as client from "./client";

export default function Search() {
    const [search_params, setSearch_params] = useState({ origin: "MAD", one_way: false, nonstop: false, max_price: 999999 });
    const [data, setData] = useState([{ "id": 1 }]);
    const [data_loaded, setData_loaded] = useState(false);
    const getFlightData = async (origin: string, one_way: boolean, nonstop: boolean, max_price?: number) => {
        try {
            const response = await client.get_flight_inspo_data(origin, one_way, nonstop, max_price);
            setData_loaded(true);
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
                <button onClick={(e) => {
                    e.preventDefault();
                    if (!search_params.origin) {
                        alert("Please select an origin.")
                    } else {
                        getFlightData(search_params.origin, search_params.one_way, search_params.nonstop, search_params.max_price)
                    }
                }
                }>Get Flight Insperation</button>
            </form>
            <ul>
                {data_loaded && data.map((object: any) => (
                    <div>
                        <li>
                            <div>Origin: {object.origin}</div>
                            <div>Destination: {object.destination}</div>
                            <div>Departure Date: {object.departureDate}</div>
                            <div>Return Date: {object.returnDate}</div>
                            {object && object.price && <div>Price: {JSON.stringify(object.price.total, null, 2)}</div>}
                            <a href={`/search/${object.destination}`}>
                            <button>Get More Inspiration!</button>
                            </a>
                            
                            <br />
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}