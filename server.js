const next = require('next')
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser')
const path = require('path')
const { parse } = require('url')
var url = require('url')
const compression = require('compression')
const nextI18NextMiddleware = require('next-i18next/middleware').default
const nextI18next = require('./i18n')

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();
var omise = require('omise')({
    'publicKey': 'pkey_5hbuk23zpu5e8dbc7m9',
    'secretKey': 'skey_5qiuc43w25x4ykzenlc',
    'omiseVersion': '2019-05-29'
});
var username = 'web-master';
var password = 'kmkm1971website';
var basicAuth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');


// var omise = require('omise')({
//     'publicKey': 'pkey_5hbuk23zpu5e8dbc7m9',
//     'secretKey': 'skey_5qiuc43w25x4ykzenlc',
//     'omiseVersion': '2019-05-29'
// });

(async () => {
    await app.prepare()
    const server = express()
    if (process.env.NODE_ENV === "production") {
        server.get(
            /^\/_next\/static\/(images|fonts)\//,
            (_, res, nextHandler) => {
                res.setHeader(
                    "Cache-Control",
                    "public, max-age=2628000, immutable",
                );
                nextHandler();
            },
        );
    }
    server.use(compression())
    server.use(bodyParser.json())
    server.use(cors())
    await nextI18next.initPromise
    server.use(nextI18NextMiddleware(nextI18next))
    server.post('/checkout', (req, res) => {
        const fullURL = url.format({
            protocol: req.protocol,
            host: req.get('host')
        })
    })
    server.post('/system/omise/checkout-credit-card', async ( req, res, next) => {
        res.append("Access-Control-Allow-Origin", ["*"]);
        res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.append("Access-Control-Allow-Headers", "Content-Type");
        const {email, name, amount, token, type, phoneNumber,cartThx} = req.body
        var endpoint = "https://karmakametstudio.com/"
        const response = await axios.get(endpoint + "wp-json/wc/v3/"+ 'orders', {
            headers: {
            'Authorization': basicAuth
            }
        })
        try{
            const fullURL = url.format({
                protocol: req.protocol,
                host: req.get('host')
            })
            const customer = await omise.customers.create({
                email,
                'description': name + " - Phone Number : "+ phoneNumber,
                'card':        token,
              });
              const charge = await omise.charges.create({
                amount,
                'currency': 'thb',
                'return_uri' : fullURL+'/order/'+token.split("_")[2]+'/successful',
                'customer': customer.id,
                // 'metadata' : {
                //     'order_id' : cartThx.orderNumber
                // }
              });
                res.send({
                    amount: charge.amount,
                    status: charge.status,
                    return_uri : charge.authorize_uri,
                    charge: charge,
                })
        } catch (error) {
          console.log(error)
        }
      
        next()
    })
    server.get('/product-category/:slug', (req, res) => {
        const { pathname, query } = parse(req.url, true)
        return handle(req, res, '/product-category/:slug', { slug: req.params.slug });
    })
    server.get('/search/:slug', (req, res) => {
        const { pathname, query } = parse(req.url, true)
        return handle(req, res, '/search/:slug', { slug: req.params.slug, name: query.name });
    })

    server.get('/store/:slug', (req, res) => {
        const { pathname, query } = parse(req.url, true)
        return handle(req, res, '/store/:slug', { slug: req.params.slug, });
    })
    server.get('/category/:slug', (req, res) => {
        const { pathname, query } = parse(req.url, true)
        return handle(req, res, '/category/:slug', { slug: req.params.slug, });
    })
    server.get('/contactus/:slug', (req, res) => {
        const { pathname, query } = parse(req.url, true)
        return handle(req, res, '/contactus/:slug', { slug: req.params.slug, });
    })
    server.get('/faqs/:slug', (req, res) => {
        const { pathname, query } = parse(req.url, true)
        return handle(req, res, '/faqs/:slug', { slug: req.params.slug, });
    })
    server.get('/hashtag/:slug', (req, res) => {
        const { pathname, query } = parse(req.url, true)
        return handle(req, res, '/hashtag/:slug', { slug: req.params.slug, });
    })
    server.get('/:category/:slug', (req, res) => {
        const { pathname, query } = parse(req.url, true)
        return handle(req, res, '/:category/:slug', { slug: req.params.slug, });
    })
    server.get('*', (req, res) => handle(req, res))

    await server.listen(port)
    console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
})()