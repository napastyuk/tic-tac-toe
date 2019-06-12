(function ticTacToe() {
    var config = {
        horizontalCellCount: 3,
        verticalCellCount: 3,
        pathToZeroImg: "img/zero.svg",
        pathToCrossImg: "img/cross.svg",
        rootElementId: "ticTacToe"
    };

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
                tdEl.appendChild(generateImgInCell(config.pathToZeroImg));                
                tdEl.appendChild(generateImgInCell(config.pathToCrossImg));                
            }
            tbodyEl.appendChild(trEl);
        }
        rootEl.appendChild(tableEl);
    }

    function generateImgInCell(pathToImg) {
        let addingEl = document.createElement('object');
        addingEl.setAttribute("type", "image/svg+xml");
        addingEl.setAttribute("data", pathToImg);
        addingEl.hidden = true;
        return addingEl;
    }

    init();
})();






