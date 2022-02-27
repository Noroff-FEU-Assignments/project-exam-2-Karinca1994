import Layout from "../components/layout/Layout";
import { KEY_LOGIN, META_LOGIN, TITLE_LOGIN } from "../constants/meta";
import axios from "axios";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FeedbackMessage from "../components/common/FeedbackMessage";
import { TOKEN_PATH, BASE_URL } from "../constants/api";
import AuthContext from "../context/AuthContext";
import { errorColour, ErrorIcon } from "../constants/stylement";

const schema = yup.object().shape({
  identifier: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

const url = BASE_URL + TOKEN_PATH;

const login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [, setAuth] = useContext(AuthContext);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data);
      setAuth(response.data);
      router.push("/admin");
    } catch (error) {
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout
      page="login"
      title={TITLE_LOGIN}
      keywords={KEY_LOGIN}
      description={META_LOGIN}
    >
      <article>
        <div
          id="login"
          className="login h-screen flex items-center justify-center bg-gray-100"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset
              disabled={submitting}
              className="bg-white py-5 px-8 border-t-4 border-blue-600 rounded-md shadow-lg"
            >
              {/* Loin error */}

              <div className="mb-2">
                {loginError && (
                  <div className="text-sm text-red-700 flex">
                    {loginError} <ErrorIcon />
                  </div>
                )}

                <h2 className="text-3xl text-gray-400 mb-3">Login</h2>
                {/* Username */}
                <div className="mb-2">
                  <label className="text-sm">Urername</label>
                  <input
                    {...register("identifier")}
                    name="identifier"
                    type="text"
                    placeholder="Username or Email"
                    className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                    error={
                      errors.identifier && (
                        <FeedbackMessage
                          type="error"
                          message={errors.identifier.message}
                        >
                          <ErrorIcon colour={errorColour} />
                        </FeedbackMessage>
                      )
                    }
                  />
                </div>
                {/* Password */}

                <div className="mt-2 mb-3">
                  <label className="text-sm">Password</label>
                  <input
                    {...register("password")}
                    name="password"
                    type="password"
                    placeholder="*******"
                    className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                    error={
                      errors.password && (
                        <FeedbackMessage
                          type="error"
                          message={errors.password.message}
                        >
                          <ErrorIcon colour={errorColour} />
                        </FeedbackMessage>
                      )
                    }
                  />
                </div>
              </div>
              <button
                className="border-none bg-blue-700 py-2 px-3 text-white roudend-sm w-full mt-2 rounded-md hover:bg-blue-600 mb-5"
                type="submit"
              >
                {submitting ? "Loggin in..." : "Login"}
              </button>
            </fieldset>
          </form>
        </div>
      </article>
    </Layout>
  );
};

export default login;
