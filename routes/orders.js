const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const { verifyToken, getMyIp } = require("../helpers");

const Orders = require("../model/orders");

router.get("/all/", (req, res) => {
  const token =
    req.body.token || req.query.token || req.headers["access-token"];
  if (!token) {
    Orders.find(
      { ipAddress: getMyIp(req), status: "pending" },
      (err, result) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          res.status(200).send({ result });
        }
      }
    );
  } else {
    if (verifyToken(token)) {
      Orders.find(
        { managerId: verifyToken(token).user_id, status: "pending" },
        (err, result) => {
          if (err) {
            return res.status(400).send(err);
          } else {
            res.status(200).send({ result });
          }
        }
      );
    }
  }
});

router.post("/add/", auth, async (req, res) => {
  const { roomNumber, price, roomType, description, image } = req.body;
  try {
    const room = await Orders.find({
      managerId: req.user_id,
      roomNumber,
    });
    if (room.length > 0) {
      res.status(400).send({
        msg: "Room already exists.",
      });
    } else {
      const rm = await Orders.create({
        roomNumber,
        price,
        type: roomType,
        description,
        image,
        facilityId: "",
        managerId: req.user.user_id,
      });
      res.status(201).json({
        msg: "Room created successfull!",
        room: rm,
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/update/", auth, (req, res) => {
  const { price, description, id } = req.body;
  Orders.updateOne(
    { managerId: req.user.user_id, _id: id },
    { description, price },
    (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err.message });
      } else {
        res.status(200).send({ result });
      }
    }
  );
});

router.post("/delete/", auth, (req, res) => {
  const { id } = req.body;
  Orders.deleteOne({ managerId: req.user.user_id, _id: id }, (err, result) => {
    if (err) {
      return res.status(400).send({ msg: err.message });
    } else {
      res.status(200).send({ result });
    }
  });
});

module.exports = router;