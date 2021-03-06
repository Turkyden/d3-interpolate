var tape = require("tape"),
    interpolate = require("../");

tape("interpolateDate(a, b) interpolates between two dates a and b", function(test) {
  var i = interpolate.interpolateDate(new Date(2000, 0, 1), new Date(2000, 0, 2));
  test.equal(i(0.0) instanceof Date, true);
  test.equal(i(0.5) instanceof Date, true);
  test.equal(i(1.0) instanceof Date, true);
  test.strictEqual(+i(0.2), +new Date(2000, 0, 1, 4, 48));
  test.strictEqual(+i(0.4), +new Date(2000, 0, 1, 9, 36));
  test.end();
});

tape("interpolateDate(a, b) reuses the output datea", function(test) {
  var i = interpolate.interpolateDate(new Date(2000, 0, 1), new Date(2000, 0, 2));
  test.strictEqual(i(0.2), i(0.4));
  test.end();
});

tape("interpolateDate(a, b) gives exact ends for t=0 and t=1", function(test) {
  var a = new Date(1e8 * 24 * 60 * 60 * 1000), b = new Date(-1e8 * 24 * 60 * 60 * 1000 +1);
  test.equal(+interpolate.interpolateDate(a, b)(1), +b);
  test.equal(+interpolate.interpolateDate(a, b)(0), +a);
  test.end();
});
