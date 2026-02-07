const express = require("express");
const Review = require("../models/Review");
const router = express.Router();

router.get("/", async (req, res) => {
  const reviews = await Review.find({ approved: true });

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

  res.render("index", { reviews, avgRating: avgRating.toFixed(1) });
});

router.get("/submit", (req, res) => {
  res.render("submit");
});

router.post("/submit", async (req, res) => {
  await Review.create(req.body);
  res.redirect("/");
});

module.exports = router;