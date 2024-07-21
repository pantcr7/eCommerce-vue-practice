export const formatCurrency = (amount, currency) => {
    if (!currency) {
        throw new Error('Currency code is required with currency style.');
        // Or default to a specific currency if that's preferred
        // currency = 'USD'; // Default to USD if no currency code is provided
    }
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency }).format(amount);
}