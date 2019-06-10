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
  //   последовательности одинаковых чисел типа [0,1,1,1,1,2]. 
  //   В случае, если мы ищем число "1" алгоритм найдет не первое вхождение числа.
  // 

  if (startPosition < 0 || endPosition < 0) {
    return -1
  }

  let middlePosition = Math.floor((startPosition + endPosition) / 2);

  if (endPosition === startPosition) {
    //целевой  массив длиной всего один элемент, проверяем его
    return array[startPosition] === target ? startPosition : -1;
  }

  if (array[middlePosition] === target) {
    //целевое значение ровно посередине, возращаем позицию
    return middlePosition;
  }

  if (endPosition - 1 === startPosition) {
    //диапазон уменьшился до 2-х значений, поэтому проверяем оба
    switch (target) {
      case array[startPosition]: return startPosition
      case array[endPosition]: return endPosition
      default: return -1
    }
  }

  if (target > array[middlePosition]) {
    //целевое значение больше чем значение из середины, значит откидываем меньшую половину
    return binarySearch(array, target, middlePosition, endPosition)
  } else {
    //целевое значение меньше чем значение из середины, значит откидываем большую половину
    return binarySearch(array, target, startPosition, middlePosition)
  }
}

//добавляем CommonJS экспорт что бы вызывать тесты напрямую
module.exports = {
  binarySearch: binarySearch
};



