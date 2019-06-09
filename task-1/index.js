function binarySearch(array, target, startPosition = 0 , endPosition = array.length-1) {
  // array исходный массив для поиска
  // target элемент, который надо найти
  // startPosition, endPosition позиции в массиве для текущей иттерации поиска
  console.log("----");
  console.log("target " + target);
  console.log("startPosition " + startPosition);
  console.log("endPosition " + endPosition);

  let middle = Math.floor(array.length/2);

  if (array[middle] == target) return middle; //целевое значение ровно посередине, возращаем позицию
  if (endPosition-1 === startPosition) {
    console.log("fin");
    //диапазон уменьшился до 2-х значений, поэтому проверяем оба
    array[startPosition]==target ? startPosition : endPosition;
  }
  if (target > array[middle]) {
    //целевое значение больше чем значение из середины, значит откидываем меньшую половину
    return binarySearch(array, target, middle, endPosition)
  } else {
    //целевое значение меньше чем значение из середины, значит откидываем большую половину
    return binarySearch(array, target, startPosition, middle)
  }
}

//добавляем CommonJS экспорт что бы вызывать тесты напрямую
module.exports = {
  binarySearch: binarySearch
};



