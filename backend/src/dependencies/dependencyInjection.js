import { AuthenticationMiddleware, ResourceMiddleware } from '../middlewares';
import {
  helloController as HelloController,
  UserController,
  SessionController,
  ResourceController,
  AuthenticationController,
  TroopController,
  KingdomController,
  BuildingController,
} from '../controllers';
import {
  BuildingService,
  KingdomService,
  ResourceService,
  SessionService,
  TroopService,
  UserService,
} from '../services';
import {
  BuildingRepo,
  errorCodes,
  KingdomRepo,
  LocationRepo,
  ResourceRepo,
  TroopRepo,
  UserRepo,
} from '../repos';
import { db } from '../data/connection';

export const userRepo = new UserRepo(db, errorCodes);
export const buildingRepo = new BuildingRepo(db, errorCodes);
export const kingdomRepo = new KingdomRepo(db, errorCodes);
export const locationRepo = new LocationRepo(db, errorCodes);
export const resourceRepo = new ResourceRepo(db, errorCodes);
export const troopRepo = new TroopRepo(db, errorCodes);

export const sessionService = new SessionService({ userRepo, errorCodes });
export const resourceService = new ResourceService({
  resourceRepo,
  errorCodes,
});
export const buildingService = new BuildingService({
  buildingRepo,
  resourceService,
  errorCodes,
});
export const troopService = new TroopService({
  troopRepo,
  resourceService,
  buildingService,
  errorCodes,
});
export const userService = new UserService({
  userRepo,
  kingdomRepo,
  resourceService,
  buildingService,
  errorCodes,
});
export const kingdomService = new KingdomService({
  kingdomRepo,
  resourceService,
  buildingService,
  troopService,
  locationRepo,
  errorCodes,
});

export const userController = new UserController(userService, errorCodes);
export const authenticationController = new AuthenticationController();
export const sessionController = new SessionController(
  sessionService,
  errorCodes
);
export const kingdomController = new KingdomController(
  kingdomService,
  errorCodes
);
export const resourceController = new ResourceController(
  resourceService,
  errorCodes
);
export const buildingController = new BuildingController(
  buildingService,
  errorCodes
);
export const troopController = new TroopController(troopService, errorCodes);
export const helloController = HelloController;

export const authenticationMiddleware = new AuthenticationMiddleware(
  sessionService,
  errorCodes
);
export const resourceMiddleware = new ResourceMiddleware(
  resourceService,
  errorCodes
);
