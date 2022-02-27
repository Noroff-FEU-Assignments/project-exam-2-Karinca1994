import PageLayout from "./PageLayout.js";
import { NavBar } from "./NavBar";
import Head from "./Head";
import { AdminNavBar } from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children, page, title, keywords, description }) => (
  <>
    {/* head -seo values*/}
    <Head title={title} keywords={keywords} description={description} />

    {/* body content */}
    <div className="bg-white-500 py-6 flex flex-col justify-center relative overflow-hidden sm:py-0">
      <NavBar active={page} />

      <PageLayout page={page}>{children}</PageLayout>
      <Footer />
    </div>
  </>
);

export default Layout;

// Admin Side Layout --------------------------------------------------------
export const AdminLayout = ({
  title,
  keywords,
  description,
  children,
  page,
}) => (
  <>
    {/* head -seo values*/}
    <Head title={title} keywords={keywords} description={description} />

    {/* body content */}
    <div className="bg-white-500 py-6 flex flex-col justify-center relative overflow-hidden sm:py-0">
      <AdminNavBar />

      <PageLayout page={page}>{children}</PageLayout>
    </div>
  </>
);
