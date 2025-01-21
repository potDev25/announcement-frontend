import React, { useCallback, useEffect, useState } from "react";
import Button from "../Button";
import Form from "../Form/Form";
import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnnouncement } from "../../redux/slice/announcementSlice";

export default function DeleteAnnouncement({
  open,
  handleModal,
  announcement,
}) {
  const { errors, isSuccess, btnLoading } = useSelector(
    (state) => state.announcements
  );
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(deleteAnnouncement(announcement.id));
  };

  useEffect(() => {
    if (isSuccess === 'deleted') {
      handleModal();
    }
  }, [isSuccess]);

  return (
    <>
      <dialog className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg capitalize text-center">
            Delete Announcement? <br />
            {errors ? (
              <span className="text-red-500 uppercase text-sm">
                <i class="fa-solid fa-circle-exclamation"></i>
                {errors?.message}
              </span>
            ) : null}
          </h3>
          <div
            className={`modal-action ${
              btnLoading ? "" : "flex items-center justify-between"
            }`}
          >
            {btnLoading ? (
              <></>
            ) : (
              <Button
                type={"button"}
                variant="secondary"
                onClick={handleModal}
                text={<>Cancel</>}
              />
            )}
            <Button
              type={"button"}
              variant="danger"
              isLoading={btnLoading}
              onClick={handleSubmit}
              text={<>Delete</>}
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
