import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";
import "../styles/style.scss";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
