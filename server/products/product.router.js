const express = require("express");
const Joi = require("joi");
const router = express.Router();
const queryParamValidationMiddleware = require("../middleware/queryParamValidationMiddleware");
const productRepository = require("./product.repository");

const queryParamsSchema = Joi.object().keys({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1),
});

router.get(
  "/",
  queryParamValidationMiddleware(queryParamsSchema),
  async (req, res, next) => {
    try {
      const { limit, page } = req.query;
      const products = await productRepository.getProducts(limit, page);

      const responseResults = {
        products,
        currentPage: page || 1,
        totalPages: Math.ceil(products.length / limit),
        itemsPerPage: limit,
        totalItems: products.length, 
      };

      return res.json(responseResults);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
