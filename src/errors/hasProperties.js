function hasProperties(...properties){
    // console.log("....", ...properties);
    // console.log(":::", properties);
    return function(req, res, next){
        const { data ={}} = req.body;
        // console.log("hasProperties---data::: ", data)
    
    try{
        properties.forEach((property) =>{
            // console.log("forEach:::", property);
            if(!data[property]){
                const error= new Error(`A '${property}' property is required.`);
                error.status=400;
                throw error;
            }
        });
        next();
    }
    catch(error){
        next(error);
    }
    };
}

module.exports = hasProperties;