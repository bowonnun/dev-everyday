import Base64 from '../components/Base64'
import axios from 'axios';
export  const getFloatVal = ( string ) =>{
    const bath = '฿'+string
    let floatValue = bath.match( /[+-]?\d+(\.\d+)?/g)[0];
    return( null !== floatValue) ? parseInt(parseFloat(floatValue).toFixed(2)):''
}

export const addFirstProduct = ( product,price,type,variation,qty ) =>{
    let productPrice = getFloatVal(price);
    let totalShippingVal = parseFloat((product.weight)*qty)
    let Weigthtotal = {weight : parseFloat((product.weight)*qty)}
    if(Weigthtotal.weight == 0){
        totalShippingVal = 0
    }
    if(Weigthtotal.weight <= 0.30 && Weigthtotal.weight !== 0){
        totalShippingVal = 45.00
    }
    if(Weigthtotal.weight >= 0.31 && Weigthtotal.weight <= 1.10){
        totalShippingVal = 75.00
    }
    if(Weigthtotal.weight >= 1.11 && Weigthtotal.weight <= 5.00){
        totalShippingVal = 95.00
    }
    if(Weigthtotal.weight >= 5.01 && Weigthtotal.weight <= 10.00){
        totalShippingVal = 140.00
    }
    if(Weigthtotal.weight >= 10.01 && Weigthtotal.weight <= 15.00){
        totalShippingVal = 200.00
    }
    if(parseFloat((productPrice * qty).toFixed(2)) >= 1500){
        totalShippingVal = 0
    }
    let newCart = {
        products:[],
        isCheckedAll: true,
        totalShipping: totalShippingVal,
        totalSubtotal: variation != undefined? getFloatVal(variation.regularPrice) : parseFloat((productPrice * qty).toFixed(2)),
        totalProductsCount: qty,
        totalProductsPrice: parseFloat((productPrice * qty).toFixed(2))
    }
    const newsProduct = createNewProduct( product, productPrice, qty, type,variation)
    newCart.products.push(newsProduct)
    localStorage.setItem('woo-next-cart', Base64.btoa(JSON.stringify(newCart)))
    return newCart
}
/**
 *  Create a new product object
 * @param {*} product 
 * @param {*} productPrice 
 * @param {*} qty 
 */
export const createNewProduct = (product,productPrice,qty,type,variation) => {
        if(variation == null){
            return {
                productId: product.productId,
                name: product.name,
                isChecked: true,
                image: product.image.sourceUrl,
                weight: parseFloat((product.weight)*qty),
                regularPrice: getFloatVal(product.regularPrice),
                saleprice: product.salePrice !=null ? getFloatVal(product.salePrice) : null,
                price: productPrice,
                qty: qty,
                totalPrice: parseFloat((productPrice * qty).toFixed(2)),
                __typename: "SimpleProduct",
            }
        }else{
            return {
                productId: product.productId,
                name: variation.name,
                isChecked: true,
                image: product.image.sourceUrl,
                weight: parseFloat((product.weight)*qty),
                regularPrice: getFloatVal(variation.regularPrice),
                saleprice: variation.salePrice != null ? getFloatVal(variation.salePrice) : null,
                price: productPrice,
                variationId: variation.variationId,
                qty: qty,
                totalPrice: parseFloat((productPrice * qty).toFixed(2)),
                __typename: "ProductVariation",

            }
        }
        
}
export const updateCart = ( existingCart, product, qtyToBeAdded, variation, newQty = false,conpon,productsInCartManageStock  ) => {
    let productExitsIndex = 0
    if(product.__typename === "SimpleProduct" || product.__typename === undefined){
         productExitsIndex = isProductInCart( existingCart.products, product.productId);
    }
    else{
         productExitsIndex = isProductInCart( existingCart.products, product.productId, variation.variationId);
    }
	const updatedProducts = getUpdatedProducts( existingCart.products , product, qtyToBeAdded, variation, newQty,productsInCartManageStock.stockQuantity );
        const addPrice = (total, item) => {
            total.totalPrice += item.isChecked ? item.totalPrice : 0;
               total.qty += item.isChecked ? item.qty : 0;
               return total;  
        };
        const addSubPrice = (total, item) => {
            total.regularPrice += item.isChecked ? item.regularPrice*item.qty : 0;
               total.qty += item.isChecked ? item.qty : 0;
               return total;  
        };
        const addWeigth = (total, item) => {
            let weightItem = item.isChecked ? Math.round(parseFloat((item.weight))*item.qty * 100) / 100 : 0
            total.weight += item.isChecked ? weightItem : 0;
            total.qty += item.isChecked ? item.qty : 0;
            return total;
        };
        let total = updatedProducts.reduce( addPrice, { totalPrice: 0, qty: 0 } )
        let subTotal = updatedProducts.reduce( addSubPrice, { regularPrice: 0, qty: 0 } )
        let Weigthtotal = updatedProducts.reduce( addWeigth, { weight: 0, qty: 0 } )
        let totalShippingVal = 0
        if(Weigthtotal.weight == 0){
            totalShippingVal = 0
        }
        if(Weigthtotal.weight <= 0.30 && Weigthtotal.weight !== 0){
            totalShippingVal = 45.00
        }
        if(Weigthtotal.weight >= 0.31 && Weigthtotal.weight <= 1.10){
            totalShippingVal = 75.00
        }
        if(Weigthtotal.weight >= 1.11 && Weigthtotal.weight <= 5.00){
            totalShippingVal = 95.00
        }
        if(Weigthtotal.weight >= 5.01 && Weigthtotal.weight <= 10.00){
            totalShippingVal = 140.00
        }
        if(Weigthtotal.weight >= 10.01 && Weigthtotal.weight <= 15.00){
            totalShippingVal = 200.00
        }
        if(total.totalPrice >= 1500){
            totalShippingVal = 0
        }
        
        // let ConponFromCart = ConponFromCart( updatedProducts, product, variation.variationId);
        if(conpon != undefined){
            if(new Date() <= new Date(conpon.date_expires)){
           
                if(conpon.minimum_amount < total.totalPrice){
                    
                    let pricedisCount = 0
                    if(conpon.discount_type == "percent"){
                        pricedisCount = parseFloat( (total.totalPrice + totalShippingVal) / conpon.amount)
                        conpon['priceDiscount'] = pricedisCount
                    }else{
                        pricedisCount =  conpon.amount
                        conpon['priceDiscount'] = conpon.amount
                    }
                    
                    const updatedCart = {
                        products: updatedProducts,
                        isCheckedAll: existingCart.isCheckedAll,
                        isConpon: conpon,
                        totalShipping: totalShippingVal,
                        totalSubtotal : subTotal.regularPrice,
                        totalProductsCount: parseInt( total.qty ),
                        totalProductsPrice: parseFloat( (total.totalPrice + totalShippingVal) - pricedisCount )
                    };
                    
                    localStorage.setItem('woo-next-cart', Base64.btoa(JSON.stringify(updatedCart)))
                    return updatedCart;
                }else{
                    conpon=undefined
                    const updatedCart = {
                        products: updatedProducts,
                        isCheckedAll: existingCart.isCheckedAll,
                        isConpon: conpon,
                        totalShipping: totalShippingVal,
                        totalSubtotal : subTotal.regularPrice,
                        totalProductsCount: parseInt( total.qty ),
                        totalProductsPrice: parseFloat( total.totalPrice + totalShippingVal )
                    };
                    localStorage.setItem('woo-next-cart', Base64.btoa(JSON.stringify(updatedCart)))
                    return updatedCart;
                }
            }else{
                conpon=undefined
                const updatedCart = {
                    products: updatedProducts,
                    isCheckedAll: existingCart.isCheckedAll,
                    isConpon: conpon,
                    totalShipping: totalShippingVal,
                    totalSubtotal : subTotal.regularPrice,
                    totalProductsCount: parseInt( total.qty ),
                    totalProductsPrice: parseFloat( total.totalPrice + totalShippingVal )
                };
                localStorage.setItem('woo-next-cart', Base64.btoa(JSON.stringify(updatedCart)))
            
                return updatedCart;
            }
        }else{
            conpon=undefined
            const updatedCart = {
                products: updatedProducts,
                isCheckedAll: existingCart.isCheckedAll,
                isConpon: conpon,
                totalShipping: totalShippingVal,
                totalSubtotal : subTotal.regularPrice,
                totalProductsCount: parseInt( total.qty ),
                totalProductsPrice: parseFloat( total.totalPrice + totalShippingVal )
            };
            localStorage.setItem('woo-next-cart', Base64.btoa(JSON.stringify(updatedCart)))
        
            return updatedCart;
        }
        
        
	// Loop through the updated product array and add the totalPrice of each item to get the totalPrice
};
export const ConponFromCart = (existingCart, product, conpon,isChecked,productsInCartManageStock) =>{
    const existingProductsInCart = existingCart.products
    const productExitsIndex = isProductInCart( existingProductsInCart, product.productId, product.variationId);
    let updatedProducts = existingProductsInCart;
    let totalProductsCount = 0
    let totalProductsCountAll = 0
    let totalProductsPrice = 0
    if(-1 < productExitsIndex){
        let updatedProduct = updatedProducts[ productExitsIndex ];
        if(productsInCartManageStock[productExitsIndex].stockStatus != "OUT_OF_STOCK"){
            updatedProduct.isChecked = isChecked
        }else{
            updatedProduct.isChecked = false
        }
        
    }
    updatedProducts.map((item,i)=>{
        if(item.isChecked){
            totalProductsCountAll += item.qty
            totalProductsCount += item.qty
            totalProductsPrice += item.price*item.qty
        }else{
            totalProductsCountAll += item.qty
        }
    })
    if(new Date() <= new Date(conpon.date_expires)){
        if(conpon.minimum_amount < totalProductsPrice){
            let pricedisCount = 0
            if(conpon.discount_type == "percent"){
                pricedisCount = parseFloat( (totalProductsPrice + existingCart.totalShipping) / conpon.amount)
                conpon['priceDiscount'] = pricedisCount
            }else{
                pricedisCount =  conpon.amount
                conpon['priceDiscount'] = conpon.amount
            }
            const updatedCart = {
                products: updatedProducts,
                isConpon: conpon,
                isCheckedAll: existingCart.isCheckedAll,
                totalShipping: existingCart.totalShipping,
                totalSubtotal : existingCart.totalSubtotal,
                totalProductsCount: parseInt( totalProductsCount ),
                totalProductsPrice: parseFloat( (totalProductsPrice + existingCart.totalShipping) - pricedisCount)
            };
            localStorage.setItem('woo-next-cart', Base64.btoa(JSON.stringify(updatedCart)))
            return updatedCart;
        }else{
            conpon=undefined
            const updatedCart = {
                products: updatedProducts,
                isConpon: conpon,
                isCheckedAll: existingCart.isCheckedAll,
                totalShipping: existingCart.totalShipping,
                totalSubtotal : existingCart.totalSubtotal,
                totalProductsCount: parseInt( totalProductsCount ),
                totalProductsPrice: parseFloat( totalProductsPrice + existingCart.totalShipping )
            };
            localStorage.setItem('woo-next-cart', Base64.btoa(JSON.stringify(updatedCart)))
            return updatedCart;
        }
    }else{
        conpon=undefined
        const updatedCart = {
            products: updatedProducts,
            isConpon: conpon,
            isCheckedAll: existingCart.isCheckedAll,
            totalShipping: existingCart.totalShipping,
            totalSubtotal : existingCart.totalSubtotal,
            totalProductsCount: parseInt( totalProductsCount ),
            totalProductsPrice: parseFloat( totalProductsPrice + existingCart.totalShipping )
        };
        localStorage.setItem('woo-next-cart', Base64.btoa(JSON.stringify(updatedCart)))
    
        return updatedCart;
    }
}
export const SelectItemFromCart = (existingCart, product, isChecked,productsInCartManageStock ,conpon) =>{
    const existingProductsInCart = existingCart.products
    let productExitsIndex = ''
    if(product.variationId !== undefined){
        productExitsIndex = isProductInCart( existingProductsInCart, product.productId, product.variationId); 
    }else{
        productExitsIndex = isProductInCart( existingProductsInCart, product.productId); 
    }
    
    
    let updatedProducts = existingProductsInCart;
    if(-1 < productExitsIndex){
        let updatedProduct = updatedProducts[ productExitsIndex ];
        if(productsInCartManageStock[productExitsIndex].stockStatus != "OUT_OF_STOCK"){
            updatedProduct.isChecked = isChecked
        }else{
            updatedProduct.isChecked = false
        }
        
    }
    let totalProductsCount = 0
    let totalProductsCountAll = 0
    let totalProductsPrice = 0
    let CheckedAllArray = []
    updatedProducts.map((item,i)=>{
        if(item.isChecked){
            CheckedAllArray.push(item.isChecked)
            updateCart(existingCart,product,0,productsInCartManageStock[i],false,conpon,productsInCartManageStock[i])
            totalProductsCountAll += item.qty
            totalProductsCount += item.qty
            totalProductsPrice += item.price*item.qty
            
        }else{
            totalProductsCountAll += item.qty
        }
    })
    let checkCheckbox = CheckedAllArray.filter((item, same) => CheckedAllArray.indexOf(item) === same)

    if(checkCheckbox.includes(false) == false &&checkCheckbox.length == 1){
        existingCart.isCheckedAll = true
    }else{
        existingCart.isCheckedAll = false
    }
    if(conpon != undefined){
        if(new Date() <= new Date(conpon.date_expires)){
            if(conpon.minimum_amount < totalProductsPrice){
                let pricedisCount = 0
                if(conpon.discount_type == "percent"){
                    pricedisCount = parseFloat( (totalProductsPrice + existingCart.totalShipping) / conpon.amount)
                    conpon['priceDiscount'] = pricedisCount
                }else{
                    pricedisCount =  conpon.amount
                    conpon['priceDiscount'] = conpon.amount
                }
                const updatedCart = {
                    products: updatedProducts,
                    isConpon: conpon,
                    isCheckedAll: existingCart.isCheckedAll,
                    totalShipping: existingCart.totalShipping,
                    totalSubtotal : existingCart.totalSubtotal,
                    totalProductsCount: parseInt( totalProductsCount ),
                    totalProductsPrice: parseFloat( (totalProductsPrice + existingCart.totalShipping) - pricedisCount)
                };
                localStorage.setItem('woo-next-cart', Base64.btoa(JSON.stringify(updatedCart)))
                return updatedCart;
            }else{
                conpon=undefined
                const updatedCart = {
                    products: updatedProducts,
                    isConpon: conpon,
                    isCheckedAll: existingCart.isCheckedAll,
                    totalShipping: existingCart.totalShipping,
                    totalSubtotal : existingCart.totalSubtotal,
                    totalProductsCount: parseInt( totalProductsCount ),
                    totalProductsPrice: parseFloat( totalProductsPrice + existingCart.totalShipping )
                };
                localStorage.setItem('woo-next-cart', Base64.btoa(JSON.stringify(updatedCart)))
                return updatedCart;
            }
        }else{
            conpon=undefined
            const updatedCart = {
                products: updatedProducts,
                isConpon: conpon,
                isCheckedAll: existingCart.isCheckedAll,
                totalShipping: existingCart.totalShipping,
                totalSubtotal : existingCart.totalSubtotal,
                totalProductsCount: parseInt( totalProductsCount ),
                totalProductsPrice: parseFloat( totalProductsPrice + existingCart.totalShipping )
            };
            localStorage.setItem('woo-next-cart', Base64.btoa(JSON.stringify(updatedCart)))
        
            return updatedCart;
        }
    }else{
        conpon=undefined
        const updatedCart = {
            products: updatedProducts,
            isConpon: conpon,
            isCheckedAll: existingCart.isCheckedAll,
            totalShipping: existingCart.totalShipping,
            totalSubtotal : existingCart.totalSubtotal,
            totalProductsCount: parseInt( totalProductsCount ),
            totalProductsPrice: parseFloat( totalProductsPrice + existingCart.totalShipping )
        };
        localStorage.setItem('woo-next-cart', Base64.btoa(JSON.stringify(updatedCart)))
    
        return updatedCart;
    }
}
/**
 * Get Updated product array.
 * Updated the product if its exits
 * and addthenew product to exits
 * 
 * @param {*} existingProductsInCart 
 * @param {*} product 
 * @param {*} qtyToBeAdded 
 * @param {*} newQty 
 */
export const getUpdatedProducts = (existingProductsInCart,product,qtyToBeAdded, variation, newQty = false,productsInCartManageStock = 99 ) =>{
    if(product.__typename !== "SimpleProduct"){
        const productExitsIndex = isProductInCart( existingProductsInCart, product.productId, variation.variationId ,variation.productId);
        // If product exits ( index of that product is found in the array ), update the product qty and totalPRice
        if(-1 < productExitsIndex){
            let updatedProducts = existingProductsInCart;
            let updatedProduct = updatedProducts[ productExitsIndex ];
            if(updatedProduct.qty + qtyToBeAdded >= 0 && updatedProduct.qty + qtyToBeAdded <= productsInCartManageStock){
                updatedProduct.qty = (newQty) ? parseInt(newQty) : parseInt( updatedProduct.qty + qtyToBeAdded)
                updatedProduct.totalPrice = parseFloat( ( updatedProduct.price * updatedProduct.qty ).toFixed( 2 ) );
                return updatedProducts
            }
            else{
                updatedProduct.qty = (newQty) ? parseInt(newQty) : parseInt( updatedProduct.qty + qtyToBeAdded >= 0 ? updatedProduct.qty + qtyToBeAdded <= productsInCartManageStock ? updatedProduct.qty + qtyToBeAdded : productsInCartManageStock : 0)
                updatedProduct.totalPrice = parseFloat( ( updatedProduct.price * updatedProduct.qty ).toFixed( 2 ) );
                return updatedProducts
            }
        }else{
            let productPrice = getFloatVal( variation.price );
            const newProduct = createNewProduct( product, productPrice, qtyToBeAdded ,'',variation );
            existingProductsInCart.push( newProduct );
            return existingProductsInCart;
        }
    }else{
        const productExitsIndex = isProductInCart( existingProductsInCart, product.productId);
        // If product exits ( index of that product is found in the array ), update the product qty and totalPRice
        if(-1 < productExitsIndex){
            let updatedProducts = existingProductsInCart;
            let updatedProduct = updatedProducts[ productExitsIndex ];
            if(updatedProduct.qty + qtyToBeAdded >= 0 && updatedProduct.qty + qtyToBeAdded <= productsInCartManageStock){
                updatedProduct.qty = (newQty) ? parseInt(newQty) : parseInt( updatedProduct.qty + qtyToBeAdded)
                updatedProduct.totalPrice = parseFloat( ( updatedProduct.price * updatedProduct.qty ).toFixed( 2 ) );
                return updatedProducts
            }
            else{
                updatedProduct.qty = (newQty) ? parseInt(newQty) : parseInt( updatedProduct.qty + qtyToBeAdded >= 0 ? updatedProduct.qty + qtyToBeAdded <= productsInCartManageStock ? updatedProduct.qty + qtyToBeAdded : productsInCartManageStock : 0)
                updatedProduct.totalPrice = parseFloat( ( updatedProduct.price * updatedProduct.qty ).toFixed( 2 ) );
                return updatedProducts
            }
        }else{
            let productPrice = getFloatVal( product.price );
            const newProduct = createNewProduct( product, productPrice, qtyToBeAdded );
            existingProductsInCart.push( newProduct );
            return existingProductsInCart;
        }
    }
    
    

    
}
/**
 * return index of the product if it exites
 * 
 * @param {*} existingProductsInCart 
 * @param {*} productId 
 */
export const isProductInCart = (existingProductsInCart, productId, variationId,SimpleproductId) => {
    const returnItemThatExits = (item,index) =>{
        // console.log(productId +" === "+ item.productId  +"&& " + variationId+ " === "+ item.variationId)
        if(variationId === item.variationId){
            // console.log(productId +"===" +item.productId + "&&" + variationId +"==="+ variationId)
            return item
        }else if ( existingProductsInCart[index].__typename === "SimpleProduct" && SimpleproductId === item.productId){
            return item
        }
    }
    const newArray = existingProductsInCart.filter( returnItemThatExits )
    // console.log(newArray[0])
    return existingProductsInCart.indexOf(newArray[0])
}
export const removeItemFromCart = (productId,variationId) =>{
    let encode = localStorage.getItem('woo-next-cart');
    let existingCart = Base64.atob(encode);
        existingCart = JSON.parse(existingCart);
        // If there in only one item in the cart, delete the cart
        if( 1 == existingCart.products.length) {
            localStorage.removeItem('woo-next-cart')
            return null;
        }
        // Check if the product already exists in the cart.
        if(variationId != null){
            const productExistIndex = isProductInCart(existingCart.products,productId,variationId)
            if( -1 < productExistIndex) {
                const productToBeRemoved = existingCart.products[productExistIndex];
                const qtyToBeRemovedFromTotal = productToBeRemoved.qty;
                const priceToBeRemovedFromTotal = productToBeRemoved.totalPrice
                let updatedCart = existingCart;
                updatedCart.products.splice(productExistIndex,1)
                if(productToBeRemoved.isChecked){
                    updatedCart.totalProductsCount = updatedCart.totalProductsCount - qtyToBeRemovedFromTotal
                    updatedCart.totalProductsPrice = updatedCart.totalProductsPrice - priceToBeRemovedFromTotal
                }
                
                localStorage.setItem('woo-next-cart', Base64.btoa(JSON.stringify(updatedCart)))
                return updatedCart
            }
        }else{
            const productExistIndex = isProductInCart( existingCart.products, productId);
            // If product exits ( index of that product is found in the array ), update the product qty and totalPRice
            if(-1 < productExistIndex){
                const productToBeRemoved = existingCart.products[productExistIndex];
                const qtyToBeRemovedFromTotal = productToBeRemoved.qty;
                const priceToBeRemovedFromTotal = productToBeRemoved.totalPrice
                let updatedCart = existingCart;
                updatedCart.products.splice(productExistIndex,1)
                updatedCart.totalProductsCount = updatedCart.totalProductsCount - qtyToBeRemovedFromTotal
                updatedCart.totalProductsPrice = updatedCart.totalProductsPrice - priceToBeRemovedFromTotal
                localStorage.setItem('woo-next-cart', Base64.btoa(JSON.stringify(updatedCart)))
                return updatedCart
            }
        }
}
export const priceCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}