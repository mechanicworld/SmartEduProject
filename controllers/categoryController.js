const Category = require('../models/Category')




exports.createCategory = async (req, res) => {

  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      status: "success",
      category,
    })
  } catch (error) {

    res.status(400).json({
      status: "creating failed",
      error,
    })
  }
}

exports.getAllCategories = async (req, res) => {

  try {
    const categories = await Category.find();
    res.status(200).json( {
      categories,
      page_name: 'categories'
    })
  } catch (error) {

    res.status(400).json({
      status: "creating failed",
      error,
    })
  }
}

