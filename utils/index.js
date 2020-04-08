export function findWinner(boxes) {
    // Init Array with winning combos
    const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    // Iterate and check for combos
    for (let i = 0; i < rows.length; i++) {
        const [a, b, c] = rows[i]

        // Check board for winning combo
        if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
            console.log("There is a winner! ", boxes[a]);
            return boxes[a]
        }
    }
    return null
}

export function isBoardFull(boxes) {
    // Init counter
    let count = 0
    // Loop over all boxes
    boxes.forEach(function (item) {
        if (item !== null) {
            // Increase board count
            count++
        }
    })

    // Check if board full
    if (count === 9) {
        return true
    } else {
        return false
    }
}
