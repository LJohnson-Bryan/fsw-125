const express = require('express');
const morgan = require('morgan');
const app = express();

// Middleware (For all requests),
app.use(express.json())
app.use(morgan('dev'));

// Routes
app.use('/things', require('./routes/thingRouter.js'));

// Error Handling
app.use((err, req, res, next) => {
    // console.log(err)
    return res.send({errMsg: err.message})
})

// Listen to port 9000
app.listen(9000, () => {
    console.log('Server is now listening to port 9000!');
});
