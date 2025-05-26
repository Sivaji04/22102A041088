function updateWindow(currentWindow, newNumbers, maxSize) {
    const uniqueNew = newNumbers.filter(num => !currentWindow.includes(num));
    const combined = [...currentWindow, ...uniqueNew];
  
    if (combined.length <= maxSize) {
      return combined;
    }
  
    return combined.slice(combined.length - maxSize);
  }
  
  module.exports = { updateWindow };
  