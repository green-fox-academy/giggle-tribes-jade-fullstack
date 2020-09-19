export class SessionController {
  constructor(sessionService, errorCodes) {
    this.session = sessionService;
    this.post = this.post.bind(this);
    this.errorMessages = {
      [errorCodes.missingUserNameAndPassword]: {
        status: 401,
        message: 'Username and password are required.',
      },
      [errorCodes.missingUserName]: {
        status: 401,
        message: 'Username is reuired.',
      },
      [errorCodes.missingPassword]: {
        status: 401,
        message: 'Password is required.',
      },
      [errorCodes.invalidUserNameAndPassword]: {
        status: 401,
        message: 'Invalid username or password.',
      },
    };
  }

  post(req, res) {
    const { username, password } = req.body;
    this.session
      .login({ userName: username, password })
      .then(response => res.status(201).json(response))
      .catch(error => {
        const status = this.errorMessages[error.message]
          ? this.errorMessages[error.message].status
          : 401;
        const message = this.errorMessages[error.message]
          ? this.errorMessages[error.message].message
          : error.message;
        res.status(status).json({ error: message });
      });
  }
}
