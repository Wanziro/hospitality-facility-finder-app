const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const RestaurantsMenus = require("../model/RestaurantsMenus");

router.get("/item/all/", auth, (req, res) => {
  RestaurantsMenus.find({ managerId: req.user.user_id }, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send({ result });
    }
  });
});

router.post("/item/add/", auth, async (req, res) => {
  const { name, quantity, price, description, category, image } = req.body;
  try {
    const room = await RestaurantsMenus.find({
      managerId: req.user_id,
      menuName: name,
      category,
    });
    if (room.length > 0) {
      res.status(400).send({
        msg: "Room already exists.",
      });
    } else {
      const rm = await RestaurantsMenus.create({
        menuName: name,
        quantity,
        price,
        description,
        category,
        image,
        managerId: req.user.user_id,
      });
      res.status(201).json({
        msg: "Menu created successfull!",
        menu: rm,
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/item/update/", auth, (req, res) => {
  const { name, quantity, price, description, category, id } = req.body;
  RestaurantsMenus.updateOne(
    { managerId: req.user.user_id, _id: id },
    { menuName: name, quantity, price, description, category },
    (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err.message });
      } else {
        res.status(200).send({ result });
      }
    }
  );
});

router.get("/menus/:managerId/:category", (req, res) => {
  const menuCategory = req.params["category"];
  const managerId = req.params["managerId"];
  const query =
    menuCategory == "all"
      ? { managerId }
      : { category: menuCategory, managerId };
  RestaurantsMenus.find(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send({ result });
    }
  });
});

router.post("/item/delete/", auth, (req, res) => {
  const { items } = req.body;
  RestaurantsMenus.deleteMany({ _id: { $in: items } }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      res.status(200).send({ result });
    }
  });
});

module.exports = router;