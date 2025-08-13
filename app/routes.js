//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const fs = require('fs');
const path = require('path');


router.use((req, res, next) => {
  const lang = req.query.lang || 'en'; // default to English
  const filePath = path.join(__dirname, 'data/locales', `${lang}.json`);
//   console.log(filePath);

  try {
    res.locals.translations = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    // console.log(res.locals.translations['local-authority'])
  } catch (err) {
    console.error('Translation file error:', err);
    res.locals.translations = {};
  }

  res.locals.currentLang = lang;
  next();
});


// Add your routes here

// router.get('*', (req, res, next) => {
//     console.log('session: ', JSON.stringify(req.session.data));
//     const showError = req.query;
//     console.log('urlquery: ', showError);
//     next()
// })


// router.get('/:page', (req, res) => {
//   const page = req.params.page;

//   // Optional: check if the template exists or handle errors
//   res.render(`${page}.njk`, { page });
// });


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

router.get('/index', (req, res, next) => {

    // Store the referrer page to manage the page redirect
    const referrer = req.get('Referrer') || 'unknown';
    const parts = referrer.trim().split('/');
    req.session.data['user-type'] = parts[parts.length - 1];
    
    // console.log('Referrer:', req.session.data['user-type']);
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

router.post('/idm-ttp/registration/confirm-your-email', (req, res) => {
    res.redirect("/idm-ttp/registration/enter-the-verification-code");
})

router.post('/idm-ttp/registration/enter-the-verification-code', (req, res) => {
    res.redirect("/idm-ttp/registration/choose-the-relevant-local-authority");
})

router.post('/idm-ttp/registration/choose-the-relevant-local-authority', (req, res) => {
    res.redirect("/idm-ttp/registration/your-defra-account-terms-and-conditions");
})

router.post('/idm-ttp/registration/your-defra-account-terms-and-conditions', (req, res) => {
    switch (req.session.data['user-type']) {
        case 'ceo':
            res.redirect("/idm-ttp/registration/confirm-details")
            break;
        default:
            res.redirect("/idm-ttp/registration/whats-your-name")
    };
    // res.redirect("/idm-ttp/registration/confirm-details");
})

router.post('/idm-ttp/registration/confirm-details', (req, res) => {
    res.redirect("/idm-ttp/registration/registration-confirmed");
})

router.post('/idm-ttp/account-management/add-team-member/choose-a-service', (req, res) => {
    res.redirect("/idm-ttp/account-management/add-team-member/what-we-need");
})

router.post('/idm-ttp/account-management/add-team-member/what-we-need', (req, res) => {
    res.redirect("/idm-ttp/account-management/add-team-member/whats-their-la-email");
})

router.post('/idm-ttp/account-management/add-team-member/whats-their-la-email', (req, res) => {
    res.redirect("/idm-ttp/account-management/add-team-member/service-role");
})

router.post('/idm-ttp/account-management/add-team-member/service-role', (req, res) => {
    res.redirect("/idm-ttp/account-management/add-team-member/admin");
})

router.post('/idm-ttp/account-management/add-team-member/admin', (req, res) => {
    res.redirect("/idm-ttp/account-management/add-team-member/check-answers");
})

router.post('/idm-ttp/account-management/add-team-member/check-answers', (req, res) => {
    res.redirect("/idm-ttp/account-management/add-team-member/team-member-added");
})

router.post('/idm-ttp/registration/whats-your-name', (req, res) => {
    res.redirect("/idm-ttp/registration/check-answers");
})

router.post('/idm-ttp/account-management/change-name/whats-your-name', (req, res) => {
    res.redirect("/idm-ttp/account-management/change-name/check-answers");
})

router.post('/idm-ttp/account-management/change-name/check-answers', (req, res) => {
    res.redirect("/idm-ttp/account-management/change-name/user-account-success");
})

router.post('/idm-ttp/account-management/change-account-role/admin', (req, res) => {
    res.redirect("/idm-ttp/account-management/change-account-role/check-answers");
})

router.post('/idm-ttp/account-management/change-account-role/check-answers', (req, res) => {
    res.redirect("/idm-ttp/account-management/change-account-role/manage-team-member-success");
})

router.post('/idm-ttp/account-management/change-service-role/service-role', (req, res) => {
    res.redirect("/idm-ttp/account-management/change-service-role/check-answers");
})

router.post('/idm-ttp/account-management/change-service-role/check-answers', (req, res) => {
    res.redirect("/idm-ttp/account-management/change-service-role/manage-team-member-success");
})

router.post('/idm-ttp/account-management/assign-service/manage-team-member', (req, res) => {
    res.redirect("/idm-ttp/account-management/assign-service/choose-a-service");
})

router.post('/idm-ttp/account-management/assign-service/choose-a-service', (req, res) => {
    res.redirect("/idm-ttp/account-management/assign-service/what-we-need");
})

router.post('/idm-ttp/account-management/assign-service/what-we-need', (req, res) => {
    res.redirect("/idm-ttp/account-management/assign-service/service-role");
})

router.post('/idm-ttp/account-management/assign-service/service-role', (req, res) => {
    res.redirect("/idm-ttp/account-management/assign-service/check-answers");
})

router.post('/idm-ttp/account-management/assign-service/check-answers', (req, res) => {
    res.redirect("/idm-ttp/account-management/assign-service/manage-team-member-success");
})



