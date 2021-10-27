const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll(
      { include: [{model: Product}] });
  
    if(allTags) {
      res.status(200).json(allTags);
    } else {
      res.status(400).json('No Data found');
    }
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id,
      { include: [{model: Product}] });
  
    if(singleTag) {
      res.status(200).json(singleTag);
    } else {
      res.status(400).json('No Data found');
    }
  } catch (err) {
      res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    //Check if tag already exists first
    const viewTags = await Tag.findAll();

    //convert promise to have just tag names all lowercase
    const tagNames = viewTags.map(e => e.tag_name.toLowerCase());

    const checkTag = req.body.tag_name.toLowerCase();

    if(tagNames.includes(checkTag)) {
      res.status(200).json('Tag already exists in database');
    } else {
      const newTag = await Tag.create({ tag_name: req.body.tag_name });
      res.status(200).json(newTag);
    }

  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const change = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });

    if(change[0] === 0) {
      res.status(400).json('Invalid PUT request');
    }

    res.status(200).json(change);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDel = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if(tagDel === 0) {
      res.status(400).json('Unable to delete record');
    }

    res.status(200).json('Tag deleted successfully');
    
  } catch (err) {
    res.status(500).json('Could not process request')
  }
});

module.exports = router;
