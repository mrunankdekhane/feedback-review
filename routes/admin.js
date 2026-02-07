const express = require("express");
const Review = require("../models/Review");
const router = express.Router();

// Simple admin auth
router.get("/login", (req, res) => res.render("admin/login"));

router.post("/login", (req, res) => {
  if (req.body.password === "admin123") {
    req.session.admin = true;
    res.redirect("/admin/dashboard");
  } else {
    res.redirect("/admin/login");
  }
});

router.get("/dashboard", async (req, res) => {
  if (!req.session.admin) return res.redirect("/admin/login");

  const reviews = await Review.find();
  res.render("admin/dashboard", { reviews });
});

router.post("/approve/:id", async (req, res) => {
  await Review.findByIdAndUpdate(req.params.id, { approved: true });
  res.redirect("/admin/dashboard");
});

router.post("/delete/:id", async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.redirect("/admin/dashboard");
});

module.exports = router;