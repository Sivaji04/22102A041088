
export const covariance = (X, Y) => {
    const n = X.length;
    const meanX = X.reduce((a, b) => a + b, 0) / n;
    const meanY = Y.reduce((a, b) => a + b, 0) / n;
    return X.reduce((sum, x, i) => sum + (x - meanX) * (Y[i] - meanY), 0) / (n - 1);
};

export const standardDeviation = (X) => {
    const mean = X.reduce((a, b) => a + b, 0) / X.length;
    return Math.sqrt(X.reduce((sum, x) => sum + (x - mean) ** 2, 0) / X.length);
};

export const pearsonCorrelation = (X, Y) => {
    return covariance(X, Y) / (standardDeviation(X) * standardDeviation(Y));
};
