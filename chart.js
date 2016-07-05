"use strict";

const bar = (value, maxValue, maxBarLength) => {
  const fractions = ['', '▏', '▎', '▍', '▋', '▊', '▉']
  const barLength = value * maxBarLength / maxValue
  const wholeNumberPart = Math.floor(barLength)
  const fractionalPart = barLength - wholeNumberPart
  let bar = fractions[fractions.length - 1].repeat(barLength)
  bar += fractions[Math.floor(fractionalPart * fractions.length)]
  return bar
}

const chart = (data, dataLabel = false, maxBarLength = 100) => {
  const formatted = Object.keys(data).map((key) => { return {key:key, value:data[key]} });
  const sorted = formatted.sort((a, b) => b.value - a.value);
  const maxValue = Math.max(...sorted.map((item) => item.value));
  const maxKeyNameLength = Math.max(...sorted.map((item) => item.key.length));
  return sorted.map((item) => {
    const prefix = item.key + " ".repeat(maxKeyNameLength - item.key.length + 1);
    const barText = bar(item.value, maxValue, maxBarLength);
    const suffix = dataLabel ? ` ${item.value}` : ""
    return prefix + barText + suffix
  }).join('\n');
}

module.exports = chart;
