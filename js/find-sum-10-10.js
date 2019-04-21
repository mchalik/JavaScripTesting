/*
Медленный, но гораздо более простой алгоритм для сравнения результатов
*/
debugger;
function find_silly(task) {
    var sub_arrays = [{ ar: task.ar, processed: false }],
        i = 0,
        full_processed = false;
    // Просто перечисляем всевозможные комбинации. Нашли в sub_arrays какой-нибудь массив A - разбиваем
    // его на все подмассивы без одного элемента, и вставляем результат обратно в sub_arrays. Сам массив A
    // помечаем "обработанным".
    while (!full_processed) {
        if (!sub_arrays[i].processed) {
            for (j in sub_arrays[i].ar)
                sub_arrays.push({
                    ar: sub_arrays[i].ar.slice(0, j).concat(sub_arrays[i].ar.slice(j * 1 + 1)),
                    processed: (sub_arrays[i].ar.length <= 2)
                });
            sub_arrays[i].processed = true;
        }
        full_processed = true;
        for (j in sub_arrays)
            full_processed = full_processed & sub_arrays[j].processed;
        i++;
    }
    // Чистим массив от повторений с помощью вспомогательного объекта
    var hash = {};
    for (i in sub_arrays) hash[sub_arrays[i].ar] = null;
    sub_arrays = [];
    for (i in hash) {
        ar = i.split(',').map((value)  => value * 1);
        if (ar.reduce(
            (previousValue, currentValue) => previousValue + currentValue)
            === task.sum) sub_arrays.push(ar);
    }
    return sub_arrays;
}

task = { sum: 10, ar: [7, 10, 2, 5, 3, 1] };

array_silly = find_silly(task);

console.log(array_silly);