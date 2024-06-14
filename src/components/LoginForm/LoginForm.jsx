import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";
import { useId } from "react";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const userData = {
      email: values.email,
      password: values.password,
    };
    dispatch(logIn(userData))
      .unwrap()
      .then(() => {
        toast.success("Login success!", { position: "top-center" });
      })
      .catch(() => {
        toast.error("Error, input correct data", {
          position: "top-center",
        });
      });

    actions.resetForm();
  };

  const emailFieldId = useId();
  const passwordFieldId = useId();

  const LoginFormSchema = Yup.object().shape({
    email: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .email("Must be a valid email")
      .required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={LoginFormSchema}
    >
      <Form className={css.form}>
        <label className={css.label} htmlFor={emailFieldId}>
          Email
        </label>
        <Field
          className={css.input}
          type="email"
          name="email"
          id={emailFieldId}
        />
        <ErrorMessage className={css.error} name="email" component="span" />
        <label className={css.label} htmlFor={passwordFieldId}>
          Password
        </label>

        <Field
          className={css.input}
          type="password"
          name="password"
          id={passwordFieldId}
        />
        <ErrorMessage className={css.error} name="password" component="span" />
        <button className={css.btn} type="submit">
          Log In
        </button>
      </Form>
    </Formik>
  );
};
