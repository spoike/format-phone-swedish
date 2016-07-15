exports.getAreaCodeDigitCount = function getAreaCodeDigitCount(number) {
  if(/^08/.test(number)) {
    return 2;
  } else if(/^0(1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|7[235-9]|9[09])/.test(number)) {
    return 3;
  }
  return 4;
}

exports.format = function formatPhoneNumber(number) {
  var areaCodeSeparatorIndex = exports.getAreaCodeDigitCount(number);
  var output = number.substring(0, areaCodeSeparatorIndex) + " ";
  var rest = number.substring(areaCodeSeparatorIndex);

  switch (rest.length) {
    case 5:
      output += [rest.substring(0, 3), rest.substring(3)].join(" ")
      break;
    case 6:
      output += [rest.substring(0, 2), rest.substring(2, 4), rest.substring(4)].join(" ")
      break;
    case 7:
      output += [rest.substring(0, 3), rest.substring(3, 5), rest.substring(5)].join(" ")
      break;
    case 8:
      output += [rest.substring(0, 3), rest.substring(3, 6), rest.substring(6)].join(" ")
      break;
    default:
      return number
  }
  return output;
};
