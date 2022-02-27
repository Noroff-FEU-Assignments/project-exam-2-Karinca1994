import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import EnquiryCard from "../../components/admin/EnquiryCard";
import { AdminLayout } from "../../components/layout/Layout";
import { KEY_ADMIN, META_ADMIN, TITLE_ADMIN } from "../../constants/meta";

const enquiriesAdmin = () => {
  const [enquiries, setEnquiries] = useState([]);
  const http = useAxios();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get("/api/enquiries");
        setEnquiries(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const bookingEnquiries = enquiries
    .sort((value) => (value.read ? 1 : -1))
    .map((enq) => (
      <EnquiryCard
        key={enq.id}
        id={enq.id}
        read={enq.read}
        accomodation={enq.accomodation}
        firstName={enq.firstName}
        lastName={enq.lastName}
        email={enq.email}
        phone={enq.phone}
        checkIn={enq.checkIn}
        checkOut={enq.checkOut}
        guestAdult={enq.guestAdult}
        guestChild={enq.guestChild}
        room={enq.room}
        message={enq.message}
        data={enq}
      />
    ));

  return (
    <AdminLayout
      page="enquiries"
      title={TITLE_ADMIN}
      keywords={KEY_ADMIN}
      description={META_ADMIN}
    >
      <section className="mt-5">
        <div>{bookingEnquiries}</div>
      </section>
    </AdminLayout>
  );
};

export default enquiriesAdmin;
