//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// router.get('*', (req, res, next) => {
//     console.log('session: ', JSON.stringify(req.session.data));
//     next()
// })

router.get('/', (req, res) => {
    // Reset session data
    req.session.destroy(function(err) {
        res.render('index');
    });

})

router.post('/', (req, res) => {
    res.redirect("/laps/home-page");
})

router.get('/laps/confirm-bank-details', (req, res, next) => {

    // Store the referrer page to manage the page redirect
    const referrer = req.get('Referrer') || 'unknown';
    const parts = referrer.trim().split('/');
    req.session.data['confirm-bank-details-referrer'] = parts[parts.length - 1];
    
    // console.log('Referrer:', req.session.data['confirm-bank-details-referrer']);
  // Pass control to the next matching route
  next();
});

router.post('/laps/confirm-bank-details', (req, res) => {
    res.redirect("/laps/bank-details-confirmed");
})

router.post('/laps/bank-details-confirmed', (req, res) => {

    switch (req.session.data['confirm-bank-details-referrer']) {
        case 'home-page':
            res.redirect("/laps/home-page")
            break;
        case 'bank-details':
            res.redirect("/laps/bank-details")
            break;
        default:
            res.redirect("/laps/home-page")
    };
})

router.post('/idm-ttp/complete-your-registration', (req, res) => {
    res.redirect("/idm-ttp/enter-the-verification-code");
})


