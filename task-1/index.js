function binarySearch(array, target, startPosition = 0, endPosition = array.length - 1) {
  // array исходный упорядочённый массив для поиска
  // target элемент, который надо найти
  // startPosition, endPosition позиции в массиве для текущей иттерации поиска
  // результат функции: позиция элемента в массиве начиная с нуля или -1 если элемент не найден 
  //
  // допущения и крайние случаи которые не обрабатываются в данном коде
  //- размер массива/array такой что startPosition + endPosition < Number.MAX_SAFE_INTEGER 
  // - весь исходный массив/array упорядочен по возрастанию
  // - исходный элемент/target есть в массиве только в одном экземпляре. Если исходить из того, 
  //   что массив отсортирован, но в нём есть повторяющиеся числа, то возможны непрерывные 
  //   последовательности одинаковых чисел типа 0,1,1,1,1,2. 
  //   В случае если мы ищем число 1 алгоритм тогда найдет не первое вхождение числа.  
  // 

  // console.log("----");
  // console.log("array " + array);
  // console.log("target " + target);
  // console.log("startPosition " + startPosition);
  // console.log("endPosition " + endPosition);

  if(startPosition < 0 || endPosition < 0) {
    // console.log('startPosition и endPosition должны быть положительными числами')
    return -1
  }

  let middlePosition = Math.floor((startPosition + endPosition)/2);
  // console.log("middlePosition " + middlePosition)
  // console.log("----");

  if (endPosition === startPosition) {
    // console.log("массив длиной в один элемент");
    //целевой  массив длиной всего один элемент, проверяем его
    return array[startPosition] === target ? startPosition : -1;
  }

  if (array[middlePosition] === target) {
    // console.log("осталось 1 значение");
    //целевое значение ровно посередине, возращаем позицию
    return middlePosition; 
  }

  if (endPosition - 1 === startPosition) {
    // console.log("осталось 2 значения");
    //диапазон уменьшился до 2-х значений, поэтому проверяем оба
    switch(target) {
      case array[startPosition]: return startPosition
      case array[endPosition]: return endPosition
      default: return -1
    }
  }

  if (target > array[middlePosition]) {
    // console.log("откидываем меньшую половину");
    //целевое значение больше чем значение из середины, значит откидываем меньшую половину
    return binarySearch(array, target, middlePosition, endPosition)
  } else {
    // console.log("откидываем большую половину");
    //целевое значение меньше чем значение из середины, значит откидываем большую половину
    return binarySearch(array, target, startPosition, middlePosition)
  }

}

//добавляем CommonJS экспорт что бы вызывать тесты напрямую
module.exports = {
  binarySearch: binarySearch
};



