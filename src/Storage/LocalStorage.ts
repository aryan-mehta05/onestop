import React from "react";

/** Dataset Keys */
const USER_LIST = "user_list";
const TRIP_LIST = "trip_list";
const FOLLOWING_LIST = "following_list";

/** Keep track of current user */
const CURRENT_USER = "current_user";

/** User Interface */
export interface User {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}

/** Login Data */
export interface LoginModel {
  userName: string;
  password: string;
}

/** Interface for Following */
export interface IFollowing {
  userName: string;
  follower: string;
}

/** Trip Interface */
export interface Trip {
  name: string;
  type: string;
  duration: number;
  userName: string;
}

/** Get Trips of the current user */
const getTrips = (userName: string): Trip[] => {
  const data = localStorage.getItem(TRIP_LIST) || "[]";
  const trips = JSON.parse(data) as Trip[];
  console.log("Here inside getTrips");
  console.log(trips);
  let list = trips.filter(function (el) {
    return el.userName === userName;
  });

  return list;
};

/** Function to store new Trip */
const saveTrip = (trip: Trip) => {
  const data = localStorage.getItem(TRIP_LIST) || "[]";
  const trips = JSON.parse(data) as Trip[];
  trips.push(trip);
  localStorage.setItem(TRIP_LIST, JSON.stringify(trips));
  console.log(trip);
};

/** Register new user and store into local storage */
const registerUser = (user: User) => {
  const data = localStorage.getItem(USER_LIST) || "[]";
  const users = JSON.parse(data) as User[];
  users.push(user);
  localStorage.setItem(USER_LIST, JSON.stringify(users));
  console.log(users);
};

/** Check if Username already taken */
const isUserExist = (userName: string): boolean => {
  const data = localStorage.getItem(USER_LIST) || null;

  if (data === null) {
    return false;
  }

  const users = JSON.parse(data) as User[];
  const user = users.find((x) => x.userName === userName);

  return user != null;
};

const getExistingUser = (userName: string, password: string) => {
  const data = localStorage.getItem(USER_LIST) || null;

  if (data === null) {
    return null;
  }

  const users = JSON.parse(data) as User[];
  const foundUser = users.find(
    (x) => x.userName === userName && x.password === password
  );

  return foundUser;
};

const setCurrentUser = (user: User | undefined | null) => {
  localStorage.setItem(CURRENT_USER, JSON.stringify(user));
};

const getCurrentUser = (): User | null | undefined => {
  const activeUser = localStorage.getItem(CURRENT_USER) || null;
  if (activeUser === null) return null;
  else if (activeUser === undefined) return undefined;
  console.log("HERE");
  console.log(activeUser);
  return JSON.parse(activeUser);
};

const removeCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER);
};

/** Get All the registered users except current user */
const getMembers = (userName: string): User[] => {
  const data = localStorage.getItem(USER_LIST) || "[]";
  const members = JSON.parse(data) as User[];
  console.log("Here inside getMembers");
  console.log(members);
  let list = members.filter(function (el) {
    return el.userName !== userName;
  });

  return list;
};

/** Get all the followers of a given username */
const getFollowers = (userName: string): IFollowing[] => {
  const data = localStorage.getItem(FOLLOWING_LIST) || "[]";
  const following = JSON.parse(data) as IFollowing[];
  console.log("Here inside getFollowers");
  console.log(following);
  let list = following.filter(function (el) {
    return el.userName !== userName;
  });

  return list;
};

/** Get all the followers of a given username */
const getFollowing = (userName: string): IFollowing[] => {
  const data = localStorage.getItem(FOLLOWING_LIST) || "[]";
  const following = JSON.parse(data) as IFollowing[];
  console.log("Here inside getFollowers");
  console.log(following);
  let list = following.filter(function (el) {
    return el.follower !== userName;
  });

  return list;
};

/** Function to save Following */
const saveFollower = (following: IFollowing) => {
  const data = localStorage.getItem(FOLLOWING_LIST) || "[]";
  const list = JSON.parse(data) as IFollowing[];
  list.push(following);
  localStorage.setItem(FOLLOWING_LIST, JSON.stringify(list));
  console.log(list);
};

/** Function to save Following */
const removeFollower = (following: IFollowing) => {
  const data = localStorage.getItem(FOLLOWING_LIST) || "[]";
  let list = JSON.parse(data) as IFollowing[];

  // filter the list and remove following
  list = list.filter(function (el) {
    return (
      el.userName !== following.userName && el.follower === following.follower
    );
  });

  // store back to local storage
  localStorage.setItem(FOLLOWING_LIST, JSON.stringify(list));
  console.log(list);
};

export {
  registerUser,
  isUserExist,
  getExistingUser,
  getCurrentUser,
  setCurrentUser,
  getTrips,
  saveTrip,
  removeCurrentUser,
  removeFollower,
  saveFollower,
  getFollowing,
  getFollowers,
  getMembers,
};
