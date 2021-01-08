const express = require('express');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(express.json())
app.use(morgan('dev'));

// Routes
app.use('/people', require('./routes/peopleRouter.js'));

// Error Handling
app.use((err, req, res, next) => {
    return res.send({errMsg: err.message});
})

// Listen to port 9000
app.listen(9000, () => {
    console.log('Server listening to port 9000');
});
