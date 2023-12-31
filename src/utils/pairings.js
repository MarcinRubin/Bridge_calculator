export const create_all_pairs = (arr) =>{
    const n_part = arr.length
    
    //shuffle gamer table
    //for (let i = all_gamers - 1; i > 0; i--) {
    //    const j = Math.floor(Math.random() * (i + 1));
    //    [arr[i], arr[j]] = [arr[j], arr[i]];
    //}

    //add dummy players

    let row1 = arr.splice(0, Math.floor(arr.length) / 2);
    let pairs = {
        0: row1.map((item, idx) => {
            return [item, arr[idx]]
        })
    };

    for (let i = 1; i < n_part; i++){
        let to_move = row1[row1.length - 1] ;
        row1 = [arr[0], ...row1.splice(0, row1.length - 1)]
        arr = [...arr.splice(1, arr.length - 2), to_move, arr[arr.length - 1]]
        //CREATE NEW PAIRING
        pairs[i] = row1.map((item, idx) => {
        return [item, arr[idx]];
        })
    }
    console.log(pairs);
    return pairs;
}