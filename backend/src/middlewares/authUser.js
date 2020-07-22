import { authService } from '../services';

export const authUser = async (req, res, next) => {
    try {
        req.user = await authService(req.header('TRIBES_TOKEN'), process.env.JWT_SECRET);
        next();
    } catch(err) {
        res.status(401).send(err);
    }
};
