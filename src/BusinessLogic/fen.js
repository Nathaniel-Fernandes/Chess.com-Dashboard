import Chess from 'chess.js'
/*
1. ValidFen
2. ExpandFen
3. makeMove
3.
*/

export const GetCurrentFen = (data, ply, id = -1) => {
    const chess = new Chess(data.startingFen);

    // ply is the actual game ply. so if want to go til that move do i < ply - 1
    for(let i = 0; i < ply - 1; i++) {
        const t = chess.move(data.positions[i].playedMove.moveLan, {sloppy: true})
        if(t === null) {
            console.warn({
                message: "could not make move",
                move: data.positions[i].playedMove.moveLan,
                ply: i,
                id: id
            })
            return;
        }
    }

    return chess.fen();
}