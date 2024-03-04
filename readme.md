```plaintext
TODO_APP_OPENINAPP/
|-- config/
|   |-- dbConnection.js
|   |-- cron.js
|-- controllers/
|   |-- createControllers.js
|   |-- deleteControllers.js
|   |-- getControllers.js
|   |-- updateControllers.js
|   |-- getControllers.js
|   |-- userControllers.js
|-- middleware/
|   |-- errorHandler.js
|   |-- validateTokenHandler.js
|-- models/
|   |-- equityModel.js
|   |-- favouriteModel.js
|   |-- userModel.js
|-- routes/
|   |-- equityRoutes.js
|   |-- favouriteRoutes.js
|   |-- userRoutes.js
|-- index.js
|-- script.js
```

#Flowchart
https://miro.com/app/board/uXjVNlnGnOE=/?share_link_id=141701713843

# Create a .env file with following parameters
PORT=<PORT_NO>
CONNECTION_STRING=<Database Connection string (MongoDb specifically)>
ACCESS_TOKEN_SECRET=<Any strong secret key>
TWILIO_ACCOUNT_SID=<TWILIO_TOKEN_ACCOUNT>
TWILIO_AUTH_TOKEN=<TWILIO_TOKEN_AUTH>
TWILIO_PHONE_NUMBER=<Twilio_phone_no>
