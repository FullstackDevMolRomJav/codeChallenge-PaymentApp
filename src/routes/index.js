const { Router } = require('express');
const router = Router();
const stripe = require('stripe')('sk_test_tz4ptW8ZltsQi1MH6tGaTHZX00YkVDDnz1');

router.get('/', (req, res) => {
    res.render('index')
});

router.post('/cashed', async (req, res) => {
    console.log(req.body);
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });

    const order = await stripe.charges.create({
        amount: '35000',
        currency: 'mxn',
        customer: customer.id,
        description: 'Herramientas del Software Educativo'
    });

    const orderId = order.id;
    res.render('download', {orderId: orderId});
});

module.exports = router;
