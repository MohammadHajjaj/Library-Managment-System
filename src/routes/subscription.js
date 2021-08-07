const express = require("express")

const router = express.Router()
const Book = require('../models/books');
const User = require('../models/users');
const Stripe = require('stripe')
const stripe = Stripe(process.env.stripeApi);
router.get('/subscribe', (req, res) => {
	res.render('subscription/subscribe');
})


router.post('/create-checkout-session', async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [
			{
				price_data: {
					currency: 'usd',
					product_data: {
						name: 'Student',
					},
					unit_amount: 700, // 700 = 7usd
				},
				quantity: 1,
			},
		],
		mode: 'payment',
		success_url: 'http://localhost:3000/subscribe/success',
		cancel_url: 'http://localhost:3000/subscribe',
	});

	res.json({ id: session.id });
});

router.post('/create-checkout-session2', async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [
			{
				price_data: {
					currency: 'usd',
					product_data: {
						name: 'Student',
					},
					unit_amount: 1400, // 700 = 7usd
				},
				quantity: 1,
			},
		],
		mode: 'payment',
		success_url: 'http://localhost:3000/subscribe/success',
		cancel_url: 'http://localhost:3000/subscribe',
	});

	res.json({ id: session.id });
});


router.get('/subscribe/success', (req, res) => {
	res.render('subscribe');
})

router.get('/confirm-standard', (req, res) => {
	res.render('subscription/confirm-standard');
})

router.get('/confirm-student', (req, res) => {
	res.render('subscription/confirm-student');
})

router.post('/confirm-student', async (req, res) => {
	try {
		await User.findByIdAndUpdate(req.user._id, { isSubscribed: 'pending' });
		req.flash('success', 'Your subscription is now pending payment');
		res.redirect('/');
	} catch (e) {
		req.flash('error', 'Please login in to Subscribe');
		res.redirect('/subscribe');
	}
})

router.post('/confirm-standard', async (req, res) => {
	try {
		await User.findByIdAndUpdate(req.user._id, { isSubscribed: 'pending' });
		req.flash('success', 'Your subscription is now pending payment');
		res.redirect('/');
	} catch (e) {
		req.flash('error', 'Please login in to Subscribe');
		res.redirect('/subscribe');
	}
})

module.exports = router;


module.exports = router;