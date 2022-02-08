const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

var corsOptions = {
    origin: 'http://localhost:3000'
};


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const db = require('./app/models');

const Role = db.role;

db.sequelize.sync({
    force: false
})
.then(() => {
    console.log('Drop and Resync Db');
    initial();
});


function initial() {
    Role.create({
        id: 1,
        name: 'user'
    });

    Role.create({
        id: 2,
        name: 'moderator'
    });

    Role.create({
        id: 3,
        name: 'admin'
    });
}

app.get('/', (req, res) => {
    res.json({
        message: 'welcome Fellow users'
    });
});

// Routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.nextTick.PORT || 3000;


app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
})