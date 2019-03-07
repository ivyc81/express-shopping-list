const express = require('express');
const ExpressError = require('../expressError');
const items = require('../fakeDB');

const router = new express.Router();

router.get("", function(req, res, next){
    return res.json({shoppingItems: items});
});

router.post("", function(req, res, next){
    let name = req.body.name;
    let price = req.body.price;

    items.push({name, price});

    return res.json({shoppingItems: items});
});

router.get("/:name", function(req, res, next){
    let name = req.params.name;

    let item = items.find(ele => ele.name === name);

    return res.json({item});

});

router.patch("/:name", function(req, res, next){
    let name = req.params.name;
    let newName = req.query.name;
    let newPrice = req.query.price;

    let item = items.find(ele => ele.name === name);

    item.name = newName || item.name;
    item.price = newPrice || item.price;

    return res.json({item});
})

router.delete("/:name", function(req, res, next){
    let name = req.params.name;

    let itemIndex = items.findIndex(ele => ele.name === name);

    items.splice(itemIndex);

    return res.json({shoppingItems: items});
})








module.exports = router;



