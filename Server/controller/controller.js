const { Items } = require("../model/model")

module.exports.postItemsController=async(req,res,next)=>{
    const postItem=await Items.create({
        itemName:req.body.itemName,
        price:req.body.price,
        description:req.body.description,
        quantity:req.body.quantity
    })
    try {
        res.status(201).json(postItem)
    } catch (error) {
        console.log(error);
    }
}

module.exports.getItemsController=async(req,res,next)=>{
    const getItem=await Items.findAll()
    try {
        res.status(200).json(getItem)
    } catch (error) {
        console.log(error);
    }
}

module.exports.removeItemsController=async(req,res,next)=>{
    const removeItem=await Items.findByPk(req.params.Id)
    try {
        if(removeItem.quantity>=req.body.count){
            removeItem.quantity-=req.body.count
            const updateItem=await removeItem.save()
            try {
                if(updateItem.quantity===0){
                    const deleting=await updateItem.destroy();
                    try {
                        res.json()
                    } catch (error) {
                        throw new Error()
                    }
                }else{
                    res.json(updateItem)
                }
            } catch (error) {
                throw new Error()
            }
        }else{
            throw new Error('Frontend Error')
        } 
    } catch (error) {
        console.log(error);
    }
}

