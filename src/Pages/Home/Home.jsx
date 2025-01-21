import React, { useEffect, useState } from "react";
import Announcment from "../../components/Announcement";
import Pagination from "../../components/Pagination";
import Button from "../../components/Button";
import AddAnnouncement from "../../components/Modal/AddAnnouncement";
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncments, removeErrors } from "../../redux/slice/announcementSlice";
import EditAnnouncement from "../../components/Modal/EditAnnouncement";
import DeleteAnnouncement from "../../components/Modal/DeleteAnnouncement";
import Loader from "../../components/Loader/Loader";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [announcement, setAnnouncement] = useState();
  const { announcements, isSuccess, isLoading, paginations } = useSelector(
    (state) => state.announcements
  );
  const [paginate, setPaginate] = useState({
    limit: 5,
    page: 1,
  });
  const dispatch = useDispatch();

  const handleModal = () => {
    dispatch(removeErrors())
    setOpenModal(!openModal);
  };

  const handleEditModal = (announcement) => {
    dispatch(removeErrors())
    setAnnouncement(announcement);
    setEditModal(!editModal);
  };

  const handleDeleteModal = (announcement) => {
    dispatch(removeErrors())
    setAnnouncement(announcement);
    setDeleteModal(!deleteModal);
  };

  useEffect(() => {
      dispatch(getAnnouncments(paginate));
  }, [paginate, isSuccess]);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="mb-2 font-bold uppercase text-gray-700 -tracking-wide text-lg">
            Announcments
          </h1>
        </div>
        <div>
          <Button
            type={"button"}
            variant="primary"
            // isLoading={btnLoading}
            onClick={handleModal}
            text={
              <>
                <i class="fa-solid fa-circle-plus"></i> Create
              </>
            }
          />
          <AddAnnouncement open={openModal} handleModal={handleModal} />
          <EditAnnouncement open={editModal} handleModal={handleEditModal} announcement={announcement}/>
          <DeleteAnnouncement open={deleteModal} handleModal={handleDeleteModal} announcement={announcement}/>
        </div>
      </div>

      {
        isLoading ? <Loader/> : <>
        {
          announcements.length > 0 ? <>
            {announcements.map((announcement) => (
              <Announcment
              key={announcement.id}
              announcement={announcement}
              handleEdit={handleEditModal}
              handleDelete={handleDeleteModal}
              />
            ))}
          </> : <div className="text-center mb-5">
            No Record Found
          </div>
        }
        </>
      }

      <Pagination 
        prev={
          paginations.prev_page_url ? false : true
        }
        handleNext={() => setPaginate({...paginate, page: paginate.page + 1})}
        handlePrev={() => setPaginate({...paginate, page: paginate.page - 1})}
        next={
          paginations.first_page_url ? false : true
        }
      />
    </div>
  );
}
