
module.exports = function(err,req,res,next){
    res.status(404).send({'error':res.error});
}