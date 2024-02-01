import { Product } from "../models/ProductModel.js"


// get all products

export const getProductController = async ( req , res ) => {
    
    try {
        let products = await Product.find({})
        res.status(200).json(products) 
     
    } catch (e) {
         res.status(500).json({"message" : "error in fetching products"})
    }
     
 }
 
 
 // get single product
 
 export const getSingleProductController = async (req, res) => {
 
     let id = req.params.productid;
 
     if (!id) {
         return res.status(400).json({ "message": "bad request" })
     }
 
     try {
         let products = await Product.findOne({ '_id': id })
         products ? res.status(200).json(products) : res.status(400).json({ "message": "bad request" })
 
     } catch (e) {
         res.status(400).json({ "message": "bad request" })
     }
 
 }





// ADMIN PANEL ( CURRENTY NOT WORKING )

// export const postProductController = async ( req , res ) => {

//     try {
//         let productName = req.body.productName
//         let price = req.body.price
//         let description = req.body.description
//         let image = req.file.filename
//         let Category = req.body.Category
        
//         let newProduct = new Product({
//             productName,
//             description,
//             price,
//             image,
//             Category
//         })
        
//         newProduct.save().then(()=>console.log("saved to database"))
        
//     }  catch(err){
//         console.log("error")
//     }
        
// }


