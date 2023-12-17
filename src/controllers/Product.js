const Product = require('../models/product');
const { createError } = require('../utils/createError');

exports.lowInventoryProducts = async (req, res, next) => {
  try {
    const LIProducts = await Product.find({
      quantity: { $lt: 10 },
    });
    const response = {
      message: 'Get low inventory products',
      lowInventoryProducts: LIProducts,
    };

    res.status(200).json(response);
  } catch (err) {
    next(createError(404, `${err.message}`));
  }
};

exports.totalInventoryValue = async (req, res, next) => {
  try {
    const result = await Product.aggregate([
      {
        $project: {
          _id: 0,
          totalValue: { $multiply: ['$price', '$quantity'] },
        },
      },
      {
        $group: {
          _id: null,
          totalValue: { $sum: '$totalValue' },
        },
      },
      {
        $project: {
          _id: 0,
          totalValue: 1,
        },
      },
    ]);

    res.status(200).json({
      message: 'Get total inventory value',
      totalValue: result.totalValue,
    });
  } catch (err) {
    next(createError(400, `${err.message}`));
  }
};
