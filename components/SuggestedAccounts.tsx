import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { GoVerified } from "react-icons/go";
import { IUser } from "../types";

interface IProps {
  fetchAllUsers: () => void;
  allUsers: IUser[];
}
const SuggestedAccounts: NextPage<IProps> = ({ fetchAllUsers, allUsers }) => {
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const users = allUsers
    ?.sort(() => 0.5 - Math.random())
    .slice(0, allUsers.length);

  return (
    <div className="xl:border-b-2 border-gray-200 pb-4 hidden xs:block">
      <p className="text-gray-300 text-sm text-center md:text-start xl:text-base font-semibold m-3 mt-4 hidden sm:block">
        Suggested Accounts
      </p>
      <div>
        {users.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex items-center justify-center md:justify-start gap-3 hover:bg-gray-700 p-2 cursor-pointer font-semibold rounded">
              <div className="w-8 h-8">
                <Image
                  width={34}
                  height={34}
                  src={user.image || "/defaultProfileImage.png"}
                  alt="User Profile"
                  className="rounded-full"
                />
              </div>
              <div className="hidden md:block">
                <p className="flex gap-1 items-center text-md font-bold text-white lowercase">
                  {user.userName.replace(/\s+/g, "")}{" "}
                  <GoVerified className="text-blue-400" />
                </p>
                <p className="capitalize text-gray-400 text-sm">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
