const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forcast= require('./utils/forcast')

const port = process.env.PORT || 3000


const app = express()
//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'Soumen'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Soumen'
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
       return  res.send({
            error:"please provide a search term"
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        helpText: 'This is some helpful text',
        name:'Soumen'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error:"Please provide a search term"
        })
    }
    const address = req.query.address
    geoCode(address,(error,{ latitude, longitude, location}={}) =>{
        if (error) {
            return  res.send({
                error
            })
        }
    forcast(latitude,longitude,(error,forcastData) =>{
        if(error){
            return res.send({error})
        }
            res.send({
            location,
            forcast:forcastData
        })
      })
    })
})

app.get('/help/*',(req, res) => {
    res.render('404-page',{
        title:"404",
        name:'Soumen',
        errorMessage:'Help page doc is not found!'
    })
})

app.get('*',(req, res) => {
    res.render('404-page',{
        title:"404",
        name:'Soumen',
        errorMessage:'page doc is not found!'
    })
})



// app.get('/help',(req, res) => {
//     res.send('<h1>Help</h1>')
// })


// app.get('/weather',(req, res) => {
//     res.send({
//         forcast:'Light rainig',
//         location:'balichak'
//     })
// })

app.listen(3000,() => {
    console.log("Server is up on port " + port)
})