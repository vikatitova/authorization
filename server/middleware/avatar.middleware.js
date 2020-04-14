const multer = require('multer');
import { v4 as uuidv4 } from 'uuid';
const path = 'avatars';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4().toString() + '_' + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
    } else {
        cb(new Error('Wrong type of file'));
    }
};

const multerMiddleware = multer({
    storage,
    fileFilter,
}).single('filedata');

module.exports = multerMiddleware;
