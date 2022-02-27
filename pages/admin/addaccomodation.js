import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RESULTS_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../hooks/useAxios";
import FeedbackMessage from "../../components/common/FeedbackMessage";
import { AdminLayout } from "../../components/layout/Layout";
import { KEY_ADMIN, META_ADMIN, TITLE_ADMIN } from "../../constants/meta";
import Error from "../../components/admin/Form/Error";
import { FileIcon } from "../../constants/stylement";
import { ButtonFile } from "../../components/common/Button";

const schema = yup.object().shape({
  accomodation: yup.string().required("Please choose an accomodation"),
  name: yup
    .string()
    .required("Please enter the name of the accomodation")
    .min(4, "Please enter more than 4 letters"),
  category: yup.string().required("Please choose a category"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  phone: yup
    .number()
    .typeError("Please enter a phone number")
    .min(10000000, "Please enter a valid phone number with 8 numbers")
    .max(99999999, "Please enter a valid phone number with 8 numbers"),
  latitude: yup.number().required("Please enter coordinates- Latitude"),
  longitude: yup.number().required("Please enter coordinates- Longitude"),
  street: yup
    .string()
    .required("Please enter a street name")
    .min(4, "Please enter more than 4 letters"),
  city: yup
    .string()
    .required("Please enter a city")
    .min(2, "Please enter more than 2 letters"),
  zipCode: yup
    .number()
    .typeError("Please enter a zip code")
    .min(4, "Please enter a number between 1000 - 9999")
    .max(4, "Please enter a number between 1000 - 9999"),
  rating: yup
    .number()
    .typeError("Please enter a number")
    .min(1, "Please enter a value between 1 - 10")
    .max(10, "Please enter a value between 1 - 10"),
  stars: yup.string().required("Must be text: one, two, three, four, five"),
  featured: yup.boolean().typeError("Please choose on of the options"),
  price: yup.number().typeError("Please enter a number"),

  description: yup
    .string()
    .required("Please enter a description")
    .min(20, "Please enter more than 20 letters"),
  amenities: yup
    .string()
    .required("Please enter different amenities")
    .min(20, "Please enter more than 20 letters"),
});

export default function AddNewAccomodation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth] = useContext(AuthContext);
  const http = useAxios();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  const [imageValue, setImageValue] = useState(null);
  const [imageValueError, setImageValueError] = useState(null);

  const changeImageValue = async (event) => {
    setImageValueError(false);

    if (!event.target.files) return;

    if (event.target.files[0].type === "image/jpeg") {
      setImageValue(event.target.files[0]);
    } else {
      setImageValueError(true);
      setImageValue(null);
    }
  };

  async function onSubmit(data) {
    setSubmitting(true);
    setError(null);
    setAdded(false);

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("files.image", imageValue);

    try {
      if (imageValue != null && auth != null) {
        await http.post(RESULTS_URL, formData);
        setAdded(true);
      } else {
        setImageValueError(true);
        setError("Please add an image");
      }
    } catch (error) {
      setError(error.toString());
      console.log("An error occurred. Error message: " + error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminLayout
      page="addAccomodation"
      title={TITLE_ADMIN}
      keywords={KEY_ADMIN}
      description={META_ADMIN}
    >
      <div className="flex flex-col justify-center items-center my-5">
        <h2 className="secondary-h2 mx-2 my-4"> Add Accomodation</h2>
        <div className="rounded-lg shadow-lg py-5 px-8 leading-tight bg-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <fieldset
                className="flex flex-wrap -mx-3 mb-6"
                disabled={submitting}
              >
                {/* category and name */}
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Name of Accomodation..."
                    {...register("name")}
                  />
                  {errors.name && (
                    <FeedbackMessage
                      type="error"
                      message={errors.name.message}
                    />
                  )}
                </div>
                {/* category */}
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Enter :Hotel, Bed and Breakfast or Guestrooms.."
                    {...register("category")}
                  />
                  {errors.category && (
                    <FeedbackMessage
                      type="error"
                      message={errors.category.message}
                    />
                  )}
                </div>
                {/* email and phone */}
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div>
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email of Accomodation
                    </label>
                    <input
                      type="text"
                      name="email"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      placeholder="Enter email address for accomodation"
                      {...register("email")}
                    />
                    {errors.email && (
                      <FeedbackMessage
                        type="error"
                        message={errors.email.message}
                      />
                    )}

                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="phone"
                    >
                      Phone of Accomodation
                    </label>
                    <input
                      type="text"
                      name="phone"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      placeholder="Enter the phone number for accomodation"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <FeedbackMessage
                        type="error"
                        message={errors.phone.message}
                      />
                    )}
                  </div>
                </div>
                {/* Coordinates */}
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="latitude"
                  >
                    Latitude
                  </label>
                  <input
                    type="text"
                    name="latitude"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Enter the latitude for accomodation cordinates"
                    {...register("latitude")}
                  />
                  {errors.latitude && (
                    <FeedbackMessage
                      type="error"
                      message={errors.latitude.message}
                    />
                  )}
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="longitude"
                  >
                    Longitude
                  </label>
                  <input
                    type="text"
                    name="longitude"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Enter the Longitude for accomodation cordinates"
                    {...register("longitude")}
                  />
                  {errors.longitude && (
                    <FeedbackMessage
                      type="error"
                      message={errors.longitude.message}
                    />
                  )}
                </div>
                {/* adress */}
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="street"
                  >
                    Street
                  </label>
                  <input
                    type="text"
                    name="street"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Street name of accomodation"
                    {...register("street")}
                  />
                  {errors.street && (
                    <FeedbackMessage message={errors.street.message} />
                  )}
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="City name of accomodation"
                    {...register("city")}
                  />
                  {errors.city && (
                    <FeedbackMessage message={errors.city.message} />
                  )}
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="zipCode"
                  >
                    Zip-Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Zip-Code of accomodation"
                    {...register("zipCode")}
                  />
                  {errors.zipCode && (
                    <FeedbackMessage message={errors.zipCode.message} />
                  )}
                </div>
                {/* rating and stars */}
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="rating"
                  >
                    Rating of Accomodation
                  </label>
                  <input
                    type="text"
                    name="rating"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Rating from 1-10"
                    {...register("rating")}
                  />
                  {errors.rating && (
                    <FeedbackMessage message={errors.rating.message} />
                  )}
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="stars"
                  >
                    Stars of Accomodation
                  </label>
                  <input
                    type="text"
                    name="stars"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Stars from one to five, enter in letters"
                    {...register("stars")}
                  />
                  {errors.stars && (
                    <FeedbackMessage message={errors.stars.message} />
                  )}
                </div>
                {/* price */}
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="price"
                  >
                    Price NOK
                  </label>
                  <input
                    defaultValue="1200"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    name="price"
                    placeholder="Price..."
                    {...register("price")}
                  />
                  {errors.price && (
                    <FeedbackMessage message={errors.price.message} />
                  )}
                </div>
                {/* peice */}
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="price"
                  >
                    Price of Accomodation pr night
                  </label>
                  <input
                    type="text"
                    name="price"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Price of accomodation pr night, must be in number"
                    {...register("price")}
                  />
                  {errors.price && (
                    <FeedbackMessage message={errors.price.message} />
                  )}
                </div>
                {/* feautured */}

                <div className="w-full md:w-2/2 px-3">
                  <div className="flex justify-center">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-1"
                      htmlFor="price"
                    >
                      Feautured?
                    </label>
                    <div className="form-check form-check-inline px-4">
                      <input
                        className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="featured"
                        id="inlineRadio1"
                        value="option1"
                        {...register("featured")}
                      />
                      {errors.featured && (
                        <FeedbackMessage message={errors.featured.message} />
                      )}
                      <label
                        className="form-check-label inline-block text-gray-800"
                        htmlFor="featured"
                      >
                        yes
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="featured"
                        id="inlineRadio2"
                        value="option2"
                        {...register("featured")}
                      />
                      {errors.featured && (
                        <FeedbackMessage message={errors.featured.message} />
                      )}
                      <label
                        className="form-check-label inline-block text-gray-800"
                        htmlFor="featured"
                      >
                        no
                      </label>
                    </div>
                  </div>
                  {/* description */}
                  <div className="w-full md:w-2/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="description"
                    >
                      Description of Accomodation
                    </label>
                    <textarea
                      type="text"
                      name="description"
                      className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      placeholder="Description of accomodation"
                      {...register("description")}
                    />
                    {errors.description && (
                      <FeedbackMessage message={errors.description.message} />
                    )}
                  </div>
                  {/* amenities */}
                  <div className="w-full md:w-2/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="amenities"
                    >
                      Amenities of Accomodation
                    </label>
                    <textarea
                      type="text"
                      name="amenities"
                      className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      placeholder="Amenities of accomodation:example; breakfast, wifi, parkingspot ect."
                      {...register("amenities")}
                    />
                    {errors.amenities && (
                      <FeedbackMessage message={errors.amenities.message} />
                    )}
                  </div>
                  {/* image upload file */}
                  <div className="w-full md:w-2/2 px-3">
                    <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                      <div className="p-4">
                        <label
                          htmlFor="image"
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                          File Image Upload
                        </label>
                        <div className="w-full md:w-2/2 px-3 m-2">
                          <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div className="flex flex-col items-center justify-center pt-7">
                              <FileIcon />
                              <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                Attach a file
                              </p>
                            </div>
                            <input
                              type="file"
                              className="opacity-0 appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              name="image"
                              onChange={changeImageValue}
                              placeholder="image url upload, example:url: https://example.com/photo.jpg"
                              {...register("image")}
                            />
                          </label>
                          {imageValueError ? (
                            <Error>"Please use .jpeg file"</Error>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center p-2">
                    <ButtonFile type="submit">
                      {submitting ? "Added.." : "Create"}
                    </ButtonFile>
                  </div>

                  {error && (
                    <FeedbackMessage
                      type="error"
                      message="An error occurred. Please try again.."
                    />
                  )}

                  {added && (
                    <FeedbackMessage
                      type="success"
                      message="The Accomodation was added!"
                    />
                  )}
                </div>
              </fieldset>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
