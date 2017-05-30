 window.onload = function() {
        /**
        * Координаты нашего полигона
        */
        var polygon = [
            [200, 50],
        [415, 100],
        [550, 200],
        [750, 200],
        [300, 400],
        [450, 480],
        [150, 530],
        [100, 150],
        [200, 250],
        [200, 50]
        //     [10, 10],
        //     [100, 10],
        //     [100, 100],
        //     [10, 100],
        //     [10, 10],

        ];
     /**
        * Функция вывода нашего полигона на холсте с использованием массива координат
        */
        var drawPolygon = function(id, coords) {
            var canvas = document.getElementById(id);

            if (canvas) {
                var context = canvas.getContext("2d");

                context.beginPath();
                for (var i = 0; i < coords.length; i++) {
                    if (i === 0) {
                        context.moveTo(coords[i][0], coords[i][1]);
                    } else {
                        context.lineTo(coords[i][0], coords[i][1]);
                    }
                }

                context.strokeStyle = '#000000';
                context.stroke();
            }

            canvas.onclick = click;
        };



        /**
        * Обрабатываем нажатия мышкой на холст
        */
        click = function(event) {
            // Фиксируем координаты клика
            var x = event.offsetX;
            var y = event.offsetY;

            // Готовим запрос к серверу. Запрос содержит координаты полигона и точки куда был произведен клик
            var query = {
                "polygon": polygon,
                "point": [x, y]
            };
            // Получаем доступ к холсту
            var context = this.getContext("2d");
            var request = new XMLHttpRequest();
            request.open('POST', 'inPolygon', false);
            request.onreadystatechange = function () {
               // Если запрос завершён и завершён успешно.

                if (this.readyState === 4 && this.status === 200) {
                    var answer = JSON.parse(request.responseText);

                    context.beginPath();
                    context.arc(x, y, 5, 0, 2 * Math.PI, false);
                    context.fillStyle = answer.inPolygon ? "#0009ad" : "#FF0000";
                    context.fill();
                    context.stroke();
                }

             };
              request.send(JSON.stringify(query));
        };

        /**
        * Рисуем полигон сразу после загрузки страницы
        */
        drawPolygon("canvasMain", polygon);

      // polygon = null;
 };