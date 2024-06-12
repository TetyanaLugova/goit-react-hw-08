import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";
import { useId } from "react";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    )
      .unwrap()
      .then(() => {
        console.log("login success");
      })
      .catch(() => {
        console.log("login error");
      });

    form.reset();
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
      <Form>
        <label htmlFor={emailFieldId}>Email</label>
        <Field type="email" name="email" id={emailFieldId} />
        <ErrorMessage className={css.error} name="email" component="span" />
        <label htmlFor={passwordFieldId}>Password</label>
        <Field type="password" name="password" id={passwordFieldId} />
        <ErrorMessage className={css.error} name="password" component="span" />
        <button type="submit">Log In</button>
      </Form>
    </Formik>
  );
};
