import axios from "axios";
import Layout from "../../components/layout/Layout";
import { RESULTS_URL } from "../../constants/api";
import Heading from "../../components/layout/Heading";
import {
  TITLE_ACCOMODATIONS,
  KEY_ACCOMODATIONS,
  META_ACCOMODATIONS,
} from "../../constants/meta";
import { ButtonModal } from "../../components/common/Button";
import Booking from "../../components/Booking";
import { StarIcon } from "../../constants/stylement";

export default function AccomodationDetails({ accomodation }) {
  return (
    <>
      <Layout
        page="accomodations-id"
        title={TITLE_ACCOMODATIONS}
        keywords={KEY_ACCOMODATIONS}
        description={META_ACCOMODATIONS}
      >
        <div className="m-3">
          <Heading type="h1" title={accomodation.name} />
          <div className="">
            {/* <section>
            {accomodation.attributes.image.data.map((image) => (
              <Image
                className="lg:rounded-l-lg sm:rounded-t-lg shadow bg-cover"
                src={image.attributes.url}
                layout="fill"
                key={accomodation.id}
                alt={accomodation.name}
              />
            ))}
          </section> */}
            <section className="">
              <div>
                <Heading title={accomodation.name} type="h1" />
                <span>{accomodation.rating}</span>
              </div>
              <div className="">
                <div>
                  <span className="">{accomodation.price}Nok, pr night</span>

                  <p className="">including Taxes and Moms</p>
                </div>
                <section className="" id="accomodation-cta">
                  <p className="">We have 2 rooms left!</p>
                  <ButtonModal type="submit" name="booking">
                    Book Now!
                  </ButtonModal>
                </section>
              </div>
            </section>
          </div>
          <div>
            <p className="flex p-1 text-black-300">
              {accomodation.stars} stars <StarIcon />
            </p>
          </div>
          <section className="">
            <div></div>
            <div>
              <p>About: {accomodation.description}</p>
            </div>
            <div>
              <div>
                <h5>Adress</h5>
                <p>{accomodation.street}</p>
                <p>
                  {accomodation.city} {accomodation.zipCode}
                </p>
              </div>
            </div>
          </section>
        </div>
      </Layout>
      <Booking accomodationName={accomodation.name} />
    </>
  );
}

export async function getStaticPaths() {
  try {
    const response = await axios.get(RESULTS_URL);
    console.log(response);
    const accomodations = response.data.data;

    const paths = accomodations.map((accomodation) => ({
      params: {
        id: accomodation.id.toString(),
      },
    }));

    return {
      paths: paths,
      fallback: false,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  const url = `${RESULTS_URL}/${params.id}`;

  let accomodation = null;

  try {
    const response = await axios.get(url);
    accomodation = response.data.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      accomodation: accomodation,
    },
  };
}

// export default function AccomodationDetails({ accomodation }) {
//   const { name, rating, amenities, price, description, street, zipCode, city } =
//     accomodation;

//   return (
//     <>
//       <Layout
//         page="accomodations-id"
//         title={TITLE_ACCOMODATIONS}
//         keywords={KEY_ACCOMODATIONS}
//         description={META_ACCOMODATIONS}
//       >
//         <div className="">
//           <div className="">
//             <section>
//               {/* {accomodations.map((image) => (
//               <Image
//                 className="lg:rounded-l-lg sm:rounded-t-lg shadow bg-cover"
//                 src={image}
//                 layout="fill"
//                 alt={name}
//               />
//             ))} */}
//             </section>
//             <section className="flex flex-center">
//               <div>
//                 <Heading title={name} type="h1" />
//                 <span>
//                   {rating} <StarIcon />
//                 </span>
//               </div>
//               <div className="">
//                 <div>
//                   <span className="">{price} Nok</span>
//                   <p>pr day</p>

//                   <p>including taxes and moms</p>
//                 </div>
//                 <section className="" id="accomodation-cta">
//                   <p className="">We have 2 rooms left!</p>
//                   <ButtonModal type="submit" name="booking">
//                     Book Now!
//                   </ButtonModal>
//                 </section>
//               </div>
//             </section>
//           </div>

//           <section className="">
//             <div>
//               <p>Amenities: {amenities}</p>
//             </div>
//             <div>
//               <p>About: {description}</p>
//             </div>
//             <div>
//               <div>
//                 <h5>Adress</h5>
//                 <p>{street}</p>
//                 <p>
//                   {city} {zipCode}
//                 </p>
//               </div>
//             </div>
//           </section>
//         </div>
//       </Layout>
//       <Booking accomodationName={name} />
//     </>
//   );
// }

// export async function getStaticPaths() {
//   try {
//     const response = await axios.get(RESULTS_URL);
//     const accomodations = response.data.data.attributes;

//     const paths = accomodations.map((accomodation) => ({
//       params: {
//         id: accomodation.id.toString(),
//       },
//     }));

//     return {
//       paths: paths,
//       fallback: false,
//     };
//   } catch (error) {
//     console.log("An error occurred. Error message: " + error);
//   }
// }

// export async function getStaticProps({ params }) {
//   const url = RESULTS_URL + params.id;

//   let accomodations = null;

//   try {
//     const response = await axios.get(url);
//     console.log("response", response);
//     accomodations = response.data.data.attributes;
//   } catch (error) {
//     console.log("An error occurred. Error message: " + error);
//   }

//   return {
//     props: {
//       accomodation: accomodations,
//     },
//   };
// }
