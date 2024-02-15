import * as yup from "yup";
export const RegisterSchema = yup.object({
  firstName: yup
    .string()
    .matches(/^[a-z]{3,}$/i, "Enter a valid Name")
    .min(3),
  lastName: yup
    .string()
    .matches(/^[a-z]{3,}$/i, "Enter a valid Name")
    .min(3),
  userName: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, "Enter a valid User Name")
    .required("User Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Enter a valid Email"
    )
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(/^(010|011|012|015)[0-9]{8}$/, "Enter a valid Mobile Number")
    .required("Mobile is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_^&#@])[A-Za-z\d@$!%*?&\-_^&#@]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character. It should be at least 8 characters long."
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
