
// Load express...
const express = require('express')
// Instantiate express...
const app = express()
// Other variables...
const methodOverride = require('method-override');

const port = 3000
// Add dotenv
require('dotenv').config()
// Mongoose info
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo')
})


// Middleware...
app.use(methodOverride('_method'));
app.use((req, res, next) => {
    console.log('I run for all routes')
    next()
})
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'jsx')
app.engine('jsx', require('jsx-view-engine').createEngine())

// Data...
const Log = require('./models/logs')



// Routes...
// Index : Show all the things!
app.get('/logs', (req, res)=>{
    Log.find({}, (error, allLogs)=>{
        res.render('logs/Index', {
            logs: allLogs
        })
    })
})



// New : An empty form for a new thing  
// GET /fruits/new
app.get('/logs/new', (req, res) => {
    res.render('../views/logs/New')
})


// Delete/Destroy : Get rid of this particular thing!  
// DELETE /fruits/:id
app.delete('/logs/:id', (req, res)=>{
    Log.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/logs');//redirect back to fruits index
    });
});
// Update : Update this specific thing with this updated form 
// PUT /fruits/:id
app.get('/logs/:id/edit', (req, res)=>{
    Log.findById(req.params.id, (err, foundLog)=>{ //find the fruit
      if(!err){
        res.render(
    		  'logs/Edit',
    		{
    			log: foundLog //pass in the found fruit so we can prefill the form
    		}
    	);
    } else {
      res.send({ msg: err.message })
    }
    });
    app.put('/logs/:id', (req, res)=>{
        if(req.body.shipIsBroken === 'on'){
            req.body.shipIsBroken = true;
        } else {
            req.body.shipIsBroken = false;
        }
        Log.findByIdAndUpdate(req.params.id, req.body, (err, updatedLog)=>{
           console.log(updatedLog)
            res.redirect(`/logs/${req.params.id}`);
        });
    });
});
// Create : Make a new thing with this filled out form 
//POST /fruits
app.post('/logs', async (req, res)=>{
    if(req.body.shipIsBroken === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.shipIsBroken = true //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.shipIsBroken = false //do some data correction
    }
    // fruits.push(req.body) // pushing new fruit into fruits array
    await Log.create(req.body, (error, createdLog)=>{
        //res.send(createdFruit)
        res.redirect('/logs'); //send the user back to /fruits
    });
    
    
})


// Edit : A prefilled form to update a specific thing 
// GET /fruits/:id/edit

// Show : Show me this one thing by ID
// GET /fruits/:id
app.get('/logs/:id', (req, res)=>{
    Log.findById(req.params.id, (err, foundLog)=>{
        res.render('logs/Show', {
            log:foundLog
        })
    })
})



// Listen...
app.listen(port, () => {
    console.log(`Jigglypuuuuf, Jigglyyyyypuuuuuuuf on ${port}`)
})