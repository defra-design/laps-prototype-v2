//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// router.get('/', (req, res) => {
//   console.log('home page');
// })

router.get('/', (req, res) => {
    req.session.data['user-type']=''
    res.render('index')
})

router.post('/', (req, res) => {
    res.redirect("/laps/home-page")
})