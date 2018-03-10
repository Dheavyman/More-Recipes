/**
 * Change the first letter of a text to uppercase
 *
 * @param {any} text = Text to format
 *
 * @returns {string} Formatted text
 */
const capitalizeFirstLetter = text => text
  .replace(/^./, text[0].toUpperCase());

export default capitalizeFirstLetter;
