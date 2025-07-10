import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { setUser, setLoading, setError } from "../auth/authSlice";

import { Formik } from "formik";
import * as Yup from "yup";
import ReusableInput from "../../components/ui/input/ReusableInput";
import ReusableButton from "../../components/ui/button/ReusableButton";


const validationSchema = Yup.object({
  email: Yup.string().email("Неверный email").required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Минимум 6 символов")
    .required("Обязательное поле"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleEmailLogin = async (values) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      const idTokenResult = await user.getIdTokenResult();
      const role = idTokenResult.claims.role || "user";

      localStorage.setItem("token", idTokenResult.token);

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role,
        })
      );

      navigate("/");
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleLogin = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idTokenResult = await user.getIdTokenResult();
      const role = idTokenResult.claims.role || "user";

      localStorage.setItem("token", idTokenResult.token);

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role,
        })
      );

      navigate("/");
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Вход</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleEmailLogin}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            <ReusableInput
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange("email")}
              placeholder="you@example.com"
              disabled={loading}
              error={touched.email && errors.email}
            />

            <ReusableInput
              label="Пароль"
              type="password"
              value={values.password}
              onChange={handleChange("password")}
              placeholder="••••••••"
              disabled={loading}
              error={touched.password && errors.password}
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <ReusableButton type="submit" loading={loading} disabled={loading}>
              Войти
            </ReusableButton>
          </form>
        )}
      </Formik>

      <div className="mt-6">
        <p className="text-center text-sm text-gray-500 mb-2">
          или войдите через
        </p>
        <ReusableButton
          onClick={handleGoogleLogin}
          disabled={loading}
          loading={loading}
        >
          Войти через Google
        </ReusableButton>
      </div>
    </div>
  );
}
