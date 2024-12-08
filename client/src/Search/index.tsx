import { useEffect, useState } from "react";
import * as client from "./client";
// import { useAuth } from '../Auth/AuthContext';
// import { AuthProvider } from '../Auth/AuthContext';

export default function Search() {
    const [search_params, setSearch_params] = useState({ origin: "MAD", one_way: false, nonstop: false, max_price: 999999 });
    const [data, setData] = useState([{ "id": 1 }]);
    const [data_loaded, setData_loaded] = useState(false);
    const [history, setHistory] = useState([]);
    // const auth = useAuth();
    const getFlightData = async (origin: string, one_way: boolean, nonstop: boolean, max_price?: number) => {
        try {
            const response = await client.get_flight_inspo_data(origin, one_way, nonstop, max_price);
            setData_loaded(true);
            setData(response.data);
            for (const key in response.data) {
                let origin = response.data[key].origin;
                let destination = response.data[key].destination;
                let departureDate = response.data[key].departureDate;
                let returnDate = response.data[key].returnDate;
                let price = response.data[key].price.total;
                client.createFlightInspiration({
                    origin: origin,
                    destination: destination,
                    departureDate: departureDate,
                    returnDate: returnDate,
                    price: price
                })
            }
        } catch (error) {
            alert("Something went wrong.  Please ensure your origin is a valid Airport code.")
        }
    };
    const getAllSearchHistory = async () => {
        const response = await client.findAllSearchHistory();
        setHistory(response)
    }
    return (
        <div>
            {/* <h1>{auth.user ? auth.user.loginId : 'No User!'}</h1> */}
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
                <br /><br />
                <button className="bg-os-red border border-os-red text-white px-3 py-2 rounded-md hover:scale-110 transition-transform" onClick={(e) => {
                    e.preventDefault();
                    if (!search_params.origin) {
                        alert("Please select an origin.")
                    } else {
                        getFlightData(search_params.origin, search_params.one_way, search_params.nonstop, search_params.max_price)
                    }
                }
                }>Get Flight Inspiration</button>
                <br /><br />
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
                            <a href={`/details/${object.destination}`}>
                                <button>Get More Inspiration!</button>
                            </a>
                            <br /><br />
                        </li>
                    </div>
                ))}
            </ul>
            <button className="bg-white border border-os-red text-os-red px-3 py-2 rounded-md hover:scale-110 transition-transform" onClick={(e) => {
                e.preventDefault();
                getAllSearchHistory();
            }}>
                Search Result History
            </button>
            <br /><br />
            <h1>{history.length != 0 && "Past Search Results"}</h1>
            <ul>
                {history.length != 0 && history.map((object: any) => (
                    <div>
                        <li>
                            <div>Origin: {object.origin}</div>
                            <div>Destination: {object.destination}</div>
                            <div>Departure Date: {object.departureDate}</div>
                            <div>Return Date: {object.returnDate}</div>
                            {object && object.price && <div>Price: {JSON.stringify(object.price, null, 2)}</div>}
                            <a href={`/details/${object.destination}`}>
                                <button >Get More Inspiration!</button>
                            </a>
                            <br /><br />
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}