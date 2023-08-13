export function numberSeparator(value: number) {
  try {
    const formattedNumber = value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    return formattedNumber.replace(/,/g, ".");
  } catch (error) {
    return;
  }
}
