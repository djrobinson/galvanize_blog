// app/routes.js

// load the blog model
var Blog = require('./models/blog');
var Vocab = require('./models/vocab');


// expose the routes to our app with module.exports
module.exports = function(app, passport) {

	// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos    


//Home page
	
	//Login form
	app.get('/login', function(req, res) {
		
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});
	
	
	//Signup form
	app.get('/signup', function(req, res) {
	
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});
	
	//Profile
	
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});
	
	//Logout
	
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
   	app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	//route middleware to check log in status
	
	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
			return next();
		
		res.redirect('/');
	
	}




    app.post('/api/vocab', function(req, res) {
        // create a todo, information comes from AJAX request from Angular
        Vocab.create({
        		word : req.body.title,
            definition : req.body.text
        }, function(err, vocab) {
            if (err)
                res.send(err);
				res.json(vocab);
        });

    });

   
    app.get('/api/blogs', function(req, res) {

        // use mongoose to get all blogs in the database
        Blog.find(function(err, blogs) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(blogs); // return all todos in JSON format
        });
    });

    // create todo and send back all blogs after creation
    app.post('/api/blogs', function(req, res) {
        // create a todo, information comes from AJAX request from Angular
        Blog.create({
        		title : req.body.title,
            text : req.body.text
        }, function(err, blogs) {
            if (err)
                res.send(err);

            // get and return all the blogs after you create another
            Blog.find(function(err, blogs) {
                if (err)
                    res.send(err)
                res.json(blogs);
            });
        });

    });

    // delete a todo
    app.delete('/api/blogs/:blog_id', function(req, res) {
        Blog.remove({
            _id : req.params.blog_id
        }, function(err, blog) {
            if (err)
                res.send(err);

            // get and return all the blogs after you create another
            Blog.find(function(err, blogs) {
                if (err)
                    res.send(err)
                res.json(blogs);
            });
        });
    });
    
    
	app.get('/api/vocab/:vocabTerm', function(req, res) {

			Vocab.find({word: req.params.vocabTerm},function(err, vocab) {
			if (err)
				res.send(err);
			res.send(vocab);
		});
	});
    


 	// application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    
};
    
