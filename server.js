const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//Routers

const wineRoutes = express.Router();
const Wine = require('./model/winespiritapp.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://malavshahms123:SZWMNuYQT5esCwNc@cluster0.e82ck6b.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Database connected successfully...');
      // Your server setup and other code...
    })
    .catch((error) => {
      console.error('Error connecting to the database:', error);
    });

const connection = mongoose.connection;

// connection.once('open', ()=>{
//     console.log("Database connected successfully...");
// })

wineRoutes.route('/').get((req, res)=>{
    Wine.find()
    .then(wines=>res.status(200).json(wines))
    .catch(err=>res.status(400),json({"error":err}))

});

wineRoutes.route('/:id').get((req,res)=>{
    Wine.findById(req.params.id)
    .then(wines=>res.status(200).json(wines))
    .catch(err=>res.status(400),json({"error":err}))

});

wineRoutes.route('/add').post(async(req, res) =>{
    const { name, price, cardholdername, quantity,datePurchased,expirationDate,wineType } = req.body;
    const wines = new Wine({
        name, price, cardholdername, quantity,datePurchased,expirationDate,wineType,
    });
    
    const savedwines = await wines.save()
    res.json(savedwines);
});


wineRoutes.route('/update/:id').post((req,res)=>{
    Wine.findById(req.params.id)
    .then(wines=>{
        wines.name = req.body.name;
        wines.price = req.body.price;
        wines.cardholdername = req.body.cardholdername;
        wines.quantity = req.body.quantity;
        wines.datePurchased = req.body.datePurchased;
        wines.expirationDate = req.body.expirationDate;
        wines.wineType = req.body.wineType;

        wines.save()
        .then(wines=>res.status(200).json(wines))
        .catch(err=>res.status(400).json({"error":err}))

        res.status(200).json(wines)
    })
    .catch(err=>res.status(400).json({"error":err}))
    
    
});

wineRoutes.route('/:id').delete((req,res)=>{
    Wine.deleteMany()
    .then(wines=>res.status(200).json(wines))
    .catch(err=>res.status(400).json({"error":err}))
});

app.use(wineRoutes);

app.listen(2122,()=>{
    console.log("Server is running on port 2122...")
})