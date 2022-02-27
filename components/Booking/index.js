import Modal from "../common/Modal";
import BookingForm from "./BookingForm";

const Booking = ({ accomodationName }) => (
  <Modal link="#main" id="booking" classes="booking">
    <div className="booking-enquiry">
      <BookingForm accomodationName={accomodationName} />
    </div>
    
  </Modal>
);

export default Booking;
