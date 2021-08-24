const express = require("express");
const List = require("./models/List"); // new
const router = express.Router();

router.get("/lists", async (req, res) => {
  const lists = await List.find();
  res.send(lists);
});

router.post("/lists", async (req, res) => {
  const list = new List({
    title: req.body.title,
    dateCreated: req.body.dateCreated,
    tasks: [],
  });
  await list.save();
  res.send(list);
});

router.get("/lists/:id", async (req, res) => {
  try {
    const list = await List.findOne({ _id: req.params.id });
    res.send(list);
  } catch {
    res.status(404);
    res.send({ error: "List doesn't exist!" });
  }
});

router.patch("/lists/:id", async (req, res) => {
  try {
    const list = await List.findOne({ _id: req.params.id });

    if (req.body.title) {
      list.title = req.body.title;
    }

    await list.save();
    res.send(list);
  } catch {
    res.status(404);
    res.send({ error: "List doesn't exist!" });
  }
});

module.exports = router;
