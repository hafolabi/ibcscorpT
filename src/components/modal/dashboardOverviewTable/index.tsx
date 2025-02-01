import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { DasboardOverviewTableModalProps } from "../../../utiliz/interfaces";

const DasboardOverviewTableModal = ({
  actionType,
  setOpenModal,
  setActionType,
  setTitle,
  setBody,
  title,
  isPosting,
  body,
  deletePostHandler,
  editPostHandler,
  createPostHandler,
}: DasboardOverviewTableModalProps) => {
  return (
    <div>
      {/* Modal Header */}
      <div className="flex justify-between items-cente text-[20px] font-[500] mb-4">
        {actionType === "edit" ? (
          <p>Edit</p>
        ) : actionType === "delete" ? (
          <p />
        ) : (
          <p>Create</p>
        )}
        <p
          onClick={() => {
            setOpenModal(false);
            setActionType("");
            setTitle("");
            setBody("");
          }}
          className=" cursor-pointer"
        >
          <IoCloseSharp size="20" />
        </p>
      </div>

      {/* Modal content */}
      <div>
        {actionType !== "delete" ? (
          <>
            <div>
              <p className="my-2 text-[14px]">Name</p>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className=" w-full px-4 py-2 border focus:ring-0 focus-visible:ring-0 focus:outline-none "
                placeholder="Name"
                disabled={isPosting}
              />
            </div>

            <div className="mt-4">
              <p className="my-2 text-[14px]">Description</p>
              <input
                type="text"
                value={body}
                disabled={isPosting}
                onChange={(e) => setBody(e.target.value)}
                className=" w-full px-4 py-2 border focus:ring-0 focus-visible:ring-0 focus:outline-none "
                placeholder="Name"
              />
            </div>
          </>
        ) : (
          <div className="flex justify-center flex-col items-center">
            <p className="text-[30px] font-[700]">About to Delete!</p>
            <p>Are you sure you are ready to delete this record?</p>
          </div>
        )}

        {/* Modal Button Section */}
        <div
          className={`flex mt-2 ${
            actionType !== "delete" ? "justify-end" : " justify-center"
          } `}
        >
          {isPosting ? (
            <button className="border p-2 mt-6 w-[30%] rounded-lg">
              Please Wait...
            </button>
          ) : (
            <button
              className="border p-2 mt-6 w-[30%] rounded-lg"
              onClick={() => {
                if (actionType === "delete") {
                  deletePostHandler();
                } else if (actionType === "edit") {
                  editPostHandler();
                } else return createPostHandler();
              }}
            >
              {actionType === "edit"
                ? "Edit"
                : actionType === "delete"
                ? "Delete"
                : "Create"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DasboardOverviewTableModal;
