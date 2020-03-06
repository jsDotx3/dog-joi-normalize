const {validation} = require('@jsdotx3/normalize-joi-errors');
const {create} = require('./schema');

/**
 * Router is instance of express.Router()
 * @link https://expressjs.com/en/guide/routing.html
 */
router.get('/', (req,res,next) => {
    res.status(200).json('ok');
}, validation(create));