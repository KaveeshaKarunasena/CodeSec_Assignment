import authService from './auth.service.js';


const AuthGuard = async (req, res, next) => {
  const authToken = req.headers['authorization'];

  console.log("here",authToken);
  if (!authToken) {
    return res.status(401).send({
      err: 'Forbinded Resources',
    });
  }

  try {
    const payload = await authService.verifyToken(
      // verify the token and get the payload
      authToken.split('Bearer ')[1],
    );
    req.currentUser = payload; //assign the payload to the req   
    next();
  } catch (err) {
    return res.status(401).send({
      err: 'Forbinded Resources',
    });
  }
};

export default AuthGuard;
