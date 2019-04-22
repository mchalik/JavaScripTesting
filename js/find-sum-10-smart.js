function find_optimized(task) {
    var results = [],
        new_tasks = [];
    for (i in task.ar)
        // Нашли элемент = требуемой сумме? Это будет концом цепочки.
        if (task.sum == task.ar[i]) results.push([task.ar[i]]);
        else
        // Если поиск небесполезен - попробуем поискать, начиная с текущего элемента
        if ((task.ar.length - 1 > i) && (task.sum > task.ar[i])) {
            // Рекурсия с новой (меньшей) суммой и входным массивом с выколотым текущим элементом.
            sub_array = find_optimized({ prev: task.ar[i], sum: task.sum - task.ar[i], ar: task.ar.slice(i * 1 + 1) });
            // Складываем в тот же плоский массив результаты поиска
            for (i in sub_array[1]) results.push([sub_array[0]].concat(sub_array[1][i]));
        }
    // Если не на вершине стека - вернём предыдущий элемент цепочки. Если что-то нашли - вернём ещё и массив результатов.
    return ((results.length == 0) ? task.prev : (task.prev == undefined ? results : [task.prev, results]));
}
task = { sum: 10, ar: [7, 10, 2, 5, 3, 1] };

array_optimized = find_optimized(task);

console.log(array_optimized);