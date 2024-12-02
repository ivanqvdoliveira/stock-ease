export const splitMoney = (amount) => {
  if (!amount) {
    return {
      integer: '-',
      decimal: '--'
    }
  }

  const [integer, decimal] = amount.toString().split('.');

  return {
    integer,
    decimal
  }
}
