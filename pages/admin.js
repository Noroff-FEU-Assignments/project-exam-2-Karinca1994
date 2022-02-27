import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import { AdminLayout } from "../components/layout/Layout";
import { META_ADMIN, KEY_ADMIN, TITLE_ADMIN } from "../constants/meta";

export default function admin() {
  const [auth] = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push("/login");
      localStorage.clear();
    }
    try {
    } catch (error) {
      router.push("/login");
      localStorage.clear();
    }
  }, []);

  return (
    <AdminLayout
      page="home"
      title={TITLE_ADMIN}
      keywords={KEY_ADMIN}
      description={META_ADMIN}
    >
      <section className="p-6">
        <h1>You are logged in as an Admin!</h1>
        <div className="mt-3">
          <p>Navigate using the admin navigation in the header.</p>
        </div>
      </section>
    </AdminLayout>
  );
}
