const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

 // find all tags and include associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll(req.params, {
      include: [{ model: Product, through: ProductTag, as: 'product_tag'}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // find a single tag by its `id` and include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'product_tag'}]
    });
    
    if(!tagData) {
      res.status(404).json({ message: 'No tag found with this id'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

 // update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res
    .status(200).json(tagData)
    .json({ category: categoryData, message: 'Tag successfully updated'});
  } catch (err) {
    res.status(500).json(err);
  }

});

  // delete a tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
