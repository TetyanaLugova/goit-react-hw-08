import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegisterForm.module.css";
import { useId } from "react";

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );

    form.reset();
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
      <Form>
        <label htmlFor={nameFieldId}>Username</label>
        <Field type="text" name="name" id={nameFieldId} />
        <ErrorMessage className={css.error} name="name" component="span" />
        <label htmlFor={emailFieldId}>Email</label>
        <Field type="email" name="email" id={emailFieldId} />
        <ErrorMessage className={css.error} name="email" component="span" />
        <label htmlFor={passwordFieldId}>Password</label>
        <Field type="password" name="password" id={passwordFieldId} />
        <ErrorMessage className={css.error} name="password" component="span" />
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};
