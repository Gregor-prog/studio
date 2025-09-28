export const calculateVolume = (volume : number, height : number) => {
    // calculating radius using sqrt(v/(height * pi))
    let radius = Math.sqrt(volume / (height * Math.PI))
    return radius
}

export const waterLevelCalculate = (ultrasonicHeight:number,radius:any,height:number,volume:number) => {
    let waterHeight = height - ultrasonicHeight;
    let waterVolume = Math.PI * Math.pow(radius,2) * waterHeight;
    let waterLevel = (waterVolume / volume) * 100
    return waterLevel
}