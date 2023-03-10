const Express = require('express');
const CORS = require('cors');

require('dotenv').config();

const ConnectDB = require('./database/config/config');
const HandleError = require('./middlewares/error/error-handler.middleware');
const UserRoutes = require('./routes/user.routes');
const AdminRoutes = require('./routes/admin.routes');
const EventRoutes = require('./routes/event.routes');

const App = Express();

App.use(CORS());
App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));

App.use('/api/v1/auth', UserRoutes);
App.use('/api/v1/admin', AdminRoutes);
App.use('/api/v1/event', EventRoutes);

// error handler
App.use(HandleError);

const startServer = async (connPort) => {
    try {
        await ConnectDB(process.env.DB_URI);
        console.log("Connected To DB Successfully!");
        
        App.listen(
            connPort,
            () => console.log(`Server Running At http://localhost:${connPort}`)
        );
    }
    catch(err) {
        console.log("Connection To DB Failed! Exiting Now....");
        console.error(err);
        process.exit(1);
    }
};

const CONN_PORT = process.env.PORT || 3354;
startServer(CONN_PORT);