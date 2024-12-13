import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as searchClient from "../client"
import Nav from "../../Nav/index";
import { useSelector } from "react-redux";
import HeaderLogo from "../../Home/HeaderLogo";
import { Link } from "react-router-dom";

export default function SearchDetails() {
    const { currentUser } = useSelector((state: any) => state.userReducer);
    const { airportCode } = useParams();
    const [locationData, setLocationData] = useState<any>();
    const [posts, setPosts] = useState<any>();
    const getLocationAndRelatedPosts = async () => {
        const cityData = await getCityFromAirportCode();
        // await findRelatedPostsByCity(cityData.name);
        await findRelatedPostsByCityAndCountry(cityData.address.cityName, cityData.address.countryName)
    }
    const getCityFromAirportCode = async () => {
        if (airportCode) {
            const response = await searchClient.get_airport_city_details(airportCode);
            if (response.length > 0) {
                setLocationData(response[0]);
                return response[0]
            } else {
                setLocationData(-1);
            }
        } else {
            throw ("Missing airportCode");
        }
    };
    const findRelatedPostsByCityAndCountry = async (city: String, country: String) => {
        const response = await searchClient.findPostsByCityAndCountry(city, country);
        setPosts(response);
    }
    useEffect(() => {
        if (!locationData) {
            getLocationAndRelatedPosts();
        }
    }, []);
    return (
        <div>
            <Nav />
            <HeaderLogo />
            {locationData && <h3 className="mx-4 mt-2">Here are some recent posts related to {locationData.address.cityName}, {locationData.address.countryName}:</h3>}
            <ul className="post-list list-group">
                {posts && posts.map((post: any) => {
                    const imageData = "data:image/png;base64," + String.fromCharCode(...post.photo.data);
                    return (
                        <div className="">
                            <li className="post-card card m-2 ">
                                {<img src={imageData} alt={post.destinationCountry} className="m-4" />}
                                <div className="card-body">
                                    <div><b>{post.destinationCity}, {post.destinationCountry}</b></div>
                                    <div>{post.caption}</div>
                                    <Link to={`/profile/${post.poster}`} className="">{post.poster}</Link>
                                    <br />
                                </div>
                            </li>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}