const express = require('express');
const ExpressError = require('../expressError');
const items = require('../fakeDB');

const router = new express.Router();

router.get("", function(req, res, next){
    try {
        return res.json({shoppingItems: items});
    } catch(err) {
        return next(err)
    }
});

router.post("", function(req, res, next){
    try {
        let name = req.body.name;
        let price = Number(req.body.price);

        if(!name || !req.body.price){
            throw new ExpressError("Invaid inputs.", 400)
        }

        if(isNaN(price)){
            throw new ExpressError("Price must be a number.", 400)
        }

        items.push({name, price});

        return res.json({shoppingItems: items});
    } catch(err) {
        return next(err)
    }
});

router.get("/:name", function(req, res, next){
    try {
        let name = req.params.name;
    
        let item = items.find(ele => ele.name === name);

        if(!item){
            throw new ExpressError("Cannot find item.", 404)
        }
    
        return res.json({item});
    } catch(err) {
        return next(err)
    }

});

router.patch("/:name", function(req, res, next){
    try {
        let name = req.params.name;
        let newName = req.body.name;
        let newPrice = Number(req.body.price);

        console.log(newPrice)
    
        let item = items.find(ele => ele.name === name);

        if(!item){
            throw new ExpressError("Cannot find item.", 404)
        }

        if(req.body.price && isNaN(newPrice)){
            throw new ExpressError("Price must be a number.", 400)
        }
    
        item.name = newName || item.name;
        item.price = newPrice || item.price;
    
        return res.json({item});
    } catch(err) {
        return next(err)
    }
})

router.delete("/:name", function(req, res, next){
    try {
        let name = req.params.name;
    
        let itemIndex = items.findIndex(ele => ele.name === name);

        if(itemIndex === -1){
            throw new ExpressError("Cannot find item.", 404)
        }
    
        items.splice(itemIndex);
    
        return res.json({shoppingItems: items});
    } catch(err) {
        return next(err)
    }
})


module.exports = router;



