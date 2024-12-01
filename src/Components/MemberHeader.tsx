import React from "react";
import { Row, Container, Col, Image } from "react-bootstrap";

import Avatar from "../images/user.png";
import Followers from "../images/followers.png";
import Following from "../images/following.png";
import { getCurrentUser } from "../Storage/LocalStorage";
import {
  removeFollower,
  saveFollower,
  getFollowing,
  getFollowers,
  getMembers,
} from "../Storage/LocalStorage";

export default function Header() {
  const user = getCurrentUser();
  let name = user ? user.firstName + " " + user.lastName : "";
  const followers = getFollowing(user ? user.userName : "");
  const following = getFollowers(user ? user.userName : "");

  return (
    <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark header center">
      <div className="row">
        <div className="col-sm-4">
          <div className="card bg-dark">
            <div className="card-body">
              <Image src={Avatar} rounded />
              <br />
              <h3 className="card-title">{name}</h3>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card bg-dark">
            <div className="card-body">
              <Image src={Followers} className="rounded-circle" />
              <br />
              <h3 className="card-title">Follows ({following.length})</h3>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card bg-dark">
            <div className="card-body">
              <Image src={Following} className="rounded-circle" />
              <br />
              <h3 className="card-title">Following ({followers.length})</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
