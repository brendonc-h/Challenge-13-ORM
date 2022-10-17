const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint for thunderclient

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [Product],
  })
  // be sure to include its associated Products
  .then((categories) => res.json(categories))
  .catch((err) => res.status(5000).json(err));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
  // be sure to include its associated Products
  .then((category) => res.json(category))
  .catch((err) => res.status(400).json(err));
});

router.post('/', async (req, res) => {
  // creating new category
  try {
    const categoryNew = await Category.create(req.body); 
    res.status(200).json(categoryNew);
  } catch (err) {
    res.status(400).json(err);
  }
  });
 

router.put('/:id', (req, res) => {
  Category.update(
  {
    id:req.body,
    category_name: req.body.category_name, 
  },
  {
    where: {
      id: req.params.id,
    },
  })
  .then((category) => res.status(200).json(category))
  .catch((err) => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((category) => res.status(200).json(category))
  .catch((err) => res.status(400).json(err));
});

module.exports = router;
