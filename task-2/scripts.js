(function ticTacToe() {
    var config = {
        horizontalCellCount: 3,
        verticalCellCount: 3,
        pathToZeroImg: "img/zero.svg",
        pathToCrossImg: "img/cross.svg",
        rootElementId: "ticTacToe"
    };

    var playModel = {
        field: [[],
                [],
                []],
        currentFigureIsZero:true
    }

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
        for (x = 1; x <= config.verticalCellCount; x++) {
            let trEl = document.createElement('tr');
            for (y = 1; y <= config.horizontalCellCount; y++) {
                let tdEl = document.createElement('td');
                trEl.appendChild(tdEl);
                tdEl.dataset.cord = x+","+y
                tdEl.appendChild(generateImgInCell(config.pathToZeroImg, "zero"));                
                tdEl.appendChild(generateImgInCell(config.pathToCrossImg, "cross"));
                tdEl.addEventListener('click', showFigure);
            }
            tbodyEl.appendChild(trEl);
        }
        rootEl.appendChild(tableEl);
    }

    function generateImgInCell(pathToImg,type) {
        let addingEl = document.createElement('object');
        addingEl.setAttribute("type", "image/svg+xml");
        addingEl.setAttribute("data", pathToImg);
        addingEl.setAttribute("class", type);
        addingEl.hidden = true;
        return addingEl;
    }

    function showFigure(e) {
        let target = e.target;
        var elForShow;
        let clickPosition = target.dataset.cord.split(','); //массив с позицией клика

        target.removeEventListener('click', showFigure);        
        if (playModel.currentFigureIsZero) {
            elForShow = target.querySelector(".zero");
        } else {
            elForShow = target.querySelector(".cross");
        }
        elForShow.hidden = false;
        playModel.currentFigureIsZero ? playModel.currentFigureIsZero = false : playModel.currentFigureIsZero = true;
    }

    init();
})();






