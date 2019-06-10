var index = require("../index");
var assert = require("chai").assert;

function realNumbersArrayGenerator(n,isReal=true,maxRandNum=100) {
  //генерируем сортированный массив размером n 
  let testArray = [];
  for(i=1;i<=n;i++) {
    let randomNumber;
    isReal ? randomNumber = Math.random() : randomNumber = Math.floor(Math.random()*maxRandNum);
    testArray.push(randomNumber);
  };
  testArray.sort(
    function compareNumbers(a, b) {
      return a - b;
    }
  );
  return testArray;
}

describe("binarySearch", function() {
  it("пустой массив", function() {
    assert.equal(index.binarySearch([],1), -1);
  });
  it("массив из одного элемента присутвующий элемент", function() {
    assert.equal(index.binarySearch([2],2), 0);
  });
  it("массив из одного элемента отсутствующий элемент", function() {
    assert.equal(index.binarySearch([0],1), -1);
  });
  it("массив из двух элементов присутвующий элемент", function() {
    assert.equal(index.binarySearch([3,4],4), 1);
  });
  it("массив из двух элементов отсутствующий элемент", function() {
    assert.equal(index.binarySearch([3,4],5), -1);
  });
  it("массив из 3-х элементов присутвующий элемент", function() {
    assert.equal(index.binarySearch([0,1,2],1), 1);
  });
  it("массив из 3-х элементов отсутвующий элемент", function() {
    assert.equal(index.binarySearch([0,1,2],3), -1);
  });
  it("ищем отсутвующее слишком большое значение", function() {
    assert.equal(index.binarySearch([0,1,2,3,4,5,6,7,8,9],10), -1);
  });
  it("ищем отсутвующее слишком маленькое значение", function() {
    assert.equal(index.binarySearch([2,3,4,5,6],1), -1);
  });
  it("ищем отсутвующее значение co значениеми посередине существующих в массиве", function() {
    assert.equal(index.binarySearch([2,4,6,8,10],5), -1);
  });
  it("ищем первое значение в четном целочисленном массиве", function() {
    let testArray = realNumbersArrayGenerator(10,false);
    assert.equal(index.binarySearch(testArray,testArray[0]), 0);
  });
  it("ищем первое значение в нечетном целочисленном массиве", function() {
    let testArray = realNumbersArrayGenerator(11,false);
    assert.equal(index.binarySearch(testArray,testArray[0]), 0);
  });
  it("ищем последнее значение в четном целочисленном массиве", function() {
    let testArray = realNumbersArrayGenerator(10,false);
    assert.equal(index.binarySearch(testArray,testArray[9]), 9);
  });
  it("ищем последнее значение в нечетном целочисленном массиве", function() {
    let testArray = realNumbersArrayGenerator(11,false);
    assert.equal(index.binarySearch(testArray,testArray[10]), 10);
  });
  it("ищем первое значение в четном вещественном массиве", function() {
    let testArray = realNumbersArrayGenerator(10,true);
    assert.equal(index.binarySearch(testArray, testArray[0] ), 0);
  });
  it("ищем первое значение в нечетном вещественном массиве", function() {
    let testArray = realNumbersArrayGenerator(11,true);
    assert.equal(index.binarySearch(testArray, testArray[0] ), 0);
  });  
  it("ищем последнее значение в четном вещественном массиве", function() {
    let testArray = realNumbersArrayGenerator(10,true);
    assert.equal(index.binarySearch(testArray, testArray[9] ), 9);
  });
  it("ищем последнее значение в нечетном вещественном массиве", function() {
    let testArray = realNumbersArrayGenerator(11,true);
    assert.equal(index.binarySearch(testArray, testArray[10] ), 10);
  });
  //to do проверить на очень большом массиве
  //to do проверить на очень больших числах в массиве
});
