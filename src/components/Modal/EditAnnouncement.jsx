import React, { useCallback, useEffect, useState } from "react";
import Button from "../Button";
import Form from "../Form/Form";
import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { editAnnouncement, storeAnnouncement } from "../../redux/slice/announcementSlice";

export default function EditAnnouncement({ open, handleModal, announcement }) {
  const { errors, isSuccess, btnLoading } = useSelector(
    (state) => state.announcements
  );
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    id: null,
    title: "",
    content: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleSubmit = () => {
    dispatch(editAnnouncement({id: announcement.id, payload: payload}));
  };

  useEffect(() => {
    setPayload({
      title: announcement?.title,
      content: announcement?.content,
      startDate: announcement?.startDate,
      endDate: announcement?.endDate,
    })
  }, [announcement])

  useEffect(() => {
      if (isSuccess === 'edited') {
        handleModal();
        setPayload({
          title: "",
          content: "",
          startDate: new Date(),
          endDate: new Date(),
        });
      }
  }, [isSuccess])

  return (
    <>
      <dialog className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-sm uppercase">Edit Announcement</h3>

          <div className="mt-5">
            <Input
              type={"text"}
              label={"Title"}
              error={errors ? errors.title : ""}
              placeholder={"Enter Title"}
              value={payload.title}
              onChange={(e) =>
                setPayload({ ...payload, title: e.target.value })
              }
            />

            <Textarea
              label={"Content"}
              placeholder={"Enter Content"}
              value={payload.content}
              onChange={(e) =>
                setPayload({ ...payload, content: e.target.value })
              }
              error={errors ? errors.content : ""}
            />

            <div className="flex item-center justify-between">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Start Date
                </label>
                <label
                  className={`input input-bordered ${
                    errors?.startDate ? "border-red-500" : ""
                  } flex items-center gap-2`}
                >
                  <DatePicker
                    selected={payload.startDate}
                    onChange={(date) =>
                      setPayload({ ...payload, startDate: date })
                    }
                    selectsStart
                    startDate={payload.startDate}
                    endDate={payload.endDate}
                  />
                </label>
                {errors ? (
                  <p className="text-red-500 text-xs italic">
                    {errors.startDate}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  End Date
                </label>
                <label
                  className={`input input-bordered ${
                    errors?.endDate ? "border-red-500" : ""
                  } flex items-center gap-2`}
                >
                  <DatePicker
                    selected={payload.endDate}
                    onChange={(date) =>
                      setPayload({ ...payload, endDate: date })
                    }
                    selectsEnd
                    startDate={payload.startDate}
                    endDate={payload.endDate}
                    minDate={payload.startDate}
                  />
                </label>
                {errors ? (
                  <p className="text-red-500 text-xs italic">
                    {errors.endDate}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

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
                text={<>Close</>}
              />
            )}
            <Button
              type={"button"}
              variant="primary"
              isLoading={btnLoading}
              onClick={handleSubmit}
              text={
                <>
                  <i class="fa-solid fa-circle-plus"></i> Save
                </>
              }
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
