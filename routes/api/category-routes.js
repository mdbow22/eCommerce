const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll(
      { include: [{model: Product}] });
  
    if(allCategories) {
      res.status(200).json(allCategories);
    } else {
      res.status(400).json('No Data found');
    }
  } catch (err) {
      res.status(500).json(err);
  }
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const thisCategory = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });

    if(thisCategory) {
      res.status(200).json(thisCategory);
    } else {
      res.status(400).json('Category does not exist');
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    if(req.body.category_name) {
      const newCategory = await Category.create({ category_name: req.body.category_name });
      res.status(200).json(newCategory);
    } else {
      res.status(400).json('Invalid Request');
    }
  } catch (err) {
    res.status(500).json('Unable to create record');
  }
  
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const change = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });

    if(change[0] === 0) {
      res.status(400).json('Invalid PUT request');
    }

    res.status(200).json(change);

    }
  catch (err) {
    res.status(500).json('Unable to update record');
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDel = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if(categoryDel === 0) {
      res.status(400).json('Unable to delete record');
    }

    res.status(200).json('Category deleted successfully');
    
  } catch (err) {
    res.status(500).json('Could not process request')
  }
  
});

module.exports = router;
