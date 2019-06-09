var index = require("../index");
var assert = require("chai").assert;

describe("sum", function() {
  it("складывает", function() {
    assert.equal(index.addTwoNumbers(2,2), 4);
  });

});