const router = require("express").Router();
const { getAll, getById, create } = require("./cars-model");
const { checkCarId,checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require("./cars-middleware");

router.get("/", (req, res, next) => {
  getAll()
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", checkCarId, async (req, res, next) => {
  try {
    const car = await getById(req.params.id);
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
});

router.post("/", checkCarPayload, checkVinNumberValid, checkVinNumberUnique,(req, res, next) => {
    create(req.body)
      .then((newCar) => {
        res.status(201).json(newCar);
      })
      .catch((err) => {
        next(err);
      });
  }
);

module.exports = router;