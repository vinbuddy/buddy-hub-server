export default function sendValidationErr(res, error = {}) {
    let errors = {};

    Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
    });

    res.status(400).send(errors);
}
