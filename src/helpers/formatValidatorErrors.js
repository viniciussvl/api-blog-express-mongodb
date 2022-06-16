const common = function(errors) {
    return errors.array().map(function (item) {
        return { 
            msg: item.msg, 
            field: item.param 
        }
    })
}

const debug = function(errors) {
    console.log(errors);
}

module.exports = {
    common,
    debug
};