const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

const app = express();
const upload = multer();
app.use(cors());
const port = process.env.port || 80;
app.use(express.static('View'));

app.get('/noun/', upload.none(), async (request, response)=>{
    
});
app.post('/noun/', upload.none(),
check('', '').isLength({min:1}),
async (request, response)=>{
    //console.log(request)
    const errors = validationResult(request);
        if (!errors.isEmpty()) {
            console.log(errors);
            return response
                .status(400)
                .json({
                    message: 'Request fields or files are invalid.',
                    errors: errors.array(),
                });
        }
});


app.listen(port, ()=>{
    console.log(`Listening at http://localhost:${port}`);
});

