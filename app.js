const express = require('express');
const hbs = require('hbs');
const path = require('path');
const mongoose = require('mongoose');

const PORT = 3000;
const app = express();

// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/**
 * Creación de esquema
 */

const catSchema = new mongoose.Schema(
  {
    name: { type: String, enum: ['Luis', 'Bigotes'] },
    age: { type: Number, default: 1 },
    address: {
      street: { type: String },
      type: { type: String },
    },
    key1: { type: String, required: true },
    key2: { type: String, unique: true, required: true },
    key3: { type: Number, min: 0, max: 100 },
    key4: {
      type: Number,
      validate: {
        validator: (key4) => {
          return key4 >= 0 && key4 <= 100;
        },
        message: 'key4 validation error.',
      },
    },
    array: [{ type: String }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

/**
 * Creación de colección.
 */

const CatModel = mongoose.model('Cat', catSchema);

/**
 * Conexión a la BD Mongoose
 */

mongoose
  .connect('mongodb://127.0.0.1:27017/classPepe2')
  .then((mongooseConnect) => {
    console.log(
      `Conneted to Mongo! Database name: ${mongooseConnect.connections[0].name}`
    );
  })
  .then(() => {
    return CatModel.find(); // IMPORTANTE DEVOLVER LA PROMESA
  })
  .then((cats) => {
    console.log(cats);
    return CatModel.updateOne();
  })
  .then((notificaiton) => {})
  .catch((err) => {
    console.error(err);
  })
  .finally(() => mongoose.disconnect());

/**
 * Crear un nuevo documento en la colección de cats
 */

// const newCat = new CatModel({
//   name: 'Luis',
//   // age: 25,
//   address: {
//     street: 'Calle Falsa 123',
//     type: 'Bajo un puente',
//   },
//   array: ['lolo', 'mimo'],
//   key1: 'Algo',
//   key2: '2',
//   key3: 2,
//   key4: 86
// });

// newCat
//   .save()
//   .then((cat) => {
//     console.log('Gato creado');
//     console.log(cat);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

/**
 * Buscamos todos los documentos de la colección cats
 */

// CatModel.find({}, (err, cats) => { // NO SE HACE
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(cats);
//   }
// })

// CatModel.find() // PROMISE WITH THEN
//   .then((cats) => {
//     console.log(cats);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// async function getAllCats() { // ASYNC AWAIT
//   try {
//     const cats = await CatModel.find();
//     console.log(cats);
//   } catch (err) {
//     console.error(err);
//   }
// }

// getAllCats();

/**
 * Buscar todos los documentos de la colección cats que su nombre sea 'Bigotes'
 * NOTA: Find siempre devolvera un array.
 */

// CatModel.find({ name: 'Luis' })
//   .then((cats) => {
//     console.log(cats);
//   })
//   .catch((err) => console.error(err));

/**
 * Buscar un único documento en la colección cats.
 * NOTA: Si no encuentra un valor retornará null
 */

// CatModel.findOne({ key2: '6' })
//   .then((cat) => {
//     console.log(cat);
//   })
//   .catch((err) => console.error(err));

/**
 * Buscar un documento en la colección cats por su ID
 * NOTA: Si no encuentra el ID retornará null
 * NOTA2: Si le pasama un valor que no corresponda a un ID de mongo el metodo dara un error.
 */

// CatModel.findById('636b768ab486d8c0250d5443')
//   .then((cat) => {
//     console.log(cat);
//   })
//   .catch((err) => console.error(err));

/**
 * Buscar y actulizar un documento de la colección cats.
 * NOTA: Si queremos que nos devuelva el documento actualizado tendremos que pasarle el parámetro { new: true }
 */

// CatModel.findByIdAndUpdate('636b768ab486d8c0250d5443', {
//   key1: 'Version 2',
// }, { new: true})
//   .then((cat) => {
//     console.log(cat);
//   })
//   .catch((err) => console.error(err));

// CatModel.findOneAndUpdate({ key2: '6' }, { key1: 'Version 3'}, {new: true})
//   .then((cat) => {
//     console.log(cat);
//   })
//   .catch((err) => console.error(err));

/**
 * Actualizar un documento de la colección cats.
 */

// CatModel.updateOne({ _id: '636b768ab486d8c0250d5443' }, { key2: 'UpdateOne'})
//   .then((notification) => {
//     console.log(notification);
//   })
//   .catch((err) => console.error(err));

/**
 * Actualizar varios documentos de la colección cats.
 */

// CatModel.updateMany({ name: 'Bigotes' }, { 'address.type': 'Mi casa' })
//   .then((notification) => {
//     console.log(notification);
//   })
//   .catch((err) => console.error(err));

/**
 * Buscar y eliminar un documento de la colección cats.
 */

// CatModel.findByIdAndDelete('636b768ab486d8c0250d5443')
//   .then((cat) => {
//     console.log(cat);
//   })
//   .catch((err) => console.error(err));

/**
 * Eliminiar un documento de la colección cats.
 */

// CatModel.deleteOne({ key2: '7' })
//   .then((notification) => {
//     console.log(notification);
//   })
//   .catch((err) => console.error(err));

/**
 * Eliminar varios documentos de la colección cats.
 */

// CatModel.deleteMany({ name: 'Bigotes' })
//   .then((notification) => {
//     console.log(notification);
//   })
//   .catch((err) => console.error(err));

/**
 * Crear varios documentos en la colección cats.
 */

const cats = [
  {
    name: 'Luis',
    address: {
      street: 'Calle Falsa 123',
      type: 'Bajo un puente',
    },
    array: ['lolo', 'mimo'],
    key1: 'Algo',
    key2: '1',
    key3: 2,
    key4: 86,
  },
  {
    name: 'Luis',
    address: {
      street: 'Calle Falsa 123',
      type: 'Bajo un puente',
    },
    array: ['lolo', 'mimo'],
    key1: 'Algo',
    key2: '5',
    key3: 2,
    key4: 86,
  },
  {
    name: 'Luis',
    address: {
      street: 'Calle Falsa 123',
      type: 'Bajo un puente',
    },
    array: ['lolo', 'mimo'],
    key1: 'Algo',
    key2: '3',
    key3: 2,
    key4: 86,
  },
  {
    name: 'Luis',
    address: {
      street: 'Calle Falsa 123',
      type: 'Bajo un puente',
    },
    array: ['lolo', 'mimo'],
    key1: 'Algo',
    key2: '4',
    key3: 2,
    key4: 86,
  },
];

// CatModel.insertMany(cats)
//   .then((cats) => {
//     console.log(cats);
//   })
//   .catch((err) => console.error(err));

/**
 * Buscar todos los documentos de la colección cats y añadir las diferentes opciones.
 * select -> Le pasaremos un string con los campos que queremos mostrar. Si por lo contrario queremos quetarlos tendremos que añadir un '-' deltante de su propiedad.
 * sort -> Le pasaremos un objecto con key que será la propiedad con la cual queremos orderlos y el value será '1' ó '-1'.
 * skip -> Le pasaremos un number y saltará el número de documetos que le indiquemos.
 * limit -> Le pasaremos un numbe y solo nos devolverá el número de documentos indicado.
 */

CatModel.find()
  .select('name createdAt key2 -_id')
  .sort({ key2: 1 })
  .skip(1)
  .limit(1)
  .then((cats) => {
    console.log(cats);
  })
  .catch((err) => console.error(err));

/**
 * Desconectar la BD
 */

mongoose.disconnect();

app.get('/', (req, res) => {
  res.render('home');
})

app.all('*', (req, res) => {
  // res.render('page404');
  res.sendStatus(404);
})

app.listen(PORT, () => {
  console.log(`Listen in ${PORT}`);
});
