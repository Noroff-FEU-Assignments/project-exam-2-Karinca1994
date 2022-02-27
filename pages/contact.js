import ContactForm from "../components/contact/ContactForm.js";
import Heading from "../components/layout/Heading";
import Link from "next/link";
import Layout from "../components/layout/Layout.js";
import { TITLE_CONTACT, KEY_CONTACT, META_CONTACT } from "../constants/meta";

function contact() {
  return (
    <>
      <Layout
        page="contact"
        title={TITLE_CONTACT}
        keywords={KEY_CONTACT}
        description={META_CONTACT}
      >
        <div className="flex flex-col justify-center items-center">
          <Heading title="Contact Page" type="h1" />
          <div>
            <ContactForm />
            <div className="my-16">
              <button className="shadow border-blue-700 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded">
                <Link href="/login" className="p-4 line-under text-red-800">
                  <a className="py-3 px-5">Login as ADMIN</a>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default contact;
