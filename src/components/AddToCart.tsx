import React, {useState} from 'react'
import styled from 'styled-components'
import {FaCheck} from 'react-icons/fa'
import {product} from '../types'
import {useCartContext} from '../context/CartContext'
import AmountButtons from './AmountButtons'
import {Link} from 'react-router-dom'
import {ACTIONS} from '../constants/Actions'

const AddToCart: React.FC<{product?: product}> = ({product}) => {
  const {id, stock, colors} = product!
  const {dispatch} = useCartContext()
  const [mainColor, setMainColor] = useState(colors[0])
  const [quantity, setQuantity] = useState<number>(1)

  const addToCartHandler = (
    id: string,
    color: string,
    amount: number,
    product?: product,
  ) => {
    dispatch({type: ACTIONS.ADD_TO_CART, payload: {id, color, amount, product}})
  }

  const increase = () => {
    setQuantity(oldAmount => {
      let tempQuantity = oldAmount + 1
      if (tempQuantity > stock) {
        tempQuantity = stock
      }
      return tempQuantity
    })
  }
  const decrease = () => {
    setQuantity(oldAmount => {
      let tempQuantity = oldAmount - 1
      if (tempQuantity < 1) {
        tempQuantity = 1
      }
      return tempQuantity
    })
  }

  return (
    <Wrapper>
      <div className="colors">
        <span>colors: </span>
        <div>
          {colors.map((color: string, index: number) => (
            <button
              key={index}
              style={{background: color}}
              className={`${
                mainColor === color ? 'color-btn active' : 'color-btn'
              }`}
              onClick={() => setMainColor(color)}
            >
              {mainColor === color && <FaCheck />}
            </button>
          ))}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          quantity={quantity}
          increaseHandler={increase}
          decreaseHandler={decrease}
        />
        <Link
          to="/cart"
          className="btn"
          onClick={() => addToCartHandler(id, mainColor, quantity, product)}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
