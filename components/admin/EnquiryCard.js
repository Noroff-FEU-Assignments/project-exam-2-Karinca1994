import { useState } from "react";

import useAxios from "../../hooks/useAxios";
import { ENQUIRY_URL } from "../../constants/api";
import { Button } from "../common/Button";
import FeedbackMessage from "../common/FeedbackMessage";

const BookingCard = ({
  accomodation,
  firstName,
  lastName,
  email,
  phone,
  checkIn,
  checkOut,
  room,
  guestAdult,
  guestChild,
  message,
  read,
  id,
  data,
}) => {
  // State
  const [newMessage, setNewMessage] = useState(read);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Variables
  let url = `${ENQUIRY_URL}/${id}`;
  const http = useAxios();

  // Read new message handler
  const readMessageHandler = () => {
    if (read === false) {
      data.read = true;
      http.put(url, data);
      setNewMessage(true);
    }
  };

  // Delete Handler
  const deleteBookingEnquiryHandler = async () => {
    setDeleting(true);
    setDeleteError(null);
    setDeleteSuccess(false);

    const confirmDelete = window.confirm(
      "Delete the message from " + firstName + "-" + lastName + "?"
    );

    if (confirmDelete) {
      try {
        setDeleting(true);
        await http.delete(url);
        setDeleteSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        setDeleteError(error.toString());
      } finally {
        setDeleting(false);
      }
    } else {
      setDeleting(false);
    }
  };

  return (
    <>
      <h2 className="secondary-h2 my-4"> Booking enquiries:</h2>

      <div
        className="rounded py-3 px-4 leading-tight bg-gray-100"
        onClick={readMessageHandler}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <h3 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            {accomodation}
          </h3>
          {!newMessage ? <span className="font-bold">New!</span> : null}
        </div>

        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <h5 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            From:
          </h5>
          <p className="block uppercase tracking-wide text-black-900 text-xs mb-2">
            {firstName}-{lastName}
          </p>

          <h5 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Email:
          </h5>
          <p className="block uppercase tracking-wide text-black-900 text-xs  mb-2">
            {email}
          </p>

          <h5 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Phone nr:
          </h5>
          <p className="block uppercase tracking-wide text-black-900 text-xs  mb-2">
            {phone}
          </p>

          <h5 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            checking in and out:
          </h5>
          <p className="block uppercase tracking-wide text-black-900 text-xs mb-2">
            {checkIn} - {checkOut}
          </p>

          <h5 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Room type:
          </h5>
          <p className="block uppercase tracking-wide text-black-900 text-xs mb-2">
            {room}
          </p>

          <h5 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            How many Adults:
          </h5>
          <p className="block uppercase tracking-wide text-black-900 text-xs mb-2">
            {guestAdult}
          </p>

          <h5 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            How many Children:
          </h5>
          <p className="block uppercase tracking-wide text-black-900 text-xs mb-2">
            {guestChild}
          </p>

          <h5 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Room type:
          </h5>
          <p className="block uppercase tracking-wide text-black-900 text-xs mb-2">
            {room}
          </p>
        </div>
        <h5 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Extra message:
        </h5>
        <p className="no-resize appearance-none block w-full bg-gray-200 text-black-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-y">
          {message}
        </p>

        <Button onClick={deleteBookingEnquiryHandler}>
          {deleting ? "deleting.." : "delete"}
        </Button>

        {/* Feedback: */}
        {deleteError && (
          <FeedbackMessage type="error">{deleteError}</FeedbackMessage>
        )}
        {deleteSuccess && (
          <FeedbackMessage type="success">
            The Message was successfully deleted!
          </FeedbackMessage>
        )}
      </div>
    </>
  );
};

export default BookingCard;
