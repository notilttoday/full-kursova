import 'reset.css'
import '@boilerplate/front-end/app/reset.scss'
import { Cart } from '@boilerplate/front-end/components/cart'

export interface CartPageProps {}

const CartPage: React.FC<CartPageProps> = () => <Cart></Cart>

export default CartPage
