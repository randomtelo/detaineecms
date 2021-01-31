import Router from 'koa-router';
import passport from 'koa-passport';

import institutionController from './controllers/institution';
import personController from './controllers/detainee';
import userController from './controllers/user';

const router = new Router();

// Prison management
router.post('/institution/get/', passport.authenticate('jwt', { session: false }), institutionController.getInstitutions);
router.post('/institution/create/:id/', passport.authenticate('jwt', { session: false }), institutionController.createInstitution);
router.post('/institution/update/:id/', passport.authenticate('jwt', { session: false }), institutionController.updateInstitution)
router.post('/institution/delete/:id/', passport.authenticate('jwt', { session: false }), institutionController.deleteInstitution);

// Person in prison
router.post('/detainee/get/', passport.authenticate('jwt', { session: false }), personController.getDetainees);
router.post('/detainee/create/:id/', passport.authenticate('jwt', { session: false }), personController.createDetainee);
router.post('/detainee/update/:id/', passport.authenticate('jwt', { session: false }), personController.updateDetainee);
router.post('/detainee/delete/:id/', passport.authenticate('jwt', { session: false }), personController.deleteDetainee);

// CMS Users
router.post('/getuser/', userController.getUser); //
router.post('/user/get/', passport.authenticate('jwt', { session: false }), userController.getUsers);
router.post('/user/create/:id/', passport.authenticate('jwt', { session: false }), userController.createUser);
router.post('/user/update/:id/', passport.authenticate('jwt', { session: false }), userController.updateUser);
router.post('/user/delete/:id/', passport.authenticate('jwt', { session: false }), userController.deleteUser);


const api = router;
export {
    api,
}