import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegisterForm.module.css";
import { useId } from "react";
import { toast } from "react-toastify";

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    dispatch(register(newUser))
      .unwrap()
      .then(() => {
        toast.success("Success!", { position: "top-center" });
      })
      .catch(() => {
        toast.error("Error, input correct data", {
          position: "top-center",
        });
      });
    actions.resetForm();
  };

  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const RegisterFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
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
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={RegisterFormSchema}
    >
      <Form className={css.form}>
        <label className={css.label} htmlFor={nameFieldId}>
          Username
        </label>
        <Field className={css.input} type="text" name="name" id={nameFieldId} />
        <ErrorMessage className={css.error} name="name" component="span" />
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
          Register
        </button>
      </Form>
    </Formik>
  );
};
