import { clientViewFullList } from "../store/stores";

export const listClientProducts = (fullList) => {
  const list = fullList.flatMap((product) => {
    return product.models.map((model) => {
      delete product.models;

      return {
        ...model,
        ...product,
        categoy_product: product.category,
        status_product: product.status,
      };
    });
  });

  clientViewFullList.set(list);
}
