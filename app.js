const scrollableDiv = document.getElementById('scrollableDiv');

// Define the colors you want to use
const colors = ['#01c1b4', '#ff608c', '#ffffff', '#ff33a1', '#f6e0a4'];

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY; // How much user has scrolled
  const windowHeight = window.innerHeight; // Height of the viewport
  const scrollHeight = document.documentElement.scrollHeight; // Total scrollable height

  // Calculate scroll percentage
  const scrollPercentage = scrollY / (scrollHeight - windowHeight);

  // Calculate the index of the current color
  const colorIndex = Math.floor(scrollPercentage * (colors.length - 1));
  const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);

  // Calculate blend percentage between the two colors
  const blendPercentage = (scrollPercentage * (colors.length - 1)) % 1;

  // Blend two colors
  const currentColor = hexToRgb(colors[colorIndex]);
  const nextColor = hexToRgb(colors[nextColorIndex]);
  const blendedColor = blendColors(currentColor, nextColor, blendPercentage);

  // Apply the blended color
  scrollableDiv.style.backgroundColor = `rgb(${blendedColor.r}, ${blendedColor.g}, ${blendedColor.b})`;
});

// Function to convert HEX color to RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

// Function to blend two RGB colors
function blendColors(color1, color2, percentage) {
  return {
    r: Math.round(color1.r + (color2.r - color1.r) * percentage),
    g: Math.round(color1.g + (color2.g - color1.g) * percentage),
    b: Math.round(color1.b + (color2.b - color1.b) * percentage)
  };
}
