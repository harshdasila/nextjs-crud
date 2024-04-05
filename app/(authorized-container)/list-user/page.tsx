"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import SearchInput from "@/components/search-input";
import UserList from "@/components/user-list";
import axios from "axios";
import Loader from "@/components/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/components/pagination";
import { toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/services/frontend/storage.service";
import { deleteUser } from "@/actions/user.action";
// import { useRecoilState } from "recoil";
// import { userState } from "../state/UserDataState";
// import { UserStateData } from "../interfaces";
// import { useUserData } from "../hooks/useUserData";

const ListUsers = () => {
  //   useUserData();
  //   const [userStateData, setUserStateData] =
  //     useRecoilState<UserStateData>(userState);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("user_created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [input, setInput] = useState<string>("");
  const [page, setPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [totalUsers, setTotalUser] = useState(0);

  const jwtToken = getAuthToken();

  const router = useRouter();

  function userDeletedMessage() {
    toast.success("User Deleted Successfully!");
  }

  async function getUserData() {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/user/list?sortBy=${sortBy}&sortOrder=${sortOrder}&searchQuery=${input}&recordsPerPage=${recordsPerPage}&page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: jwtToken,
          },
        }
      );
      setUserData(res.data.list);
      if (res.data.list.length < 1 && page != 1) {
        setPage((page) => page - 1);
      }
      setLoading(false);
      setTotalUser(res.data.totalUsers);
    } catch (error) {
      console.log(error);
      router.push("/login");
      throw new Error("cant get auth token");
    }
  }

  async function handleDelete(userId: number) {
    const res = await deleteUser(userId);
    if (res) {
      userDeletedMessage();
      console.log("User deleted successfully");
      await getUserData();
    } else {
      console.log("error in deleteing");
    }
  }

  function requestSort(props: string) {
    setSortBy(props);
  }

  // const totalUsers = userData.length;
  const totalPages = Math.ceil(totalUsers / recordsPerPage);

  function goAhead() {
    if (page < totalPages) {
      setPage((page) => page + 1);
    }
  }
  function goBehind() {
    if (page > 1) setPage((page) => page - 1);
  }

  useEffect(() => {
    getUserData();
  }, [page, totalUsers, recordsPerPage]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {/* <Toaster richColors position="top-right"/> */}
      <div className="flex justify-center  h-screen">
        <div className="relative sm:rounded-lg">
          <div className="text-3xl font-bold text-center mt-2 p-4 rounded-lg">
            ListUsers
          </div>
          <br></br>
          <SearchInput
            sortBy={sortBy}
            setUserData={setUserData}
            sortOrder={sortOrder}
            input={input}
            setInput={setInput}
            recordsPerPage={recordsPerPage}
            page={page}
            setPage={setPage}
            setTotalUsers={setTotalUser}
          />

          {
            /*userStateData?.role_id === 1 &&*/ <Link
              className="text-white w-[100px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-end"
              href={"/add-user"}
            >
              Add User
            </Link>
          }
          <br></br>
          <br></br>
          <table className="table-fixed w-auto p-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs  uppercase  bg-blue-600 text-white w-[700px]">
              <tr>
                <th scope="col" className="px-6 py-3 text-base">
                  <button
                    type="button"
                    onClick={() => {
                      requestSort("user_name");
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    Name{" "}
                    {sortBy == "user_name" ? (
                      sortOrder == "asc" ? (
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          style={{ color: "#fafafa" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          style={{ color: "#fafafa" }}
                        />
                      )
                    ) : null}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-base">
                  <button
                    type="button"
                    onClick={() => {
                      requestSort("user_email");
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    Email{" "}
                    {sortBy == "user_email" ? (
                      sortOrder == "asc" ? (
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          style={{ color: "#fafafa" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          style={{ color: "#fafafa" }}
                        />
                      )
                    ) : null}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-base w-[13rem]">
                  <button
                    type="button"
                    onClick={() => {
                      requestSort("user_number");
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    Phone Number{" "}
                    {sortBy == "user_number" ? (
                      sortOrder == "asc" ? (
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          style={{ color: "#fafafa" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          style={{ color: "#fafafa" }}
                        />
                      )
                    ) : null}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-base w-[13rem]">
                  <button
                    type="button"
                    onClick={() => {
                      requestSort("user_created_at"),
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    Created At{" "}
                    {sortBy == "user_created_at" ? (
                      sortOrder == "asc" ? (
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          style={{ color: "#fafafa" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          style={{ color: "#fafafa" }}
                        />
                      )
                    ) : null}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-base">
                  More Details
                </th>
                {
                  /*userStateData?.role_id === 1 && */ <th
                    scope="col"
                    className="px-6 py-3 text-base"
                  >
                    Options
                  </th>
                }
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => {
                const userId: number = user["user_id"];
                return (
                  <UserList
                    key={index}
                    user={user}
                    handleDelete={() => handleDelete(userId)}
                  />
                );
              })}
            </tbody>
          </table>
          <div className="selectRecordsContainer float-right mt-3">
            <label htmlFor="recordsPerPage">Records Per Page</label>
            <select
              id="recordsPerPage"
              onChange={(e) => setRecordsPerPage(Number(e.target.value))}
              value={recordsPerPage}
            >
              <option selected value="5">
                5
              </option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </div>

          <div className="text-xl p-2">Total Users: {totalUsers}</div>
          <Pagination
            pageProp={page}
            goAhead={goAhead}
            goBack={goBehind}
            page={page}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
};

export default ListUsers;
