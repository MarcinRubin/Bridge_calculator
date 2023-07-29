const toIMP = (result) => {
    if(result >= 0 && result <= 10) return 0;
    if(result >= 20 && result <= 40) return 1;
    if(result >= 50 && result <= 80) return 2;
    if(result >= 90 && result <= 120) return 3;
    if(result >= 130 && result <= 160) return 4;
    if(result >= 170 && result <= 210) return 5;
    if(result >= 220 && result <= 260) return 6;
    if(result >= 270 && result <= 310) return 7;
    if(result >= 320 && result <= 360) return 8;
    if(result >= 370 && result <= 420) return 9;
    if(result >= 430 && result <= 490) return 10;
    if(result >= 500 && result <= 590) return 11;
    if(result >= 600 && result <= 740) return 12;
    if(result >= 750 && result <= 890) return 13;
    if(result >= 900 && result <= 1090) return 14;
    if(result >= 1100 && result <= 1290) return 15;
    if(result >= 1300 && result <= 1490) return 16;
    if(result >= 1500 && result <= 1740) return 17;
    if(result >= 1750 && result <= 1990) return 18;
    if(result >= 2000 && result <= 2240) return 19;
    if(result >= 2250 && result <= 2490) return 20;
    if(result >= 2500 && result <= 2990) return 21;
    if(result >= 3000 && result <= 3490) return 22;
    if(result >= 3500 && result <= 3990) return 23;
    if(result >= 4000)  return 24;
}
    

export const calculate_mean = (single_deal) =>{ 
    let mean = 0;
    for (let j of Object.values(single_deal)){ 
        if(!Array.isArray(j)){
            mean += j.NS_ZAP;
            mean -= Number(j.EW_ZAP);
        }
    }
    console.log(mean);
    mean /= (Object.values(single_deal).length-1);
    console.log(mean)
    mean = parseInt(mean / 10) * 10;
    return mean
}

export const assign_punctation_to_subdeal = (j, mean) =>{
    console.log(j);
    console.log(mean);
    const ns_pair = ['N', 'S']
    const ew_pair = ['E', 'W']

    if(ns_pair.includes(j.RG)){
        if( (j.NS_ZAP - mean) < 0 ){
            j.NS_WYN = (-toIMP(mean - j.NS_ZAP))
        }
        else j.NS_WYN = toIMP(j.NS_ZAP - mean)
        j.EW_WYN = (-j.NS_WYN)
        }
        else{
            if(j.EW_ZAP + mean < 0){
                j.EW_WYN = (-toIMP(-j.EW_ZAP - mean))
            }
            else j.EW_WYN = toIMP(j.EW_ZAP + mean)
            j.NS_WYN = (-j.EW_WYN)
        }
    }

    // if(Number(j.NS_ZAP) > Number(j.EW_ZAP)){
    //     if( (j.NS_ZAP - mean) < 0){
    //         j.NS_WYN = (-toIMP(mean - j.NS_ZAP))
    //     }
    //     else j.NS_WYN = toIMP(j.NS_ZAP - mean)
    //     j.EW_WYN = (-j.NS_WYN)
    // }
    // else{
    //     if(j.EW_ZAP + mean < 0){
    //             j.EW_WYN = (-toIMP(-j.EW_ZAP - mean))
    //     }
    //     else j.EW_WYN = toIMP(j.EW_ZAP + mean)
    //     j.NS_WYN = (-j.EW_WYN)
    // }

export const assign_punctation_to_players = (j, pairings, participants, round) =>{
    const player1 = pairings[round][Number(j.NS)-1][0];
    const player2 = pairings[round][Number(j.NS)-1][1];
    const player3 = pairings[round][Number(j.EW)-1][0];
    const player4 = pairings[round][Number(j.EW)-1][1];
    participants[player1].points[round] = Number(participants[player1].points[round]) + Number(j.NS_WYN);
    participants[player2].points[round] = Number(participants[player2].points[round]) + Number(j.NS_WYN);
    participants[player3].points[round] = Number(participants[player3].points[round]) - Number(j.NS_WYN);
    participants[player4].points[round] = Number(participants[player4].points[round]) - Number(j.NS_WYN);
}

export const zero_punctation = (participants, round) =>{
    Object.values(participants).forEach( item => {
        item.points[round] = 0
    })
}