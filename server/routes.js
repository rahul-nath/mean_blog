var express = require('express'),
	path = require('path'),
	rootPath = path.normalize(__dirname + '/../'),
	apiRouter = express.Router(),
	router = express.Router();

module.exports = function(app){	



    // angularjs catch all route
    router.get('/*', function(req, res) {
	res.sendFile(rootPath + 'public/index.html', { user: req.user });
    });

    app.use('/api', apiRouter);	// haven't built any api yet
    app.use('/', router);

    router.get('/', function(req, res){
	res.render("index");
    });
    router.get('/admin/', function(req, res){
	res.render('admin/');
    });
    router.get('/admin/register', function(req, res){
	res.render("admin/register");
    });

    //******** added here
    router.get('/admin/dashboard', isAdmin, function(req, res){
	res.render('admin/dashboard', {user: req.user});
    });

    router.post('/register', function(req, res){

    	// this shit though?
	var User = require('./models/user')
	// passport-local-mongoose: Convenience method to register a new user instance with a given password. Checks if username is unique
	User.register(new User({
	    email: req.body.email
	}), req.body.password, function(err, user) {
	    if (err) {
		console.error(err);
		return;
	    }

	    // log the user in after it is created
	    passport.authenticate('local')(req, res, function(){
		console.log('authenticated by passport');
		res.redirect('/admin/dashboard');
	    });
	});
    });

    router.post('/login', passport.authenticate('local'), function(req, res){
	res.redirect('/admin/dashboard');
    });

    app.use(function(req, res, next){
	res.status(404);

	res.render('404');
	return;
    });
};

// where the fuck do I put this?
function isAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.email === 'connorleech@gmail.com'){
        console.log('cool you are an admin, carry on your way');
        next();
    } else {
        console.log('You are not an admin');
        res.redirect('/admin');
    }
}
