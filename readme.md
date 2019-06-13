# Тестовое задание для wrike
## 1. AЛГОРИТМИЧЕСКАЯ ЗАДАЧА
Дан массив чисел. Написать функцию, выполняющую бинарный поиск элемента в этом массиве. Написать тесты, подтверждающие корректную работу функции.

Запуск:
```
  # в папке wrike-test
  npm install 
  cd task-1
  npm test
```

## 2. ТЕСТОВОЕ ПРИЛОЖЕНИЕ
Реализовать в браузере игру "Крестики-нолики"
Запуск: в папке task-2 открыть файл index.html

## Комментарии к тестовому заданию.
По первой задаче: в комментариях к коду указаны крайние случае которые не обрабатываются в алгоритме. Остальные покрываются тестами.

По второй задаче. В условиях к задаче не было указаны ограничения для задачи. Для того что бы сделать код более гибким 
- вынес все важные переменные в config
- постарался отдельно писать функции относящиеся к View , Model и Controller. Хотя скорее всего код можно было сделать менее связным.
- постарался писать код универсальным для любого размера поля. Но не успел отладить проверки выиграша для полей произвольного размера
- изображения крестиков и ноликов подгружаются из отдельных файлов , для простой замены.

Что не успел сделать:
 - Нет тестов
 - Не успел проверить все возможные комбинации игры, возможно в некоторых случаях проверки по победу отрабатываю некорректно. 
 - Pазделить код на отдельные файлы. Отдельно View, отдельно обработка поведения
 - Добавить сборщик для упаковки и минификации
 - Вынести хранение состояния игры в Window.sessionStorage, что бы не зависеть от перезагрузки страницы. 


