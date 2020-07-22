class ValidationError extends Error {
    constructor(field) {
      super();
      this.validationError = `The ${field} was not provided.`;
    }
};
export const paramsValidation = (params) => {
    Object.keys(params).forEach( key => {
        if (params[key] === "") throw new ValidationError(key);
    });
    return Object.values(params);
};

