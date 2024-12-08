import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as searchClient from "../client"

export default function SearchBarResults() {
    const { query } = useParams();
    const [posts, setPosts] = useState<any>();
    const findRelatedPostsByQuery = async (query:String) => {
        const response = await searchClient.findPostsByQuery(query);
        setPosts(response);
    }
    useEffect(() => {
        findRelatedPostsByQuery(query as String);
    }, []);
    return (
        <div>
            <div>SearchBarResults!</div>
            <div>{`Search Criteria: ${query}`}</div>
            <br />
            <ul>
                {posts && posts.map((object: any) => (
                    <div>
                        <li className="border">
                            <div>{object.photo}</div>
                            <div>{object.destinationCity}, {object.destinationCountry}</div>
                            <div>{object.caption}</div>
                            <div>{object.poster}</div>
                            <br />
                        </li>
                    </div>
                ))}
            </ul>
        </div>
        
    )
}
