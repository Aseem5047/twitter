import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";
import { IUser } from "../types";

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { allUsers, userProfile }: any = useAuthStore();

  return (
    <div className=" pt-4 px-10 mt-4 bg-transparent text-white lg:pb-0 pb-[100px] w-full break-before-auto overflow-x-hidden overflow-y-scroll max-h-[500px] ">
      <div className="overflow-auto lg:h-[457px] border-t-2 border-gray-200 ">
        {comments?.length > 0 ? (
          comments?.map((item: IComment, idx: number) => (
            <>
              {allUsers?.map(
                (user: IUser) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div
                      className="flex gap-10 p-2 items-center first:mt-7 "
                      key={idx}
                    >
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="w-12 h-12">
                            <img
                              width={48}
                              height={48}
                              className="rounded-full cursor-pointer"
                              src={user.image || "/defaultProfileImage.png"}
                              alt="user-profile"
                            />
                          </div>

                          <p className="flex cursor-pointer gap-1 items-center text-sm lg:text-[18px] font-bold leading-6 text-primary">
                            {user.userName}{" "}
                            <GoVerified className="text-blue-400 hidden md:block" />
                          </p>
                        </div>
                      </Link>

                      <p className="text-[16px] flex-1 break-before-auto overflow-x-hidden overflow-y-scroll max-h-32 text-ellipsis whitespace-wrap">
                        {item.comment}
                        {item.comment}
                        {item.comment}
                        {item.comment}
                        {item.comment}
                        {item.comment}
                        {item.comment}
                        {item.comment}
                        {item.comment}
                        {item.comment}
                        {item.comment}
                      </p>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <div className="my-[2rem] md:mt-[4rem]">
            <NoResults text="No Comments Yet !" />
          </div>
        )}
      </div>
      {userProfile && (
        <div className="w-full absolute bottom-0 left-0  py-5 px-4 md:px-10 bg-[#15202b] z-20">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-primary px-6 py-4 text-md text-black font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
              placeholder="Add comment.."
            />
            <button
              className="text-md text-gray-400 hover:bg-white hover:text-black transition-all duration-500 hover:px-4 hover:py-2 rounded-xl"
              onClick={addComment}
            >
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
