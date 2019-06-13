(function ticTacToe() {

    //часть отвечающая за Model : конфигурация и текущее состояние игры

    var config = {
        horizontalCellCount: 2, //количество ячеек на поле по горизонтали(отсчёт с нуля)
        verticalCellCount: 2, //тоже по вертикале
        winCellCount: 3, //количество ячеек заполненое подряд для выигрыша(отсчёт с нуля)
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
        currentFigure: config.firstPlayerFigure, //кто ходит прямо сейчас крестики ("1") или нолики ("0")
        winnerFigure: null
    }

    //часть отвечающая за View: генерация игрового поля

    function init() {
        let targetElement = document.getElementById(config.rootElementId);
        if (!targetElement) {
            console.log("элемент с id ticTacToe не найден");
            return
        } else
            generateGameField(targetElement);
    }

    function generateGameField(rootEl) {
        let tableEl = document.createElement('table');
        let tbodyEl = document.createElement('tbody'); tableEl.appendChild(tbodyEl);
        for (let x = 0; x <= config.verticalCellCount; x++) {
            let trEl = document.createElement('tr');
            playModel.field[x] = []; //паралельно с генерацией элемента для DOM заполняем модель 
            for (let y = 0; y <= config.horizontalCellCount; y++) {
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
        let elForShow;
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

        // по текущей позиции надо проверить горизонталь, вертикаль и диагональ в playModel.field
        function checkHorizontal() {
            let sequenceLength = 0;
            for (let i = 0; i <= config.horizontalCellCount; i++) {
                if (playModel.field[+xPos][i] == playModel.currentFigure) {
                    sequenceLength++;
                    if (sequenceLength == config.winCellCount) return sequenceLength;
                } else sequenceLength = 0;
            };
            return sequenceLength;
        };

        function checkVertical() {
            let sequenceLength = 0;
            for (let i = 0; i <= config.horizontalCellCount; i++) {
                if (playModel.field[i][+yPos] == playModel.currentFigure) {
                    sequenceLength++;
                    if (sequenceLength == config.winCellCount) return sequenceLength;
                } else sequenceLength = 0;
            };
            return sequenceLength;
        };

        function checkFirstDiagonal() {
            let sequenceLength = 0;
            for (let i = 0; i <= config.horizontalCellCount; i++) {
                if (playModel.field[i][i] == playModel.currentFigure) {
                    sequenceLength++;
                    if (sequenceLength == config.winCellCount) return sequenceLength;
                } else sequenceLength = 0;
            };
            return sequenceLength;
        };

        function checkSecondDiagonal() {
            let sequenceLength = 0;
            let z = config.winCellCount; //второй индекс для перебора
            // for (let i = 0; i <= config.horizontalCellCount; i++) {
            //     if (playModel.field[i][z] == playModel.currentFigure) {                    
            //         sequenceLength++;
            //         if (sequenceLength == config.winCellCount) return sequenceLength;
            //     } else {
            //         sequenceLength = 0; 
            //     }
            //     z--;
            //     if (z==0) return;
            // };
            if (playModel.field[0][2] == playModel.currentFigure &&
                playModel.field[1][1] == playModel.currentFigure &&
                playModel.field[2][0] == playModel.currentFigure)
                return config.winCellCount;
        };

        if (checkHorizontal() == config.winCellCount ||
            checkVertical() == config.winCellCount ||
            checkFirstDiagonal() == config.winCellCount ||
            checkSecondDiagonal() == config.winCellCount) {
            playModel.winnerFigure = playModel.currentFigure;
            showResult();
        }
    };

    function showResult() {
        let messageEl = document.createElement('p');
        messageEl.setAttribute('class', 'winMessage')
        let winMessage;
        if (playModel.winnerFigure === null) winMessage = 'Ничья!'
        else if (playModel.winnerFigure === 1) winMessage = 'Крестики выиграли!'
        else if (playModel.winnerFigure === 0) winMessage = 'Нолики выиграли!';
        messageEl.innerHTML = winMessage;
        let targetElement = document.getElementById(config.rootElementId);
        targetElement.appendChild(messageEl);
    }
    init();
})();






