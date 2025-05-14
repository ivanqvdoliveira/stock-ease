export const productSchema = {
  code: { required: true },
  brand: { required: true },
  type: { required: true },
  title: { required: true },
  models: {
    required: true,
    isArray: true,
    schema: {
      color: { required: true },
      size: { required: true },
      quantity: { required: true },
      salePrice: { required: true },
      buyPrice: { required: true },
    }
  }
}
