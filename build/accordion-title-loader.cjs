// react-sanfona 0.2.1 renders panel IDs with the prefix "react-safona".
// Keep those DOM IDs and correct the reference for both kinds of title.
module.exports = function accordionTitleLoader(source) {
  return source.replaceAll("'react-sanfona-item-body-'", "'react-safona-item-body-'");
};
