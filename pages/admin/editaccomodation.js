import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios.js";
import { RESULTS_URL } from "../../constants/api";
import { ButtonFile } from "../../components/common/Button";
import FeedbackMessage from "../../components/common/FeedbackMessage.js";
import Error from "../../components/admin/Form/Error.js";
import { KEY_ADMIN, META_ADMIN, TITLE_ADMIN } from "../../constants/meta.js";
import { AdminLayout } from "../../components/layout/Layout.js";

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

const EditAccomodation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [accomodations, setAccomodations] = useState();
  const [matchAccomodation, setMatchAccomodation] = useState();

  const [updated, setUpdated] = useState(false);
  const [updatingAccomodation, setUpdatingAccomodation] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const [imageValue, setImageValue] = useState(null);
  const [imageValueError, setImageValueError] = useState(false);

  const http = useAxios();
  let accomodationOptions;
  let selectedAccomodation;
  let url = "";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get("/api/accomodations?populate=*");
        setAccomodations(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

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

  const changeHandler = (event) => {
    setMatchAccomodation(event.target.value);
  };

  if (
    accomodations != undefined &&
    matchAccomodation != null &&
    accomodations.length > 0
  ) {
    selectedAccomodation = accomodations.filter((acco) =>
      acco.name.match(matchAccomodation)
    );
  }
  if (selectedAccomodation != undefined && selectedAccomodation.length === 1)
    selectedAccomodation = selectedAccomodation[0];
  if (selectedAccomodation != undefined)
    url = RESULTS_URL + selectedAccomodation.id;

  if (accomodations) {
    accomodationOptions = accomodations.map((acco) => (
      <option key={acco.id} value={acco.name}>
        {acco.name}
      </option>
    ));
  }

  async function onSubmit(data) {
    setUpdatingAccomodation(true);
    setUpdateError(null);
    setUpdated(false);

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("files.image", imageValue);

    try {
      await http.put(url, formData);
      setUpdated(true);
    } catch (error) {
      setUpdateError(error.toString());
    } finally {
      setUpdatingAccomodation(false);
    }
  }

  return (
    <AdminLayout
      page="editAccomodation"
      title={TITLE_ADMIN}
      keywords={KEY_ADMIN}
      description={META_ADMIN}
    >
      <div className="flex flex-col justify-center items-center my-5">
        <h2 className="secondary-h2 mx-2 my-4"> Edit Accomodation</h2>
        <div className="rounded-lg shadow-lg py-5 px-8 leading-tight bg-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              
              <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="accomodation"
                >
                  Choose an accomodation
                </label>
                <select
                  onChange={changeHandler}
                  name="accomodation"
                  className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  {...register("accomodation")}
                >
                  {accomodationOptions}
                  {errors.accomodation && (
                    <Error>{errors.accomodation.message}</Error>
                  )}
                </select>
              </div>
              <fieldset
                disabled={updatingAccomodation}
                className="flex flex-wrap -mx-3 mb-6"
              >
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  {/* Image: */}
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="image"
                  >
                    Edit Image
                  </label>
                  <span>
                    {imageValue
                      ? imageValue.name
                      : selectedAccomodation
                      ? selectedAccomodation.image.name
                      : ""}
                  </span>
                  <input
                    {...register("image")}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="image"
                    onChange={changeImageValue}
                  />
                  {imageValueError ? (
                    <Error>"Please use .jpeg file"</Error>
                  ) : null}
                </div>
                {/* Hotel Name: */}
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="name"
                  >
                    Edit Name
                  </label>
                  <input
                    {...register("name")}
                    name="name"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Accomodation Name"
                    defaultValue={
                      selectedAccomodation ? selectedAccomodation.name : ""
                    }
                  />
                  {errors
                    ? errors.name && <Error>{errors.name.message}</Error>
                    : null}
                </div>
                {/* Email: */}
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Edit Email
                  </label>
                  <input
                    {...register("email")}
                    name="email"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="accomodation@support.com"
                    defaultValue={
                      selectedAccomodation ? selectedAccomodation.email : ""
                    }
                  />
                  {errors.email && <Error>{errors.email.message}</Error>}
                </div>
                {/* category */}
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <input
                    {...register("category")}
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="category"
                    placeholder="Enter :Hotel, Bed and Breakfast or Guestrooms.."
                  />
                  {errors.category && <Error>{errors.category.message}</Error>}
                </div>
                {/* Phone */}
                <div className="w-full md:w-2/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="phone"
                  >
                    Edit Phone
                  </label>
                  <input
                    {...register("phone")}
                    name="phone"
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="123 45 678"
                    defaultValue={
                      selectedAccomodation ? selectedAccomodation.phone : ""
                    }
                  />
                  {errors.phone && <Error>{errors.phone.message}</Error>}
                </div>
                {/* Coordinates */}
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="latitude"
                  >
                    Edit latitude
                  </label>
                  <input
                    {...register("latitude")}
                    name="latitude"
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="latitude"
                    defaultValue={
                      selectedAccomodation ? selectedAccomodation.latitude : ""
                    }
                  />
                  {errors.latitude && <Error>{errors.latitude.message}</Error>}

                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="longitude"
                  >
                    Edit longitude
                  </label>
                  <input
                    {...register("longitude")}
                    name="longitude"
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="longitude"
                    defaultValue={
                      selectedAccomodation ? selectedAccomodation.longitude : ""
                    }
                  />
                  {errors.longitude && (
                    <Error>{errors.longitude.message}</Error>
                  )}
                </div>
                {/* Street name */}
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="street"
                  >
                    Edit streetname
                  </label>

                  <input
                    {...register("street")}
                    name="street"
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Street example 123"
                    defaultValue={
                      selectedAccomodation ? selectedAccomodation.street : ""
                    }
                  />
                  {errors.street && <Error>{errors.street.message}</Error>}
                </div>
                {/* City */}
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="city"
                  >
                    Edit city
                  </label>

                  <input
                    {...register("city")}
                    name="city"
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="City Name"
                    defaultValue={
                      selectedAccomodation ? selectedAccomodation.city : ""
                    }
                  />
                  {errors.city && <Error>{errors.city.message}</Error>}
                </div>
                {/* Zip Code */}
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="zipCode"
                  >
                    Edit zipCode
                  </label>

                  <input
                    {...register("zipCode")}
                    name="zipCode"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="5332"
                    defaultValue={
                      selectedAccomodation ? selectedAccomodation.zipCode : ""
                    }
                  />
                  {errors.zipCode && <Error>{errors.zipCode.message}</Error>}
                </div>
                {/* Rating */}
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="rating"
                  >
                    Edit rating
                  </label>

                  <input
                    {...register("rating")}
                    name="rating"
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="7.8 example"
                    defaultValue={
                      selectedAccomodation ? selectedAccomodation.rating : ""
                    }
                  />
                  {errors.rating && <Error>{errors.rating.message}</Error>}
                </div>
                {/* Stars */}
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="stars"
                  >
                    Edit stars
                  </label>
                  <input
                    {...register("stars")}
                    name="stars"
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Stars from one to five, enter in letters"
                    defaultValue={
                      selectedAccomodation ? selectedAccomodation.stars : ""
                    }
                  />
                  {errors.rating && <Error>{errors.rating.message}</Error>}
                </div>
                {/* Price: */}
                <div className="w-full md:w-2/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="price"
                  >
                    Edit price
                  </label>
                  <input
                    {...register("price")}
                    name="price"
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="1090 pr night"
                    defaultValue={
                      selectedAccomodation ? selectedAccomodation.price : ""
                    }
                  />
                  {errors.price && <Error>{errors.price.message}</Error>}
                </div>
                {/* Featured */}
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
                        defaultValue={
                          selectedAccomodation
                            ? selectedAccomodation.featured
                            : undefined
                        }
                        {...register("featured")}
                      />
                      {errors.featured && (
                        <Error>{errors.featured.message}</Error>
                      )}
                      <label
                        className="form-check-label inline-block text-gray-800"
                        htmlFor="inlineRadio10"
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
                        defaultValue={
                          selectedAccomodation
                            ? selectedAccomodation.featured
                            : undefined
                        }
                        {...register("featured")}
                      />
                      {errors.featured && (
                        <Error>{errors.featured.message}</Error>
                      )}
                      <label
                        className="form-check-label inline-block text-gray-800"
                        htmlFor="inlineRadio20"
                      >
                        no
                      </label>
                    </div>
                  </div>
                  {/* Description */}
                  <div className="w-full md:w-2/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="description"
                    >
                      Edit Description
                    </label>
                    <textarea
                      {...register("description")}
                      name="description"
                      className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      placeholder="Accomodation description:"
                      defaultValue={
                        selectedAccomodation
                          ? selectedAccomodation.description
                          : ""
                      }
                    />
                    {errors.description && (
                      <Error>{errors.description.message}</Error>
                    )}
                  </div>
                  {/* amenities */}
                  <div className="w-full md:w-2/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="amenities"
                    >
                      Edit Amenities
                    </label>
                    <textarea
                      type="text"
                      className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      name="amenities"
                      defaultValue={
                        selectedAccomodation
                          ? selectedAccomodation.amenities
                          : ""
                      }
                      placeholder="example: breakfast, wifi ect."
                      {...register("amenities")}
                    />
                    {errors.amenities && (
                      <Error>{errors.amenities.message}</Error>
                    )}
                  </div>
                  {/* button */}
                  <div className="px-3">
                    <ButtonFile type="submit">
                      {updatingAccomodation
                        ? "updating.."
                        : "update accomodation"}
                    </ButtonFile>
                  </div>
                </div>
              </fieldset>

              {updated && (
                <FeedbackMessage type="success">
                  The Accomodation was successfully updated!
                </FeedbackMessage>
              )}
              {updateError && (
                <FeedbackMessage type="error">{updateError}</FeedbackMessage>
              )}
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditAccomodation;
