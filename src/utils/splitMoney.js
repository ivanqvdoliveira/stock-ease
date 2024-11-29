export const splitMoney = (amount) => {
  if (!amount) {
    return {
      integer: '-',
      decimal: '--'
    }
  } 
  const [integer, decimal] = amount.split(',');

  return {
    integer,
    decimal
  }
}
