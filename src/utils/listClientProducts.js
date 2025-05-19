import { clientViewFullList } from "../store/stores";

export const listClientProducts = (fullList) => {
  const list = fullList.flatMap((product) => {
    const { models, ...productWithoutModels } = product;

    return models.map((model) => ({
      ...model,
      ...productWithoutModels,
      categoy_product: product.category,
      status_product: product.status,
    }));
  });

  clientViewFullList.set(list);
}
