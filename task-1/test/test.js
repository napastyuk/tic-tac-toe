var index = require("../index");
var assert = require("chai").assert;

describe("binarySearch", function() {
  it("binarySearch", function() {
    assert.equal(index.binarySearch([0,1,2,3,4],1), 1);
  });

});