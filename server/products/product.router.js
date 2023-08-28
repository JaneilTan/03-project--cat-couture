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
      const limit = parseInt(req.query.limit || 10);
      const page = parseInt(req.query.page || 1);
      const allProducts = await productRepository.getTotalProducts();
      const products = await productRepository.getProducts(limit, page);

      const responseResults = {
        products,
        currentPage: page,
        totalPages: Math.ceil(allProducts.length / limit),
        itemsPerPage: limit,
        totalItems: allProducts.length, 
      };
      
      return res.json(responseResults);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
