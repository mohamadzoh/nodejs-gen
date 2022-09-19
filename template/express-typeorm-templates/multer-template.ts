function multerTemplate(){
return `const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.fieldname + file.size + file.originalname);
    },
    allowedFiles: function (req, file, cb) {
        if (!file.originalname.match(/\.(pdf|doc|docx|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/)) {
            req.fileValidationError = 'Only pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file type are allowed!';
            return cb(new Error('Only pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file type  are allowed!'), false);
        }
        cb(null, true);
    }
})
const upload = multer({ storage: storage })
export default upload;`
}
export default multerTemplate;