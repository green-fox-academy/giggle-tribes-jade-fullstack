function validateRequiredInputs(errorMessage, arrayRequiredInputs) {
    const isRequiredFieldEmpty = arrayRequiredInputs.reduce(function(
            final,
            current
        ) {
            final = final || current === '';
            return final;
        },
        false);

    return { message: errorMessage, isError: isRequiredFieldEmpty };
}

export default validateRequiredInputs;