"use strict";

const chart = (data, dataLabel = false, maxLength = 100) => {
  const formatted = Object.keys(data).map((key) => { return {key:key, value:data[key]} });
  const sorted = formatted.sort((a, b) => b.value - a.value);
  const maxValue = Math.max(...sorted.map((item) => item.value));
  const maxKeyLength = Math.max(...sorted.map((item) => item.key.length));
  return sorted.map((item) => {
    const barLength = Math.round(item.value * maxLength / maxValue);
    return item.key + " ".repeat(maxKeyLength - item.key.length + 1)
            + "█".repeat(barLength) + (dataLabel ? ` ${item.value}` : "");
  }).join('\n');
}

module.exports = chart;
