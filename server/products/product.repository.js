const db = require("../db");

module.exports = {
  getProducts: async (limit, page) => {
    try {
      const offset = limit * (page - 1);
      const result = await db.query(
        `SELECT
              p.id,
              p.name,
              p.description,
              p.price,
              pc.name AS "categoryName",
              pi.name AS "imageName",
              pi.description AS "imageDescription"
            FROM product p
            LEFT JOIN product_category pc ON p.product_category_id = pc.id
            LEFT JOIN product_image pi ON p.product_image_id = pi.id
            ORDER BY
              p.id
            LIMIT $1 OFFSET $2
            `,
            [limit, offset]
      );
      return result.rows;
    } catch (error) {
      throw Error(error);
    }
  },
  getTotalProducts: async () => {
    try {
      const result = await db.query(
        `WITH ProductCTE AS (
                    SELECT
                        p.id,
                        p.name,
                        p.description,
                        p.price,
                        pc.name AS "categoryName",
                        pi.name AS "imageName",
                        pi.description AS "imageDescription"
                    FROM product p
                    LEFT JOIN product_category pc ON p.product_category_id = pc.id
                    LEFT JOIN product_image pi ON p.product_image_id = pi.id
                )
                SELECT
                    *,
                    (SELECT COUNT(*) FROM ProductCTE) AS totalProducts
                FROM ProductCTE
                ORDER BY ProductCTE.id;`
      );
      return result.rows;
    } catch (error) {
      throw Error(error);
    }
  },
};
