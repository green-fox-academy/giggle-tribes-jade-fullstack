export class TroopController {
  constructor(troopService, errorCodes) {
    this.troop = troopService;
    this.post = this.post.bind(this);
    this.get = this.get.bind(this);
    this.put = this.put.bind(this);
    this.errorMessages = {
      [errorCodes.missingKingdomId]: {
        status: 400,
        message: 'KingdomId is missing.',
      },
      [errorCodes.missingResourceType]: {
        status: 400,
        message: 'Missing resource type.',
      },
      [errorCodes.missingResourceAmount]: {
        status: 400,
        message: 'Missing resource amount.',
      },
      [errorCodes.missingResourceGeneration]: {
        status: 400,
        message: 'Missing resource generation.',
      },
      [errorCodes.missingTroopLevel]: {
        status: 400,
        message: 'Missing Troop level.',
      },
      [errorCodes.missingTroopAmount]: {
        status: 400,
        message: 'Missing amount.',
      },
      [errorCodes.invalidKingdomId]: {
        status: 400,
        message: 'Invalid kingdomId.',
      },
      [errorCodes.invalidResourceAmount]: {
        status: 400,
        message: 'Not enough gold.',
      },
      [errorCodes.invalidAddLimit]: {
        status: 400,
        message: 'Townhall capacity has been exceeded.',
      },
      [errorCodes.invalidUpdateLimit]: {
        status: 400,
        message: 'Academy level is too low.',
      },
      [errorCodes.invalidTroopAmount]: {
        status: 400,
        message: 'Not enough troop at this level.',
      },
    };
  }

  post(req, res) {
    this.troop
      .add({ kingdomId: req.params.kingdomId })
      .then(response => res.status(201).json(response))
      .catch(error => {
        console.log(error);
        res.status(this.errorMessages[error.message].status || 400).json({
          error: this.errorMessages[error.message].message || error.message,
        });
      });
  }

  get(req, res) {
    this.troop
      .getByKingdomId({ kingdomId: req.params.kingdomId })
      .then(response => res.status(201).json(response))
      .catch(error => {
        const status = this.errorMessages[error.message]
          ? this.errorMessages[error.message].status
          : 400;
        const message = this.errorMessages[error.message]
          ? this.errorMessages[error.message].message
          : error.message;
        res.status(status).json({ error: message });
      });
  }

  put(req, res) {
    this.troop
      .upgrade({
        kingdomId: req.params.kingdomId,
        level: req.body.level,
        amount: req.body.amount,
      })
      .then(response => res.status(201).json(response))
      .catch(error => {
        res.status(this.errorMessages[error.message].status || 400).json({
          error: this.errorMessages[error.message].message || error.message,
        });
      });
  }
}
