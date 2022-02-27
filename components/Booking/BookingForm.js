import * as yup from "yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { ENQUIRY_URL } from "../../constants/api";
import {
  errorColour,
  ErrorIcon,
  succsessColour,
  SuccsessIcon,
} from "../../constants/stylement";
import FeedbackMessage from "../common/FeedbackMessage";
import { Button2 } from "../common/Button";

const schema = yup.object().shape({
  room: yup.string().required("Please select a room option"),
  firstName: yup
    .string()
    .required("Please enter your first name")
    .min(2, "Please enter 2 or more letters"),
  lastName: yup
    .string()
    .required("Please enter your last name")
    .min(3, "Please enter 3 or more letters"),
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter a valid email address"),
  checkIn: yup.string().required("Please select a check-in date"),
  checkOut: yup.string().required("Please select a check-out date"),
  phone: yup
    .number()
    .typeError("Please enter your phone number")
    .required("Please enter your phone number")
    .min(10000000, "Please enter at least 8 numbers"),
});

const BookingForm = ({ accomodationName }) => {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);
    setSuccess(true);

    data.accomodation = accomodationName;

    try {
      await axios.post(ENQUIRY_URL, data);
    } catch (error) {
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      className="w-full max-w-lg px-4 relative overflow-y-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Title: */}
      <h3 className="my-4 uppercase font-semibold">Book now!</h3>
      <fieldset>
        {/* First Name */}
        <div className="flex flex-wrap flex-shrink">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="firstName"
            name="firstName"
          >
            First name
          </label>
          <input
            {...register("firstName")}
            name="firstName"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Karinca"
          />
          {errors.firstName && (
            <FeedbackMessage type="error" message={errors.firstName.message}>
              <ErrorIcon colour={errorColour} />
            </FeedbackMessage>
          )}

          {/* Last Name */}
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="lastName"
            name="lastName"
          >
            Last name
          </label>
          <input
            {...register("lastName")}
            name="lastName"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type="text"
            placeholder="Danielsen"
          />
          {errors.lastName && (
            <FeedbackMessage type="error" message={errors.lastName.message}>
              <ErrorIcon colour={errorColour} />
            </FeedbackMessage>
          )}

          {/* Email: */}
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("email")}
            name="email"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type="text"
            placeholder="example@hotmail.com"
          />
          {errors.email && (
            <FeedbackMessage type="error" message={errors.email.message}>
              <ErrorIcon colour={errorColour} />
            </FeedbackMessage>
          )}
          {/* Phone Number: */}
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="phone"
          >
            Phone number
          </label>
          <input
            {...register("phone")}
            name="phone"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type="number"
            placeholder="123 45 678"
          />
          {errors.phone && (
            <FeedbackMessage type="error" message={errors.phone.message}>
              <ErrorIcon colour={errorColour} />
            </FeedbackMessage>
          )}

          {/* Start Date: */}
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="checkIn"
          >
            Check in
          </label>
          <input
            {...register("checkIn")}
            name="checkIn"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type="date"
          />
          {errors.checkIn && (
            <FeedbackMessage type="error" message={errors.checkIn.message}>
              <ErrorIcon colour={errorColour} />
            </FeedbackMessage>
          )}
          {/* End Date: */}
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="checkOut"
          >
            Check out
          </label>
          <input
            {...register("checkOut")}
            name="checkOut"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type="date"
          />
          {errors.checkOut && (
            <FeedbackMessage type="error" message={errors.checkOut.message}>
              <ErrorIcon colour={errorColour} />
            </FeedbackMessage>
          )}
          {/* Guests */}
          {/* adults */}
          <div className="flex flex-row my-3">
            <div className="px-2">
              <label
                htmlFor="guestAdult"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                name="guestAdult"
              >
                Adults
              </label>
              <select
                id="guestAdult"
                name="guestAdult"
                className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                defaultValue={"adult2"}
                {...register("guestAdult")}
              >
                <option value="adult1">1</option>
                <option value="adult2">2</option>
                <option value="adult3">3</option>
                <option value="adult4">4</option>
              </select>
            </div>
            {/* children */}
            <div className="px-2">
              <label
                htmlFor="guestChild"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                name="guestChild"
              >
                Children
              </label>
              <select
                id="guestChild"
                name="guestChild"
                className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                defaultValue={"child0"}
                {...register("guestChild")}
              >
                <option value="child0">0</option>
                <option value="child1">1</option>
                <option value="child2">2</option>
                <option value="child3">3</option>
                <option value="child4">4</option>
              </select>
            </div>
          </div>
        </div>
        {/* Choose a room: */}
        <div className="mt-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="room"
          >
            Room Type:
          </label>
          <select
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1"
            name="room"
            {...register("room")}
          >
            <option value="standard">Standard</option>
            <option value="superior">Superior</option>
            <option value="fistClass">First Class</option>
          </select>
          {errors.room && (
            <FeedbackMessage type="error" message={errors.room.message}>
              <ErrorIcon colour={errorColour} />
            </FeedbackMessage>
          )}
        </div>
        {/* Message: */}
        <div className="">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="message"
          >
            Optional message
          </label>
          <textarea
            {...register("message")}
            name="message"
            className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 h-48 resize-y"
            placeholder="Write here your message..."
          />
          {errors.message && (
            <FeedbackMessage type="error" message={errors.message.message}>
              <ErrorIcon colour={errorColour} />
            </FeedbackMessage>
          )}
        </div>
        {/* Submit: */}
        <Button2 type="submit">
          {submitting ? "Booking..." : "Book Now"}
        </Button2>
        {success && (
          <FeedbackMessage
            type="success"
            message="Your reservation is succsessfully sent. we will contact you as fast as possible."
          >
            <SuccsessIcon colour={succsessColour} />
          </FeedbackMessage>
        )}
        {serverError && (
          <FeedbackMessage type="error" message={serverError}>
            <ErrorIcon colour={errorColour} />
          </FeedbackMessage>
        )}
        <div className="p-2"> </div>
      </fieldset>
    </form>
  );
};

export default BookingForm;
