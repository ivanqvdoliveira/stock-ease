export const modelSchema = {
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
