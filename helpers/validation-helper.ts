import * as Yup from "yup";

export default class ValidationHelper {

    static EmailValidator = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    static PasswordValidator = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/)


    static validateSignupForm = Yup.object().shape({
        name: Yup.string().required("Name is required").max(1024, "Name is too long"),
        email: Yup.string().required("Email is required").email("Email is invalid").max(1024, "Email is too long"),
        password: Yup.string().required("Password is required").matches(ValidationHelper.PasswordValidator, "Password must have minimum eight characters, at least one letter and one number:"),
        confirmPassword: Yup.string().required("Confirm your password").oneOf([Yup.ref("password")], "Passwords don't match")
    })

    static validateProfileForm = Yup.object().shape({
        name: Yup.string().required("Name is required").max(1024, "Name is too long"),
        email: Yup.string().required("Email is required").email("Email is invalid").max(1024, "Email is too long"),
    })
}
