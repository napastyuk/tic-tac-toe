(function ticTacToe() {

    //часть отвечающая за Model : конфигурация и текущее состояние игры

    var config = {
        horizontalCellCount: 2, //количество ячеек на поле по горизонтали(отсчёт с нуля)
        verticalCellCount: 2, //тоже по вертикале
        winCellCount:3, //количество ячеек заполненое подряд для выигрыша
        pathToZeroImg: "img/zero.svg", //путь до картинки с ноликом
        pathToCrossImg: "img/cross.svg", //путь до картинки с крестиком
        rootElementId: "ticTacToe", //id тега контейнера в котором будет сгенерировано поле
        firstPlayerFigure: 0 // за какие фигуры играет первый игрок. 0-за нолики 1-за крестики;
    };

    var playModel = {
        //массив который хранит игровое поле.
        //каждая ячейка может быть в одном из 3-х состояний
        //null - ячейка еще пустая
        //"0" - в ячейке нолик
        //"1" - в ячейке крестик 
        field: [],
        currentFigure: config.firstPlayerFigure //кто ходит прямо сейчас крестики ("1") или нолики ("0")
    }

    //часть отвечающая за View: генерация игрового поля

    function init() {
        var targetElement = document.getElementById(config.rootElementId);
        if (!targetElement) {
            console.log("элемент с id ticTacToe не найден");
            return
        } else
            generateGameField(targetElement);
    }

    function generateGameField(rootEl) {
        let tableEl = document.createElement('table');
        let tbodyEl = document.createElement('tbody'); tableEl.appendChild(tbodyEl);
        for (x = 0; x <= config.verticalCellCount; x++) {
            let trEl = document.createElement('tr');
            playModel.field[x] = []; //паралельно с генерацией элемента для DOM заполняем модель 
            for (y = 0; y <= config.horizontalCellCount; y++) {
                let tdEl = document.createElement('td');
                trEl.appendChild(tdEl);
                tdEl.dataset.cord = x + "," + y;
                playModel.field[x][y] = null; //пустые ячейки кодируются null
                tdEl.appendChild(generateImgInCell(config.pathToZeroImg, "zero"));
                tdEl.appendChild(generateImgInCell(config.pathToCrossImg, "cross"));
                tdEl.addEventListener('click', showFigure);
            }
            tbodyEl.appendChild(trEl);
        }
        rootEl.appendChild(tableEl);
    }

    function generateImgInCell(pathToImg, type) {
        let addingEl = document.createElement('object');
        addingEl.setAttribute("type", "image/svg+xml");
        addingEl.setAttribute("data", pathToImg);
        addingEl.setAttribute("class", type);
        addingEl.hidden = true;
        return addingEl;
    }

    // часть отвечающая за Controller: добавление обработчиков кликов

    function showFigure(e) {
        let target = e.target;
        var elForShow;
        let clickPosition = target.dataset.cord.split(','); //массив с позицией клика        
        checkForWinner(clickPosition[0], clickPosition[1]);
        target.removeEventListener('click', showFigure);
        if (playModel.currentFigure) {
            elForShow = target.querySelector(".cross");
        } else {
            elForShow = target.querySelector(".zero");
        }
        elForShow.hidden = false;
        //меняем фигуру на следующий ход
        playModel.currentFigure ? playModel.currentFigure = 0 : playModel.currentFigure = 1;
    }

    function checkForWinner(xPos, yPos) {
        playModel.field[xPos][yPos] = playModel.currentFigure; //обновляем модель

        // по текущей позиции надо проверить горизонталь, вертикаль и диагональ
        function checkHorizontal() {
            var sequenceLength = 0;
            for (i = 0; i <= config.horizontalCellCount; i++) {
                if (playModel.field[+xPos][i] == playModel.currentFigure) sequenceLength++;
            };
            return sequenceLength;
        };

        function checkVertical() {
            var sequenceLength = 0;
            for (i = 0; i <= config.horizontalCellCount; i++) {
                if (playModel.field[i][+yPos] == playModel.currentFigure) sequenceLength++;
            };
            return sequenceLength;
        };

        function checkFirstDiagonal() {
            var sequenceLength = 0;
            for (i = 0; i <= config.horizontalCellCount; i++) {
                if (playModel.field[i][i] == playModel.currentFigure) sequenceLength++;
            };
            return sequenceLength;
        };

        function checkSecondDiagonal() {
            var sequenceLength = 0;
            for (i = 0; i <= config.horizontalCellCount; ) {
                for (z = config.verticalCellCount; z >= 0; ) {
                    // console.log("[i][z] " + i + " " + z);
                    if (playModel.field[i][z] == playModel.currentFigure)  {
                        sequenceLength++;
                        console.log("нашел в " + i + " " + z);
                    i++;
                    z--;    
                    }
                };                
            };
            console.log("sequenceLength " + sequenceLength);
            return sequenceLength;
        };

        console.log("checkHorizontal() " + checkHorizontal());
        console.log("checkVertical() " + checkVertical());
        console.log("checkFirstDiagonal() " + checkFirstDiagonal());
        console.log("checkSecondDiagonal() " + checkSecondDiagonal());

        // if (checkHorizontal() == config.winCellCount || 
        //     checkVertical() == config.winCellCount ||
        //     checkFirstDiagonal() == config.winCellCount ||
        //     checkSecondDiagonal() == config.winCellCount )
        // console.log(playModel.currentFigure + " выиграл!");     
    }
    init();
})();






