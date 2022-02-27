import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CONTACT_URL } from "../../constants/api.js";
import FeedbackMessage from "../common/FeedbackMessage";
import {
  ErrorIcon,
  errorColour,
  succsessColour,
  SuccsessIcon,
} from "../../constants/stylement";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your first name.")
    .min(3, "Must be at least 3 characters."),

  lastName: yup
    .string()
    .required("Please enter your last name")
    .min(4, "Last Name must be at least 4 characters"),

  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),

  message: yup
    .string()
    .required("Please enter an message")
    .min(10, "The message must be at least 10 characters"),
});

const ContactForm = () => {
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
    setSuccess(null);

    try {
      await axios.post(CONTACT_URL, data);
      setSuccess(true);
    } catch (error) {
      setServerError(error.toString());
      console.log("An error occurred. Error message: " + error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <h2 className="secondary-h2 my-4">Send us a Message</h2>
      <div className="rounded py-3 px-4 leading-tight bg-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
          <fieldset disabled={submitting}>
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* First Name */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="firstName"
                >
                  First name
                </label>
                <input
                  {...register("firstName")}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  name="firstName"
                  type="text"
                  placeholder="Karinca"
                />
                {errors.firstName && (
                  <FeedbackMessage
                    type="error"
                    message={errors.firstName.message}
                  >
                    <ErrorIcon colour={errorColour} />
                  </FeedbackMessage>
                )}
              </div>
              {/* Last Name */}
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="lastName"
                  name="lastName"
                >
                  Last name
                </label>
                <input
                  {...register("lastName")}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  name="lastName"
                  placeholder="Danielsen"
                />
                {errors.lastName && (
                  <FeedbackMessage
                    type="error"
                    message={errors.lastName.message}
                  >
                    <ErrorIcon colour={errorColour} />
                  </FeedbackMessage>
                )}
              </div>
            </div>
            {/* Email */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="email"
                  name="email"
                  placeholder="karinca@example.com"
                />
                {errors.email && (
                  <FeedbackMessage type="error" message={errors.email.message}>
                    <ErrorIcon colour={errorColour} />
                  </FeedbackMessage>
                )}
              </div>
            </div>
            {/* Message */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  {...register("message")}
                  className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-y"
                  name="message"
                  type="text"
                  placeholder="Write here your message..."
                />
                {errors.message && (
                  <FeedbackMessage
                    type="error"
                    message={errors.message.message}
                  >
                    <ErrorIcon colour={errorColour} />
                  </FeedbackMessage>
                )}
              </div>
            </div>
            {/* Send */}
            <div className="md:flex md:items-center">
              <div className="md:w-1/3">
                <button
                  type="submit"
                  className="uppercase shadow bg-blue-400 border-blue-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded"
                >
                  {submitting ? "sending.." : "send"}
                </button>
              </div>
              <div className="md:w-2/3"></div>
            </div>
            {success && (
              <FeedbackMessage
                type="success"
                message="Your message is succsessfully sent. we will contact you as fast as possible."
              >
                <SuccsessIcon colour={succsessColour} />
              </FeedbackMessage>
            )}
            {serverError && (
              <FeedbackMessage type="error" message={serverError}>
                <ErrorIcon colour={errorColour} />
              </FeedbackMessage>
            )}
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
