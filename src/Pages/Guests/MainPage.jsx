import React, { useEffect, useState } from "react";
import Announcment from "../../components/Announcement";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncments } from "../../redux/slice/guestSlice";
import Loader from "../../components/Loader/Loader";

export default function MainPage() {
  const { announcements, paginations, isLoading } = useSelector(
    (state) => state.guest
  );
  const { user } = useSelector(
    (state) => state.auth
  );
  const [paginate, setPaginate] = useState({
    limit: 5,
    page: 1,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnnouncments(paginate));
  }, [paginate]);

  return (
    <div>
      <h1 className="mb-2 font-bold uppercase text-gray-700 -tracking-wide text-lg">
        Announcments
      </h1>

      {
        isLoading ? <Loader/> : <>
        {
          announcements.length > 0 ? <>
            {announcements.map((announcement) => (
              <Announcment
              key={announcement.id}
              announcement={announcement}
              />
            ))}
          </> : <div className="text-center mb-5">
            No Record Found
          </div>
        }
        </>
      }

      <Pagination
        prev={paginations.prev_page_url ? false : true}
        handleNext={() => setPaginate({ ...paginate, page: paginate.page + 1 })}
        handlePrev={() => setPaginate({ ...paginate, page: paginate.page - 1 })}
        next={paginations.first_page_url ? false : true}
      />
    </div>
  );
}
