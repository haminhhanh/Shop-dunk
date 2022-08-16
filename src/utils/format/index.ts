export const formatPrice = (price: string) => {
  if (!price) {
    return '0';
  } else {
    const round = Math.round(parseFloat(price));
    return round.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};
