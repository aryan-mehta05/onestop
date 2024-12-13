import { useState } from "react";
import * as client from "./client";
import { useSelector } from "react-redux";
import Nav from "../Nav/index";
import { Link } from "react-router-dom";

export default function Search() {
    const [search_params, setSearch_params] = useState({ origin: "MAD", one_way: false, nonstop: false, max_price: 999999 });
    const [data, setData] = useState([{ "id": 1 }]);
    const [data_loaded, setData_loaded] = useState(false);
    const [history, setHistory] = useState([]);
    const { currentUser } = useSelector((state: any) => state.userReducer);
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
            alert("Something went wrong. Please ensure your origin is a valid Airport code.")
        }
    };
    const getAllSearchHistory = async () => {
        console.log(currentUser)
        const response = await client.findAllSearchHistory();
        setHistory(response)
    }
    return (
        <div>
            {/* <h1>{auth.user ? auth.user.loginId : 'No User!'}</h1> */}
            <Nav />
            <h1>Search</h1>
            <h2>hello {currentUser.username}</h2>
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
                <button onClick={(e) => {
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
                        <li className="border">
                            <div>Origin: {object.origin}</div>
                            <div>Destination: {object.destination}</div>
                            <div>Departure Date: {object.departureDate}</div>
                            <div>Return Date: {object.returnDate}</div>
                            {object && object.price && <div>Price: {JSON.stringify(object.price.total, null, 2)}</div>}
                            <Link to={`/details/${object.destination}`}><button>Get More Inspiration!</button></Link>
                            <br /><br />
                        </li>
                    </div>
                ))}
            </ul>
            <button onClick={(e) => {
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
                        <li className="border">
                            <div>Origin: {object.origin}</div>
                            <div>Destination: {object.destination}</div>
                            <div>Departure Date: {object.departureDate}</div>
                            <div>Return Date: {object.returnDate}</div>
                            {object && object.price && <div>Price: {JSON.stringify(object.price, null, 2)}</div>}
                            <Link to={`/details/${object.destination}`}><button>Get More Inspiration!</button></Link>
                            <br /><br />
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}