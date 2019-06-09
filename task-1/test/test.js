var index = require("../index");
var assert = require("chai").assert;

describe("binarySearch", function() {
  it("binarySearch", function() {
    assert.equal(index.binarySearch([1,2,3],2), 1);
  });

});