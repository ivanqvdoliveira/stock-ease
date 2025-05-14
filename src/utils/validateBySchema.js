export function validateBySchema(obj, schema) {
  let invalid = {}
  let hasError = false

  for (const key in schema) {
    const rules = schema[key]
    if (rules.required && !obj[key]) {
      invalid[key] = true
      hasError = true
    } else if (rules.isArray && Array.isArray(obj[key])) {
      invalid[key] = []
      obj[key].forEach((item, idx) => {
        const result = validateBySchema(item, rules.schema)
        invalid[key][idx] = result.invalid
        if (result.hasError) hasError = true
      })
    }
  }

  return { invalid, hasError }
}
