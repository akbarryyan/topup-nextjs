"use client";

export default function ProductPrice({ product, showAllPrices = false }) {
  const formatCurrency = (amount) => {
    const numAmount = parseFloat(amount) || 0;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(numAmount);
  };

  const getDisplayPrice = () => {
    // Priority: special > premium > basic
    if (product.price_special && product.price_special > 0) {
      return {
        main: product.price_special,
        original: product.price_basic > product.price_special ? product.price_basic : null,
        label: "Special"
      };
    } else if (product.price_premium && product.price_premium > 0) {
      return {
        main: product.price_premium,
        original: product.price_basic > product.price_premium ? product.price_basic : null,
        label: "Premium"
      };
    } else {
      return {
        main: product.price_basic || 0,
        original: null,
        label: "Basic"
      };
    }
  };

  const priceInfo = getDisplayPrice();

  if (showAllPrices) {
    return (
      <div className="space-y-1">
        {product.price_basic > 0 && (
          <div className="text-xs text-gray-500">
            Basic: {formatCurrency(product.price_basic)}
          </div>
        )}
        {product.price_premium > 0 && (
          <div className="text-xs text-gray-500">
            Premium: {formatCurrency(product.price_premium)}
          </div>
        )}
        {product.price_special > 0 && (
          <div className="text-sm font-semibold text-green-600">
            Special: {formatCurrency(product.price_special)}
          </div>
        )}
        {!product.price_basic && !product.price_premium && !product.price_special && (
          <div className="text-sm text-gray-400">No price set</div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      <p className="font-semibold text-gray-900">
        {formatCurrency(priceInfo.main)}
      </p>
      {priceInfo.original && (
        <p className="text-xs text-gray-500 line-through">
          {formatCurrency(priceInfo.original)}
        </p>
      )}
      {priceInfo.label !== "Basic" && (
        <p className="text-xs text-blue-600 font-medium">
          {priceInfo.label}
        </p>
      )}
    </div>
  );
}
