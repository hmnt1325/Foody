import { useState, useEffect, useContext, useRef } from "react";
import { restaurantList, api, restaurants } from "../constants";
import RestaurantCard from "./RestrauntCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";

import UserContext from "../utils/UserContext";
import FilteredRestraunt from "./FilteredRestraunt";
// Body Component for body section: It contain all restaurant cards
// We are mapping restaurantList array and passing JSON data to RestaurantCard component as props with unique key as index
const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  // useState: To create a state variable, searchText is local state variable
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  // Using use Effect
  // Empty dependency array ==>once after rerender
  // dep array [searchText] ==> once after initial render + everytime after rerender(my search Text)
  const { user, setUser } = useContext(UserContext);
  const searchInputRef = useRef(null);
  useEffect(() => {
    getRestraunts();
  }, []);

  async function getRestraunts() {
    try {
      const data = await fetch(api);
      const json = await data.json();
      // optional chaining
      // console.log(json);
      // setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
      // setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);

      setAllRestaurants(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setFilteredRestaurants(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
        // json?.data?.cards[0]
      );

      // console.log(
      //   json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants[0].info
      // );
    } catch (error) {
      console.log("Enable cors extension");
      setAllRestaurants(restaurants);
      setFilteredRestaurants(
        restaurants
        // json?.data?.cards[0]
      );
    }
    // https://thingproxy.freeboard.io/fetch/
  }
  // COnditional Rendering
  // if restaurant is empty => Shimmer UI
  // if restraunt has data =>actual data UI

  const isOnline = useOnline();
  if (!isOnline) {
    return <h1>⚠🔴Offline, Please check your internet connection !!</h1>;
  }
  // const handleKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     const data = filterData(searchText, allRestaurants);
  //     // update the state of restaurants list
  //     setFilteredRestaurants(data);
  //   }
  // }
  // not render component (Early return )
  if (!allRestaurants) return null;
  // if(filteredRestaurants?.length === 0) return <h1>No Restarunt match your Filter ... !</h1>

  return allRestaurants?.length === 0 ? (
    <Shimmer />
  ) : filteredRestaurants.length === 0 ? (
    <FilteredRestraunt />
  ) : (
    <>
      <div className="bg-slate-50 flex-grow">
        <div className="my-12 flex items-center justify-center">
          <div className="flex justify-between w-1/3 border border-slate-400 border-1 focus:w-2/3 ">
            <input
              type="text"
              ref={searchInputRef}
              className="p-3 grow h-12 w-[90%] focus:outline-none"
              placeholder="Search a restaurant "
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchInputRef.current.blur(); // unfocus the input element
                  document.getElementById("search-btn").click(); // trigger the search button click event
                }
              }}
            />
            <button
              id="search-btn"
              className="p-3 "
              data-testid="search-btn"
              onClick={() => {
                // filter the data
                const data = filterData(searchText, allRestaurants);
                // update the state of restaurants list
                setFilteredRestaurants(data);
              }}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
          {/* <input
            className="p-3"
            value={user.name}
            onChange={(e) =>
              setUser({
                name: e.target.value,
                email: "Hemant12@gmail.com",
              })
            }
          /> */}
        </div>
        <div className="flex flex-wrap justify-center" data-testid="res-list">
          {filteredRestaurants.map((restaurant) => {
            return (
              <Link
                to={"/restaurant/" + restaurant.info.id}
                key={restaurant.info.id}
              >
                <RestaurantCard {...restaurant.info} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Body;
