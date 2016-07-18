exports.getAreaCodeDigitCount = function getAreaCodeDigitCount(number) {
  if(/^08/.test(number)) {
    return 2;
  } else if(/^0(1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|7[0235-9]|9[09])/.test(number)) {
    return 3;
  }
  return 4;
}

function onlyDigits(number) {
  return number.replace(/[^0-9]/g, "");
}

function removeExtension(number) {
  return number.replace(/\(.*\)/gi, "");
}

function ensurePrefixes(number) {
  number = /^\+46/.test(number) ? number.substring(3) : number;
  return /^0/.test(number) ? number : "0" + number;
}

function formatRest(rest) {
  switch (rest.length) {
    case 5:
      return [rest.substring(0, 3), rest.substring(3)].join(" ")
    case 6:
      return [rest.substring(0, 2), rest.substring(2, 4), rest.substring(4)].join(" ")
    case 7:
      return [rest.substring(0, 3), rest.substring(3, 5), rest.substring(5)].join(" ")
    case 8:
      return [rest.substring(0, 3), rest.substring(3, 6), rest.substring(6)].join(" ")
    default:
      return rest
  }
}

function splitNumber(number) {
  var areaCodeSeparatorIndex = exports.getAreaCodeDigitCount(number);
  var areaCode = number.substring(0, areaCodeSeparatorIndex);
  var rest = number.substring(areaCodeSeparatorIndex);
  return {
    areaCode: areaCode,
    rest: formatRest(rest)
  }
}

function hasAreaCode(number) {
  return /^[\+0]/.test(number);
}

exports.format = function formatPhoneNumber(number, separator) {
  separator = separator || " ";
  if (!hasAreaCode(number)) {
    var cleanedUpNumber = onlyDigits(removeExtension(number));
    if (cleanedUpNumber.length <= 8) {
      return formatRest(cleanedUpNumber);
    }
  }
  var split = splitNumber(onlyDigits(ensurePrefixes(removeExtension(number))));
  return split.areaCode + separator + split.rest;
};
