const Tour = require("../model/Tour")


exports.getTourService = async() =>{
    return ('get all tour')
}

exports.saveProductService = async(data) =>{
    const tour = await Tour.create(data);
    console.log(tour)
    return tour
}