import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { AdminLayout } from "../../components/layout/Layout";
import MessageCard from "../../components/admin/MessageCard";
import { KEY_ADMIN, META_ADMIN, TITLE_ADMIN } from "../../constants/meta";

const MessagesAdmin = () => {
  const [contactMessages, setContactMessages] = useState([]);
  const http = useAxios();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get("/api/contacts");
        setContactMessages(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // Sort and Map through the contact messages and make cards out of them, display the new first
  const ContactMessageCards = contactMessages
    .sort((value) => (value.read ? 1 : -1))
    .map((contact) => (
      <MessageCard
        id={contact.id}
        read={contact.read}
        key={contact.id}
        firstName={contact.firstName}
        lastName={contact.lastName}
        email={contact.email}
        message={contact.message}
        data={contact}
      />
    ));

  return (
    <AdminLayout
      page="messages"
      title={TITLE_ADMIN}
      keywords={KEY_ADMIN}
      description={META_ADMIN}
    >
      <section className="mt-5">
        <div>{ContactMessageCards}</div>
      </section>
    </AdminLayout>
  );
};

export default MessagesAdmin;
