const Film = require('../models').Film;

module.exports = {
	index: (req, res) => {
        Film.findAll().then(films=>{
            res.render("film/index", {"films": films})
        });
	},

	createGet: (req, res) => {
        res.render("film/create");
	},

	createPost: (req, res) => {
        let body = req.body;

        Film.create(body).then(() => {
            res.redirect("/");
        }).catch(err => {
            console.log(err.message);
        })
	},

	editGet: (req, res) => {
        let id = req.params.id;

        Film.findById(id).then(film => {
            res.render("film/edit", film.dataValues);
        }).catch(err => {
            console.log(err.message);
        })
	},

	editPost: (req, res) => {
        let id = req.params.id;
        console.log(id);
        let body = req.body;
        console.log(body);

        Film.findById(id).then(film => {
            film.updateAttributes(body).then(() =>{
                res.redirect("/" );
            });
        })
	},

	deleteGet: (req, res) => {
        let id = req.params.id;

        Film.findById(id).then(film => {
            res.render("film/delete", film.dataValues);
        })
	},

	deletePost: (req, res) => {
        let id = req.params.id;

        Film.findById(id).then(film=>{
            film.destroy().then(()=>{
                res.redirect('/');
            })
        })
	}
};