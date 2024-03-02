const express = require("express");
const dotenv = require("dotenv").config();
// const errorHandler = require("./middleware/errorHandler")
const app = express();
const cors = require('cors');
const connectDb = require('./config/dbConnection')
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const port = process.env.PORT || 3000;
const cronJob = require('./config/cron');

//using middleware
app.use(express.json());
app.use(cors());
//connect to db
connectDb();


// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
        title: "Assessment for Open In App uby Parath Safaya",
        version: "1.0.0",
        description: "API documentation Todo application for assessment for Open In App uby Parath Safaya",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    in: 'header',
                    name: 'Authorization',
                    description: 'Bearer Token',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        servers: [
        {
            url: `http://localhost:${port}`,
            description: "Development server",
        },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//routes setup
app.get('/',(req,res)=>{res.send("hey")});

const userRoute = require("./routes/userRoutes");
app.use('/api/users',userRoute)

const create = require('./routes/Create');
app.use('/api/create',create);

const get = require('./routes/Get')
app.use('/api/get',get);

const update = require('./routes/Update')
app.use('/api/update',update);

const deLete = require('./routes/Delete')
app.use('/api/delete',deLete)



app.listen(port,()=>{console.log(`Server is runnning on port ${port}`)})