const Expense = require('../models/expense.model');

module.exports = {
    save: function (req, res) {
        Expense.create(req.body)
            .then(expense => res.json(expense))
            .catch(err => res.status(422).json(err));

    },
    delete: function (req, res) {
        Expense.findByIdAndDelete({ _id: req.params.id })
            .then(res => res.json(res))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        Expense.findById(req.params.id)
            .then(expense => res.json(expense))
            .catch(err => res.status(422).json(err));
    },
    find: function (req, res) {
        Expense.find({ user: req.body.user }, (err, docs) => {
            if (err) { console.log('err', err) }
            console.log('docs', docs)
            console.log('id', req.body.user)
            res.send(docs)
        })
    }


}