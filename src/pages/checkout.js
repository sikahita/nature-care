import {useState} from "react";
import '../css/core-style.css'
import { Image } from "react-bootstrap";
import Swal from 'sweetalert2'
import { useNavigate, useLocation } from 'react-router';

export default function Checkout() {
    
    const [checked, setChecked] = useState(true);
    const {state} = useLocation()

    const {amount_total} = state;

    const handleChange = () => {
      setChecked(!checked);
    };

    const navigate = useNavigate();

    const handleClick = () => {
      console.log("cliked")
      navigate("/");
      window.location.reload(false);
    };
    
    function handleSubmit(e) {
        e.preventDefault();
        Swal.fire(
            'Transaction Complete!',
            'back to home!',
            'success'
        ).then((result) => {
            navigate('/')
            window.location.reload(false);
        })
    }

    const btnYellow = {
        color: "white",
        backgroundColor: "#e99c2e",
        marginBottom:"10px"
    };
    
    return(
        <div className="main-content-wrapper d-flex clearfix">
            <div className="cart-table-area section-padding-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <div className="checkout_details_area mt-50 clearfix">
                                <button className="btn" style={btnYellow} onClick={handleClick}>Back</button>
                                <div className="cart-title">
                                    <h2>Checkout</h2>
                                </div>
                                <form>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <input type="text" className="form-control" id="first_name" placeholder="First Name" required/>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input type="text" className="form-control" id="last_name" placeholder="Last Name" required/>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <input type="text" className="form-control" id="company" placeholder="Company Name"/>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <input type="email" className="form-control" id="email" placeholder="Email"/>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <input type="text" className="form-control mb-3" id="street_address" placeholder="Address"/>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <input type="text" className="form-control" id="city" placeholder="Town" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input type="text" className="form-control" id="zipCode" placeholder="Zip Code" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input type="number" className="form-control" id="phone_number" min="0" placeholder="Phone No" />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <textarea name="comment" className="form-control w-100" id="comment" cols="30" rows="10" placeholder="Leave a comment about your order"></textarea>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="cart-summary">
                                <h5>Cart Total</h5>
                                <ul className="summary-table">
                                    <li><span>subtotal:</span> <span>Rp{amount_total}</span></li>
                                    <li><span>delivery:</span> <span>Free</span></li>
                                    <li><span>total:</span> <span>Rp{amount_total}</span></li>
                                </ul>

                                <div className="payment-method">
                                    <div className="custom-control custom-checkbox mr-sm-2">
                                        <input 
                                        type="checkbox" 
                                        className="custom-control-input"
                                        checked={checked}
                                        onChange={handleChange}
                                        id="cod"/>
                                        <label className="custom-control-label">Cash on Delivery</label>
                                    </div>
                                    <div className="custom-control custom-checkbox mr-sm-2">
                                        <input 
                                        type="checkbox" 
                                        className="custom-control-input"
                                        checked={!checked}
                                        onChange={handleChange}
                                        id="paypal"/>
                                        <label className="custom-control-label">Paypal <Image className="ml-15" src={require('../img/core-img/paypal.png')} alt=""/></label>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="cart-btn mt-100">
                                        <button type="submit" href="#" className="btn-cart welcome-add-cart w-100">Pay</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// export default Checkout()