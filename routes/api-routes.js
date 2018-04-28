
var db = require('../models')

module.exports = function (app) {

  app.get('/', function (req, res) {
    res.redirect('/burgers')
  })

  app.get("/burgers", function (req, res) {
    db.Burger.findAll({}).then(function (burgerData) {
      res.render("index", { burger_data: burgerData })
    })
  })

  // post route -> back to index
  app.post("/burgers/create", function (req, res) {
    db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: 0
    }).then(function () {
      res.redirect("/")
    })
  })

  // put route -> back to index
  app.put("/burgers/update/:id", function (req, res) {
    db.Burger.update(
      { devoured: true },
      {
        where: {
          id: req.params.burger_id
        }
      }).then(function () {
        res.redirect("/");
      })
  })

}
