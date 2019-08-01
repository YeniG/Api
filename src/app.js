const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');



app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(bodyParser.json());

require('./routes/userRoutes')(app);


app.listen(app.get('port'), () => {
    console.log('server on port 3000');
});