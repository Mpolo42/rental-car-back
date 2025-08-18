const express = require('express')
const cors = require('cors');

const { PrismaClient } = require('./generated/prisma')

const prisma = new PrismaClient()

const app = express()
const port = 3001

app.use(cors());
app.use(express.json());

let cars = []

app.get('/cars', async (req, res) => {
  const allCars = await prisma.car.findMany()
  // RETORNAR LIST DE CARROS COM STATUS 200
  res.status(200).json(allCars)
})

app.post('/cars', async (req, res) => {
  console.log(req.body)
  const car = {
    name: req.body.name,
    category: req.body.category,
    seats: req.body.seats,
    price: req.body.price,
    transmission: req.body.transmission,
    fuel: req.body.fuel,
    image: req.body.image,
    available: req.body.available,
  }

  const NewCar = await prisma.car.create({ 
    data: car
  })
  res.status(201).json(NewCar)

})

app.delete('/cars/:id', async (req, res) => {
 try {
    const deletedCar = await prisma.car.delete({
      where: { id: req.params.id }
    })
  } catch (error) {
    res.status(404).json({ error: 'Carro não encontrado' })
  }
})

app.put('/cars/:id', async (req, res) => {
  try {
    const updatedCar = await prisma.car.update({
      where: { id: req.params.id },
      data : {
        name: req.body.name,
    category: req.body.category,
    seats: req.body.seats,
    price: req.body.price,
    transmission: req.body.transmission,
    fuel: req.body.fuel,
    image: req.body.image,
    available: req.body.available,
    }
  })
  
    res.status(200).json(updatedCar)
  } catch (error) {
    res.status(404).json({ error: 'Carro não encontrado' })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
