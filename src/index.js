const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth.js');
const adminProductsRouter = require('./routes/admin/product.js');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cookieSession({
        keys: ['lkasldkfjp3jp2ij5p2i35j'],
    })
);
app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);

app.listen(3000, () => {
    console.log('Listening...');
});

// How to use a middleware like bodyParser in app.post

// app.post('/', bodyParser.urlencoded({ extended: true }), (req, res) => {
//     console.log(req.body);
//     res.send('Account created!!!');
// });

// How to create a middleware like bodyParser;

// const bodyParser = (req, res, next) => {
//     if (req.method === 'POST') {
//         req.on('data', (data) => {
//             const parsed = data.toString('utf8').split('&');
//             const formData = {};
//             for (const pair of parsed) {
//                 const [key, value] = pair.split('=');
//                 formData[key] = value;
//             }
//             req.body = formData;
//             next();
//         });
//     } else {
//         next();
//     }
// };
