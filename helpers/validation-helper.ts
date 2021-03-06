import * as Yup from "yup";

export default class ValidationHelper {

    static EmailValidator = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    static PasswordValidator = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/)
    static NameValidator = new RegExp("^[a-zA-Zа-яёА-ЯЁ]+(([',. -][a-zA-Zа-яёА-ЯЁ])?[a-zA-Zа-яёА-ЯЁ]*)*$");

    static validateSignupForm = Yup.object().shape({
        name: Yup.string().required("Name is required").max(1024, "Name is too long").matches(ValidationHelper.NameValidator),
        email: Yup.string().required("Email is required").email("Email is invalid").max(1024, "Email is too long"),
        password: Yup.string().required("Password is required").matches(ValidationHelper.PasswordValidator, "Password must have minimum eight characters, at least one letter and one number:"),
        confirmPassword: Yup.string().required("Confirm your password").oneOf([Yup.ref("password")], "Passwords don't match")
    })

    static validateProfileForm = Yup.object().shape({
        name: Yup.string().required("Name is required").max(1024, "Name is too long").matches(ValidationHelper.NameValidator, "Invalid name"),
        email: Yup.string().required("Email is required").email("Email is invalid").max(1024, "Email is too long"),
    })

    static validateWriteReview = Yup.object().shape({
        review: Yup.string().required("Review is required").max(2048, "Review is too long"),
        rating: Yup.number().required("Rating is required").min(1, "Rating is required").max(10, "Rating have to be less than 10"),
    })
}
