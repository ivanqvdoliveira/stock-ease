export const formatterNumberOnly = (value = '') => {
  const bool = Boolean(!value)
  if (bool) return ''

  return value.replace(/[^0-9]+/g, '')
}

export const formatterCEP = (value = '') => {
  const bool = Boolean(!value)
  if (bool) return ''

  return value.replace(/[^0-9]+/g, '').replace(/(\d{5})(\d{3})/g, '$1-$2').substr(0, 9)
}

export const formatterPhone = (value = '') => {
  if (!value) return ''
  const phone = formatterNumberOnly(value)

  if (phone.length <= 10) {
    return phone.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3')
  }

  return phone
    .substr(0, 11)
    .replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3')
}

export const formatterCPForCNPJ = (value = '') => {
  const addPrefix = (val, prefix) => {
    if (val) return `${prefix}${val}`
    return ''
  }

  const formatCPF = (_, group1, group2, group3, group4) => (
    `${group1 || ''}${addPrefix(group2, '.')}${addPrefix(group3, '.')}${addPrefix(group4, '-')}`
  )

  const formatCNPJ = (_, group1, group2, group3, group4, group5) => (
    `${group1 || ''}${addPrefix(group2, '.')}${addPrefix(group3, '.')}${addPrefix(group4, '/')}${addPrefix(group5, '-')}`
  )

  if (value.length <= 11) {
    return value.replace(/(\d{1,3})?(\d{1,3})?(\d{1,3})?(\d{1,2})?/, formatCPF)
  }

  return value.replace(/(\d{1,2})?(\d{1,3})?(\d{1,3})?(\d{1,4})?(\d{1,2})?/, formatCNPJ)
}

export const formatterCNPJ = (value = '') => {
  const bool = Boolean(!value)
  if (bool) return ''

  return value.replace(/[^0-9]+/g, '').replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5')
}

export const formatterCPF = (value = '') => {
  const bool = Boolean(!value)
  if (bool) return ''

  return value.replace(/[^0-9]+/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
}

export const formatterMoney = (value = '') => (
  new Intl.NumberFormat(
    'pt-BR', {
      style: 'currency',
      currency: 'BRL',
    },
  ).format(value)
)
