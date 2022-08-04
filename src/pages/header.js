import React from "react";
import { useEffect, useState } from "react";
import '../css/font-awesome.min.css'
import '../css/linearicons.css'
import '../css/animate.css'
import '../css/owl.carousel.min.css'
import '../css/owl.theme.default.min.css'
import '../css/bootstrap.min.css'
import '../css/bootsnav.css'
import '../css/style.css'
import '../css/responsive.css'
import { useNavigate } from "react-router-dom";
import {Image, NavLink} from 'react-bootstrap';
import { Link } from "react-scroll";
import supabase from "../supabaseClient";
import Swal from 'sweetalert2'

const Header = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("clicked")
        navigate('/checkout', {state: { amount_total: (tableCart.reduce((a,v) => a = a + parseFloat(v.tb_product.productPrice) , 0 )).toFixed(3)}});
    };

    function handleEmail(e) {
        e.preventDefault();
        Swal.fire(
            'Email Sent!',
            'back to home!',
            'success'
        ).then((result) => {
            navigate('/')
            window.location.reload(false);
        })
    }

    function handleAbout(e) {
        e.preventDefault();
        Swal.fire( {
            title: "Hi! This is the official nature-care website made by Team 3. <br>Nature-care is an online shopping destination offering authentic beauty products especially skin care serving women across Indonesia.",
            imageUrl: 'https://i.postimg.cc/DzpH3h2C/team3-profile.jpg',
            imageAlt: 'Custom image',
            resizeMode: 'cover',
            width:800
        })
    }

    const [tableData, setTableData] = useState([])
    const [tableCart, setTableCart] = useState([])
    const [tableArrival, setTableArrival] = useState([])
    const [countCart, setCount] = useState(0);
    const [tablePromo, setTablePromo] = useState([])

    const addCart = async (productId) => {
        console.log(productId)
        supabase
        .from('tb_cart')
        .insert([
            { product_id: productId},
        ]).then(Swal.fire(
            'Complete Add to Cart!',
            'continue shopping?',
            'success'
        ).then((result) => {
            window.location.reload(false);
        }))
    };

    const handleRemoveItem = (id) => {
        supabase
        .from('tb_cart')
        .delete()
        .match({ id: id})
        .then(Swal.fire(
            'Product has been deleted from cart!',
            'reload page',
            'success'
        )
        .then((result) => {
            window.location.reload(false);
        }))
    }

    const btnYellow = {
        color: "white",
        backgroundColor: "#e99c2e",
    };

    console.log(tableData)
    useEffect(() => {
        fetchPosts()    
    },[])

    async function fetchPosts(){
        supabase
        .from('tb_product')
        .select ('*')
        .order('created_at', {ascending: true})
        .limit(3)
        .then(({data}) => setTableData(data))

        supabase
        .from('tb_cart')
        .select (`id, tb_product (id, productName, productPrice, productImage, productPriceBefore, productTitle, productDesc)`)
        .then(({data}) => setTableCart(data))

        supabase
        .from('tb_product')
        .select ('*')
        .then(({data}) => setTableArrival(data))

        const { count } = await supabase
        .from('tb_cart')
        .select('id', {count: 'exact'})
        setCount(count)

        supabase
        .from('tb_promo')
        .select('*')
        .then(({data}) => setTablePromo(data))
    }

    return  (
        <div>             
            <header id="home" className="welcome-hero">
                <div id="header-carousel" className="carousel slide carousel-fade" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#header-carousel" data-slide-to="0" className="active"><span className="small-circle"></span></li>
                        <li data-target="#header-carousel" data-slide-to="1"><span className="small-circle"></span></li>
                        <li data-target="#header-carousel" data-slide-to="2"><span className="small-circle"></span></li>
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        {tableData.map((data, index) => {
                            return index === 0 ? (
                                <div className="item active" key={index}>
                                    <div className="single-slide-item {data.slide}">
                                        <div className="container">
                                            <div className="welcome-hero-content">
                                                <div className="row">
                                                    <div className="col-sm-7">
                                                        <div className="single-welcome-hero">
                                                            <div className="welcome-hero-txt">
                                                                <h4>{data.productTitle}</h4>
                                                                <h2>{data.productName}</h2>
                                                                <p>{data.productDesc}</p>
                                                                <div className="packages-price">
                                                                    <p>
                                                                        Rp{data.productPrice}
                                                                        <del>Rp{data.productPriceBefore}</del>
                                                                    </p>
                                                                </div>
                                                                <button className="btn-cart welcome-add-cart" onClick={() => addCart(data.id)}>
                                                                    <span className="lnr lnr-plus-circle"></span>
                                                                    add <span>to</span> cart
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="single-welcome-hero">
                                                            <div className="welcome-hero-img">
                                                                <Image src={data.productImage} alt="slider image" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="item" key={index}>
                                    <div className="single-slide-item {data.slide}">
                                        <div className="container">
                                            <div className="welcome-hero-content">
                                                <div className="row">
                                                    <div className="col-sm-7">
                                                        <div className="single-welcome-hero">
                                                            <div className="welcome-hero-txt">
                                                                <h4>{data.productTitle}</h4>
                                                                <h2>{data.productName}</h2>
                                                                <p>{data.productDesc}</p>
                                                                <div className="packages-price">
                                                                    <p>
                                                                        Rp{data.productPrice}
                                                                        <del>Rp{data.productPriceBefore}</del>
                                                                    </p>
                                                                </div>
                                                                <button className="btn-cart welcome-add-cart" onClick={() => addCart(data.id)}>
                                                                    <span className="lnr lnr-plus-circle"></span>
                                                                    add <span>to</span> cart
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="single-welcome-hero">
                                                            <div className="welcome-hero-img">
                                                                <Image src={data.productImage} alt="slider image" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })} 
                    </div>
                </div>
                <div className="top-area">
                    <div className="header-area">
                        <nav className="navbar navbar-default bootsnav  navbar-sticky navbar-scrollspy"  data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">
                            <div className="container">          
                                <div className="attr-nav">
                                    <ul>
                                        <li className="dropdown">
                                            <NavLink className="dropdown-toggle" data-toggle="dropdown">
                                                <span className="lnr lnr-cart"></span>
                                                <span className="badge badge-bg-1">{countCart}</span>
                                            </NavLink>
                                            <ul className="dropdown-menu cart-list s-cate">
                                                {tableCart.map((data, index) => {   
                                                    console.log(data)                                          
                                                    return <li className="single-cart-list" key={index}>
                                                        <NavLink className="photo"><Image src={data.tb_product.productImage} className="cart-thumb" alt="image" /></NavLink>
                                                        <div className="cart-list-txt">
                                                            <h6><NavLink>{data.tb_product.productTitle}</NavLink></h6>
                                                            <p>1 x - <span className="price">Rp{data.tb_product.productPrice}</span></p>
                                                        </div>
                                                        <div className="cart-close" onClick={()=>handleRemoveItem(data.id)}>
                                                            <span className="lnr lnr-cross"></span>
                                                        </div>
                                                    </li>                                                     
                                                })
                                                }
                                                
                                                <li className="total">
                                                    <span>Total: Rp{(tableCart.reduce((a,v) =>  a = a + parseFloat(v.tb_product.productPrice) , 0 )).toFixed(3)}</span>
                                                    <button className="btn-cart pull-right" style={btnYellow} onClick={handleClick}>Checkout</button>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>                           
                                
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                                        <i className="fa fa-bars"></i>
                                    </button>
                                    <Link className="navbar-brand" to="home">nature-care</Link>
                                </div>
                                <div className="collapse navbar-collapse menu-ui-design" id="navbar-menu">
                                    <ul className="nav navbar-nav navbar-center" data-in="fadeInDown" data-out="fadeOutUp">
                                        <li><Link activeClass="active" style={{cursor:"pointer"}} smooth spy to="home">Home</Link></li>
                                        <li><Link activeClass="active" style={{cursor:"pointer"}} smooth spy to="new-arrivals">new arrivals</Link></li>
                                        <li><Link activeClass="active" style={{cursor:"pointer"}} smooth spy to="feature">promotions</Link></li>
                                        <li><Link activeClass="active" style={{cursor:"pointer"}} smooth spy to="newsletter">contact</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </header>

            {/* section new arrival */}
            <section id="new-arrivals" className="new-arrivals">
                <div className="container">
                    <div className="section-header">
                        <h2>new arrivals</h2>
                    </div>
                    <div className="new-arrivals-content">
                        <div className="row">
                            {tableArrival.map((data, index) => {
                                return data.isSale === true ? (
                                    <div className="col-md-3 col-sm-4" key={index}>
                                        <div className="single-new-arrival">
                                            <div className="single-new-arrival-bg">
                                                <Image src={data.productImage} alt="new-arrivals images"/>
                                                <div className="single-new-arrival-bg-overlay"></div>
                                                <div className="sale bg-1">
                                                    <p>sale</p>
                                                </div>
                                                <div className="new-arrival-cart" onClick={() => addCart(data.id)}>
                                                    <p>
                                                        <span className="lnr lnr-cart"></span>
                                                        <NavLink>add <span>to </span> cart</NavLink>
                                                    </p>
                                                    <p className="arrival-review pull-right">
                                                    </p>
                                                </div>
                                            </div>
                                            <h4><NavLink><b>{data.productName}</b></NavLink></h4>
                                            <p>{data.productTitle}</p>
                                            <p className="arrival-product-price">Rp{data.productPrice}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-md-3 col-sm-4" key={index}>
                                        <div className="single-new-arrival">
                                            <div className="single-new-arrival-bg">
                                                <Image src={data.productImage} alt="new-arrivals images"/>
                                                <div className="single-new-arrival-bg-overlay"></div>
                                                <div className="new-arrival-cart" onClick={() => addCart(data.id)}>
                                                    <p>
                                                        <span className="lnr lnr-cart"></span>
                                                        <NavLink>add <span>to </span> cart</NavLink>
                                                    </p>
                                                    <p className="arrival-review pull-right">
                                                    </p>
                                                </div>
                                            </div>
                                            <h4><NavLink><b>{data.productName}</b></NavLink></h4>
                                            <p>{data.productTitle}</p>
                                            <p className="arrival-product-price">Rp{data.productPrice}</p>
                                        </div>
                                    </div>
                                );
                            })}                            
                        </div>
                    </div>
                </div>		
            </section>

            {/* section promotions */}
            <section id="feature" className="feature">
			<div className="container">
				<div className="section-header">
					<h2>promotions</h2>
				</div>
				<div className="feature-content">
					<div className="row">
                        {tablePromo.map((data, index) => (
                            <div className="col-sm-3" key={index}>
                                <div className="single-feature" >
                                    <Image src={data.promoImage} alt="feature image"/>
                                    <div className="single-feature-txt text-center">
                                        <h5>{data.promoName}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
					</div>
				</div>
			</div>
		    </section>
            
            {/* section newsletter */}               
            <section id="newsletter"  className="newsletter">
                <div className="container">
                    <div className="hm-footer-details">
                        <div className="row">
                            <div className=" col-md-3 col-sm-6 col-xs-12">
                                <div className="hm-footer-widget">
                                    <div className="hm-foot-title">
                                        <h4>information</h4>
                                    </div>
                                    <div className="hm-foot-para">
                                        {/* <ul> */}
                                            <p onClick={handleAbout}>About Us</p>
                                            <p>Email: help@nature-care.com</p>
                                            {/* <li><NavLink>contact us</NavLink></li>
                                            <li><NavLink>news</NavLink></li>
                                            <li><NavLink>store</NavLink></li>
                                        </ul> */}
                                    </div>
                                </div>
                            </div>
                            <div className=" col-md-3 col-sm-6 col-xs-12">
                                    <div className="hm-footer-widget">
                                    <div className="hm-foot-title">
                                        <h4>Payment Options</h4>
                                        <Image src={require('../img/core-img/payment2.png')} alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-md-3 col-sm-6 col-xs-12">
                            </div>
                            <div className=" col-md-3 col-sm-6  col-xs-12">
                                <div className="hm-footer-widget">
                                    <div className="hm-foot-title">
                                        <h4>newsletter</h4>
                                    </div>
                                    <div className="hm-foot-para">
                                        <p>
                                            Subscribe  to get latest news,update and information.
                                        </p>
                                    </div>
                                    <div className="hm-foot-email">
                                        <div className="foot-email-box">
                                            <input type="text" className="form-control" placeholder="Enter Email Here...."/>
                                        </div>
                                        <div onClick={handleEmail} className="foot-email-subscribe">
                                            <span><i className="fa fa-location-arrow"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* section footer */}
            <footer id="footer"  className="footer">
			<div className="container">
				<div className="hm-footer-copyright text-center">
					<p>
						&copy; 2022 All Rights Reserved - Team3
					</p>
				</div>
			</div>

			{/* <div id="scroll-Top">
				<div className="return-to-top">
					<i className="fa fa-angle-up " id="scroll-top" data-toggle="tooltip" data-placement="top" title="" data-original-title="Back to Top" aria-hidden="true"></i>
				</div>	
			</div>			 */}
            </footer>
        </div>
    )  
}
  
export default Header;