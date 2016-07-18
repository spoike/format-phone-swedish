var test = require('tape');
var m = require('../lib/index');

test('will add missing zero', function(t) {
  // browsers have a tendency to remove the first zero digit
  // which is not something you do in Sweden
  t.plan(1);

  t.equal(m.format("812345678"), "08 123 456 78", "Should add missing first 0 digit");
});

test('remove +46 number if present', function(t) {
  t.plan(2);

  t.equal(m.format("+46812345678"), "08 123 456 78", "Should remove +46 country code prefix");
  t.equal(m.format("+460812345678"), "08 123 456 78", "Should remove +46 country code prefix");
});

test('should ignore weird extension number format and other characters', function(t) {
  t.plan(1);

  t.equal(m.format("+46 (0) 8 - 12345678"), "08 123 456 78", "Should remove weird characters");
});

test('handle numbers without area code', function(t) {
  t.plan(6);

  t.equal(m.format("112"), "112", "Three digit number");     // Nödnummer vid fara för liv, egendom eller miljö
  t.equal(m.format("1177"), "1177", "Four digit number");    // Sjukvårdsrådgivning
  t.equal(m.format("11414"), "114 14", "Five digit number"); // Polisens nummer vid icke akuta händelser
  t.equal(m.format("123456"), "12 34 56", "Six digit number");
  t.equal(m.format("1234567"), "123 45 67", "Seven digit number");
  t.equal(m.format("12345678"), "123 456 78", "Eight digit number");
});

test('custom area code separator', function(t) {
  t.plan(3);

  t.equal(m.format("0812345678", "-"), "08-123 456 78");
  t.equal(m.format("0812345678", "<span>-</span>"), "08<span>-</span>123 456 78");
  t.equal(m.format("0812345678", "^_^"), "08^_^123 456 78");
});

test('08 number', function(t) {
	t.plan(4);

	t.equal(m.format("0812345678"), "08 123 456 78");
	t.equal(m.format("081234567"), "08 123 45 67");
	t.equal(m.format("08123456"), "08 12 34 56");
  // 08-numbers don't have 5 digit numbers but is tested here anyway
	t.equal(m.format("0812345"), "08 123 45");
});

test('0xx number', function(t) {
  t.plan(4);

  // 011 (Norrköping) is a valid 0xx area code
  t.equal(m.format("01112345678"), "011 123 456 78");
  t.equal(m.format("0111234567"), "011 123 45 67");
  t.equal(m.format("011123456"), "011 12 34 56");
  t.equal(m.format("01112345"), "011 123 45");
});

test('0xxx number', function(t) {
  t.plan(4);

  // 0120 (Åtvidaberg) is a valid 0xxx area code
  t.equal(m.format("012012345678"), "0120 123 456 78");
  t.equal(m.format("01201234567"), "0120 123 45 67");
  t.equal(m.format("0120123456"), "0120 12 34 56");
  t.equal(m.format("012012345"), "0120 123 45");
});

test('2 digit area code numbers', function(t) {
  t.plan(1);
  t.equal(m.getAreaCodeDigitCount("08"), 2, "08 is a two digit number");
});

test('geographical 3 digit area code numbers', function(t) {
  var areaCodes = [
    "011", // Norrköping
    "013", // Linköping
    "016", // Eskilstuna-Torshälla
    "018", // Uppsala
    "019", // Örebro-Kumla
    "021", // Västerås
    "023", // Falun
    "026", // Gävle-Sandviken
    "031", // Göteborg-Mölndal-Partille
    "033", // Borås
    "035", // Halmstad
    "036", // Jönköping-Huskvarna
    "040", // Malmö
    "042", // Helsingborg-Höganäs
    "044", // Kristianstad
    "046", // Lund
    "054", // Karlstad
    "060", // Sundsvall-Timrå
    "063", // Östersund
    "090" // Umeå
  ];
  t.plan(areaCodes.length);
  areaCodes.forEach(code => t.equal(m.getAreaCodeDigitCount(code), 3, `${code} is a three digit number`));
});

test('non geographical 3 digit area codes', function(t) {
  var areaCodes = [
    "010", // geographically independent area code
    "020", // "frisamtal"
    "070", "072", "073", "076", "079", // cell phones
    "075", // personal number services
    "077", // shared cost services
    "078", // operator services
    "099"  // telephone broadcast
  ];
  t.plan(areaCodes.length);
  areaCodes.forEach(code => t.equal(m.getAreaCodeDigitCount(code), 3, `${code} is a three digit number`));
});
