import React,{Component} from 'react'
import { AppContext,AppProvide } from '../../components/Context/AppContext'
import { addFirstProduct,updateCart } from '../../services/function'
import Base64 from '../Base64'
class AddtocartButton extends Component {
    static contextType = AppContext
    constructor(props){
        super(props)
    }
    handleAddToCartClick = () => {
        const {product,price,variation,qty} = this.props
        const [cart , setCart] = this.context
        if(process.browser){
            let encode = localStorage.getItem('woo-next-cart')
            if(encode){
                //Update Item
                let existingCart= Base64.atob(encode);
                existingCart = JSON.parse(existingCart)
                const qtyToBeAdded = parseInt(qty)
                const updatedCart = updateCart(existingCart, product,qtyToBeAdded,variation,false,'',{stockQuantity:99})
                console.log(variation)
                setCart( updatedCart )
                if(variation != undefined){
                    this.props.alertItemsAddtoCart(variation.name + " x" +qtyToBeAdded)
                }else{
                    this.props.alertItemsAddtoCart(product.name + " x" +qtyToBeAdded)
                }
                
            }else{
                //Add Item
                const qtyToBeAdded = parseInt(qty)
                const newCart = addFirstProduct(product,price,product.__typename,variation,qtyToBeAdded,{stockQuantity:99})
                setCart( newCart )
                if(variation != undefined){
                    this.props.alertItemsAddtoCart(variation.name + " x" +qtyToBeAdded)
                }else{
                    this.props.alertItemsAddtoCart(product.name + " x" +qtyToBeAdded)
                }
            }
         }
    }
    render(){
        return(
            <button onClick={this.handleAddToCartClick} className="btn-add_to_cart">
                Add to cart
            </button>
        )
    }
}
export default AddtocartButton