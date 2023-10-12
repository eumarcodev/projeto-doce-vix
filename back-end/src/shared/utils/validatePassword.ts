import * as Yup from "yup";

export const passwordSchema = Yup.string()
    .min(8, "Password should be at least 8 characters")
    .max(32, "Password should not exceed 32 characters")
    .matches(/[A-Z]/, "Password should have at least one uppercase letter")
    .matches(/[a-z]/, "Password should have at least one lowercase letter")
    .matches(/\d/, "Password should have at least one number")
    .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password should have at least one special character",
    )
    .required("Password is required");
