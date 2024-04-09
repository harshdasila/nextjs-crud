"use client"
import React, { useState, FormEvent, useEffect } from "react";
import { SearchInputProps } from "@/interfaces/frontend";
import axios from "axios";

const SearchInput: React.FC<SearchInputProps> = ({
  sortBy,
  setUserData,
  sortOrder,
  input,
  setInput,
  recordsPerPage,
  page,
  setPage,
  setTotalUsers
}) => {
  // const [input, setInput] = useState<string>("");
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    //for sorting columns
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/list?sortBy=${sortBy}&sortOrder=${sortOrder}&searchQuery=${input}&recordsPerPage=${recordsPerPage}&page=${page}`,
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );
        setUserData(response.data?.list);
        // setTotalUsers(response.data?.totalUsers)
        setPage(1);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, [sortBy, sortOrder]); // Dependency array including sortBy

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const filteredData = await axios.get(
      `http://localhost:3000/api/v1/user/list?sortBy=${sortBy}&sortOrder=${sortOrder}&searchQuery=${input}&recordsPerPage=${recordsPerPage}&page=${page}`,
      {
        headers: {
          Authorization: jwtToken,
        },
      }
    );
    await setUserData(filteredData.data?.list);
    await setPage(1);
    await setTotalUsers(filteredData.data?.totalUsers)

  };

  const handleInputChange = async (e: any) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="max-w-md mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={handleInputChange}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50   dark:placeholder-gray-400  "
            placeholder="Search Mockups, Logos..."
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-black dark:hover:bg-black dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
