var tape = require("tape"),
    interpolate = require("../");

tape("interpolateZoom(a, b) handles nearly-coincident points", function(test) {
  test.deepEqual(interpolate.interpolateZoom([324.68721096803614, 59.43501602433761, 1.8827137399562621], [324.6872108946794, 59.43501601062763, 7.399052110984391])(0.5), [324.68721093135775, 59.43501601748262, 3.7323313186268305]);
  test.end();
});

tape("interpolateZoom returns the expected duration", function(test) {
  test.inDelta(interpolate.interpolateZoom([0, 0, 1], [0, 0, 1.1]).duration, 67, 1);
  test.inDelta(interpolate.interpolateZoom([0, 0, 1], [0, 0, 2]).duration, 490, 1);
  test.inDelta(interpolate.interpolateZoom([0, 0, 1], [10, 0, 8]).duration, 2872.5, 1);
  test.end();
});

tape("interpolateZoom parameter rho() defaults to sqrt(2)", function(test) {
  test.inDelta(
    interpolate.interpolateZoom.rho(Math.sqrt(2))([0,0,1], [10, 10, 5])(0.5),
    interpolate.interpolateZoom([0,0,1], [10, 10, 5])(0.5)
  );
  test.inDelta(interpolate.interpolateZoom.rho(), Math.sqrt(2));
  test.end();
});

tape("interpolateZoom.rho(0) is (almost) linear", function(test) {
  const interp = interpolate.interpolateZoom.rho(0)([0, 0, 1], [10, 0, 8]);
  test.inDelta(interp(0.5), [1.111, 0, Math.sqrt(8)], 1e-3);
  test.equal(Math.round(interp.duration), 1470);
  test.end();
});

tape("interpolateZoom parameter rho(2) has a high curvature and takes more time", function(test) {
  const interp = interpolate.interpolateZoom.rho(2)([0, 0, 1], [10, 0, 8]);
  test.inDelta(interp(0.5), [1.111, 0, 12.885], 1e-3);
  test.equal(Math.round(interp.duration), 3775);
  test.end();
});
