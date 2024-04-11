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
import redirectAuthorizedPath from "@/lib/unauthorized-redirect";
import { useUserContext } from "@/contexts/userContext";
import Swal from 'sweetalert2'

const ListUsers = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("user_created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [input, setInput] = useState<string>("");
  const [page, setPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [totalUsers, setTotalUser] = useState(0);
  const { user, setUser } = useUserContext();
  const [swalProps, setSwalProps] = useState({});

  const jwtToken = getAuthToken();

  const router = useRouter();

  function userDeletedMessage() {
    toast.success("User Deleted Successfully!");
  }

  const Alert = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete the user!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Okay"
    });
  
    if (result.isConfirmed) {
      return true; // User confirmed the action 
    } else {
      return false; // User clicked cancel or closed the modal
    }
  };
  

  async function getUserData() {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/admin/user/list?sortBy=${sortBy}&sortOrder=${sortOrder}&searchQuery=${input}&recordsPerPage=${recordsPerPage}&page=${page}`,
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
    } catch (error: any) {
      console.log(error);
      redirectAuthorizedPath(error.response.status);
    }
  }

  async function handleDelete(userId: number) {
    const authHeader = getAuthToken();
    const confirmed = await Alert();
    
    if (confirmed) {
      const res = await deleteUser(userId, authHeader);
      if (res) {
        userDeletedMessage();
        await getUserData();
      } else {
        console.log("error in deleting");
      }
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
    axios
      .get("http://localhost:3000/api/v1/admin/settings", {
        headers: {
          Authorization: getAuthToken(),
        },
      })
      .then((res) => {
        const rowsPerPageSetting = res.data.res.find(
          (setting: { setting_key: string }) =>
            setting.setting_key === "rowsPerPage"
        );
        if (rowsPerPageSetting) {
          setRecordsPerPage(rowsPerPageSetting.setting_value);
        }
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
    getUserData();
  }, [page, recordsPerPage]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      {/* <Navbar /> */}
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
            input={input.trim()}
            setInput={setInput}
            recordsPerPage={recordsPerPage}
            page={page}
            setPage={setPage}
            setTotalUsers={setTotalUser}
          />

          {user?.role_id === 1 && (
            <Link
              className="text-white w-[100px] bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-white float-end"
              href={"/add-user"}
            >
              Add User
            </Link>
          )}
          <br></br>
          <br></br>
          <table className="table-fixed w-auto p-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs  uppercase  bg-black text-white w-[700px]">
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

                <th scope="col" className="px-6 py-3 text-base w-[13rem]">
                  <button
                    type="button"
                    onClick={() => {
                      requestSort("user_role"),
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    Roles{" "}
                    {sortBy == "user_role" ? (
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
                {user?.role_id === 1 && (
                  <th scope="col" className="px-6 py-3 text-base">
                    Options
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {userData.map((user: any, index) => {
                const userId: number = user["user_id"];
                // const roleId = user.user_role_id;
                return (
                  <UserList
                    key={index}
                    userr={user}
                    handleDelete={() => handleDelete(userId)}
                  />
                );
              })}
            </tbody>
          </table>
          {/* <div className="selectRecordsContainer float-right mt-3">
            <label htmlFor="recordsPerPage">Records Per Page</label>
            <select
              value={recordsPerPage}
              id="recordsPerPage"
              onChange={(e) => setRecordsPerPage(Number(e.target.value))}
            >
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div> */}

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
