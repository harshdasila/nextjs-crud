"use client"
import React from "react";
import Link from 'next/link';
import { UserListProps, UserStateData } from "@/interfaces/frontend";
import { useRecoilValue } from "recoil";
import { useRouter } from 'next/navigation'
import { useUserContext } from "@/contexts/userContext";


const UserList: React.FC<UserListProps> = ({ userr, handleDelete }) => {
  const {user_id, user_name, user_email, user_number, user_created_at, um_roles } = userr;
  const { user, setUser } = useUserContext();
  const router = useRouter();
  // if(userStateData?.role_id !== 1 ){
  //   navigate('/list-user')
  // }
  return (
    <tr className="odd:bg-white odd:bg-opacity-50 even:bg-gray-100 border-b border-gray-200 dark:border-gray-700 text-black">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black"
      >
        {user_name}
      </th>
      <td className="px-6 py-4">{user_email}</td>
      {/* <td className="px-6 py-4">{user_name}</td> */}
      <td className="px-6 py-4">{user_number}</td>
      <td className="px-6 py-4">{user_created_at.substring(0,10)}</td>
      <td className="px-6 py-4">{um_roles.role_name}</td>
      <td className="px-6 py-4">
        <Link href={`/user-details/${user_id}`}>
          <div className="font-medium text-black hover:underline dark:text-black">
            Click Here
          </div>
        </Link>
      </td>
      <td>
        {user?.role_id === 1 && <div className="flex justify-center items-center">
          <button
            onClick={() => handleDelete(user_id)}
            className="font-medium text-black hover:underline dark:text-black mr-2"
          >
            Delete
          </button>
          <Link href={`/edit/${user_id}`}>
            <button className="font-medium text-black hover:underline dark:text-black mr-2">
              Edit
            </button>
          </Link>
        </div>}
      </td>
    </tr>
  );
};

export default UserList;
