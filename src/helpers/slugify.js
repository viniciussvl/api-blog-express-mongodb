/**
 * Converts a given string to a slug, making it lower case, clearing whitespace from both sides of the string, 
 * normalizing to NFKD (unicode normalization form), 
 * replacing spaces with - and removing non-word characters.
 * 
 * @param {String} string 
 * @returns A string in slug format
 */
const slugify = function(string) {
    return string
    .toString()                          
    .normalize('NFKD')           
    .toLowerCase()                  
    .trim()                                 
    .replace(/\s+/g, '-')            
    .replace(/[^\w\-]+/g, '')     
    .replace(/\-\-+/g, '-'); 
} 

module.exports = slugify;
