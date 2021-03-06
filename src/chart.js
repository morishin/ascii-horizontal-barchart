"use strict";

const bar = (value, maxValue, maxBarLength) => {
  const fractions = ['▏', '▎', '▍', '▋', '▊', '▉'];
  const barLength = value * maxBarLength / maxValue;
  const wholeNumberPart = Math.floor(barLength);
  const fractionalPart = barLength - wholeNumberPart;
  let bar = fractions[fractions.length - 1].repeat(wholeNumberPart);
  if (fractionalPart > 0)
    bar += fractions[Math.floor(fractionalPart * fractions.length)];
  return bar;
}

const chart = (data, showValue = false, maxBarLength = 100) => {
  const formatted = Object.keys(data).map(key => ({ key: key, value: data[key] }));
  const sorted = formatted.sort((a, b) => b.value - a.value);
  const maxValue = Math.max(...sorted.map(item => item.value));
  const maxKeyNameLength = Math.max(...sorted.map(item => item.key.length));
  return sorted.map(item => {
    const prefix = item.key + " ".repeat(maxKeyNameLength - item.key.length + 1);
    const barText = bar(item.value, maxValue, maxBarLength);
    const suffix = showValue ? ` ${item.value}` : "";
    return prefix + barText + suffix;
  }).join('\n');
}

module.exports = chart;
