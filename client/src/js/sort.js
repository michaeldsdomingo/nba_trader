const swap = (array, left, right) => {
    let temp = array[left];
    array[left] = array[right]
    array[right] = temp
}

const partition = (array, left, right) => {
    let pivot = array[Math.floor((right + left) / 2)][1].player_stats.stats[17].stat.value
    let i = left
    let j = right
    
    while (i <= j) {
        while (array[i][1].player_stats.stats[17].stat.value < pivot) {
            i++
        }

        while (array[j][1].player_stats.stats[17].stat.value > pivot) {
            j--
        }

        if (i <= j) {
            swap(array, i, j)
            i++
            j--
        }
    }

    return i
}

export default function quickSort(array, left, right) {
    let index;
    if (array.length > 1) {
        index = partition(array, left, right)

        if (left < index - 1) {
            quickSort(array, left, index - 1)
        }

        if (index < right) {
            quickSort(array, index, right)
        }
    }
    return array
}