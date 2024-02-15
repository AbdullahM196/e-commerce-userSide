import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { useRegisterMutation } from "../../store/api/Slices/User";
import { BiShoppingBag } from "react-icons/bi";
import { Form } from "react-bootstrap";
import InputComponent from "./input";
import { useFormik } from "formik";
import { RegisterSchema } from "./schema";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
export default function Register() {
  const MySwal = withReactContent(Swal);
  const [register] = useRegisterMutation();
  async function handleRegister(values, actions) {
    if (isValid) {
      try {
        await register({
          firstName: values.firstName,
          lastName: values.lastName,
          userName: values.userName,
          email: values.email,
          mobile: values.mobile,
          password: values.password,
        }).unwrap();
        actions.resetForm();
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: error.data.message,
        });
        console.log(error);
      }
    }
  }
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    isValid,
    touched,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: handleRegister,
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div id="authForm">
      <Form
        onSubmit={handleSubmit}
        className="form_container"
        method="POST"
        // autoComplete="off"
      >
        <div className="logo_container">
          <BiShoppingBag />
        </div>
        <div className="title_container">
          <p className="title">Create an Account</p>
          <span className="subtitle">
            Get started with our app, just create an account and enjoy the
            experience.
          </span>
        </div>
        <br />
        <InputComponent
          id="firstName"
          labelName="firstName"
          type="text"
          placeholder="Enter Your firstName"
          value={values.firstName}
          setValue={handleChange}
          handleBlur={handleBlur}
        />

        {touched.firstName && errors.firstName && (
          <span className="align-self-start text-danger">
            {errors.firstName}
          </span>
        )}
        <InputComponent
          id="lastName"
          labelName="lastName"
          type="text"
          placeholder="Enter Your lastName"
          value={values.lastName}
          setValue={handleChange}
          handleBlur={handleBlur}
        />
        {touched.lastName && errors.lastName && (
          <span className="align-self-start text-danger">
            {errors.lastName}
          </span>
        )}
        <InputComponent
          id="userName"
          labelName="userName"
          type="text"
          placeholder="Enter Your userName"
          value={values.userName}
          setValue={handleChange}
          handleBlur={handleBlur}
        />
        {touched.userName && errors.userName && (
          <span className="align-self-start text-danger">
            {errors.userName}
          </span>
        )}
        <InputComponent
          id="mobile"
          labelName="mobile"
          type="text"
          placeholder="Enter Your Mobile Number"
          value={values.mobile}
          setValue={handleChange}
          handleBlur={handleBlur}
          error={errors.mobile}
        />
        {touched.mobile && errors.mobile && (
          <span className="align-self-start text-danger">{errors.mobile}</span>
        )}
        <InputComponent
          id="email"
          labelName="email"
          type="email"
          placeholder="Enter Your Email"
          value={values.email}
          setValue={handleChange}
          handleBlur={handleBlur}
          error={errors.email}
        />
        {touched.email && errors.email && (
          <span className="align-self-start text-danger">{errors.email}</span>
        )}
        <InputComponent
          id="password"
          labelName="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter Your Password"
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          value={values.password}
          setValue={handleChange}
          handleBlur={handleBlur}
          error={errors.password}
        />
        {touched.password && errors.password && (
          <span className="align-self-start  text-danger">
            {errors.password}
          </span>
        )}
        <InputComponent
          id="confirmPassword"
          labelName="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          setShowPassword={setShowConfirmPassword}
          showPassword={showConfirmPassword}
          placeholder="confirm Your Password"
          value={values.confirmPassword}
          setValue={handleChange}
          handleBlur={handleBlur}
          error={errors.confirmPassword}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <span className="align-self-start text-danger">
            {errors.confirmPassword}
          </span>
        )}

        <button
          title="Sign Up"
          className="sign-in_btn"
          disabled={!isValid}
          type="submit"
        >
          <span>Sign Up</span>
        </button>

        <div className="separator">
          <hr className="line" />
          <span>Or</span>
          <hr className="line" />
        </div>
        <button
          className="sign-in_ggl"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </Form>
    </div>
  );
}
