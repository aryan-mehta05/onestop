import { useState } from "react";
import * as client from "./client";
import { useSelector } from "react-redux";
import Nav from "../Nav/index";
import { Link } from "react-router-dom";
import HeaderLogo from "../Home/HeaderLogo";

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
        <div className="">
            <Nav />
            <HeaderLogo />
            <div className="post-list">
                <div className="card post-card p-4 mb-4 ms-4">
                    <h1>Search</h1>
                    <form>
                        <label className="form-label" htmlFor="origin-input">Origin: </label>
                        <input className="border px-2 rounded ms-2" id="origin-input" type="text" onChange={(e) => setSearch_params({ ...search_params, origin: e.target.value })} />
                        <br />
                        <label className="form-label" htmlFor="one-way-input">One Way? </label>
                        <input className="mx-2" id="one-way-input" type="checkbox" onChange={(e) => setSearch_params({ ...search_params, one_way: !search_params.one_way })} />
                        <br />
                        <label className="form-label" htmlFor="nonstop-input">Nonstop?</label>
                        <input className="mx-2" id="nonstop-input" type="checkbox" onChange={(e) => setSearch_params({ ...search_params, nonstop: !search_params.nonstop })} />
                        <br />
                        <label htmlFor="max-price-input">Max Price (optional): </label>
                        <input className="border px-2 rounded ms-2" id="max-price-input" type="number" onChange={(e) => setSearch_params({ ...search_params, max_price: parseInt(e.target.value) })} />
                        <br /><br />
                        <button className="btn btn-primary" onClick={(e) => {
                            e.preventDefault();
                            if (!search_params.origin) {
                                alert("Please select an origin.")
                            } else {
                                getFlightData(search_params.origin, search_params.one_way, search_params.nonstop, search_params.max_price)
                            }
                        }
                        }>
                            Get Flight Inspiration
                        </button>
                        <button className="btn btn-secondary float-end" onClick={(e) => {
                            e.preventDefault();
                            getAllSearchHistory();
                        }}>
                            Search Result History
                        </button>
                    </form>
                </div>
            </div>

            <div className="post-list">
                <ul>
                    {data_loaded && data.map((object: any) => (
                        <div className="card post-card p-2 mb-2">
                            <li className="">
                                <div>Origin: <b>{object.origin}</b></div>
                                <div>Destination: <b>{object.destination}</b></div>
                                <div>Departure Date: <b>{object.departureDate}</b></div>
                                <div>Return Date: <b>{object.returnDate}</b></div>
                                {object && object.price && <div>Price: <b>{object.price.total}</b></div>}
                                <Link className="float-end me-2" to={`/details/${object.destination}`}><button>Get More Inspiration!</button></Link>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>

            <div className="post-list">
                {/* <h1>{history.length != 0 && "Past Search Results"}</h1> */}
                <ul className="">
                    {history.length != 0 && history.map((object: any) => (
                        <div className="card post-card p-2 mb-2">
                            <li className="list-group-item">
                                <div>Origin: <b>{object.origin}</b></div>
                                <div>Destination: <b>{object.destination}</b></div>
                                <div>Departure Date: <b>{object.departureDate.substring(0, 10)}</b></div>
                                <div>Return Date: <b>{object.returnDate.substring(0, 10)}</b></div>
                                {object && object.price && <div>Price: <b>{object.price}</b></div>}
                                <Link className="float-end me-2" to={`/details/${object.destination}`}><button>Get More Inspiration!</button></Link>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>

        </div>
    )
}