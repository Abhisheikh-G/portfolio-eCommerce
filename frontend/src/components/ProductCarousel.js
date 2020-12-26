import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

function ProductCarousel() {
  const dispatch = useDispatch();

  const productTopRated = useSelector((st) => st.productTopRated);
  const { loading, products, error } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <div style={{ padding: "1rem", margin: "auto" }}>
        <Carousel pause="hover" indicators={false}>
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
              </Link>
              <Link to={`/product/${product._id}`}>
                <h2 className="custom-caption">
                  {product.name} <br /> Available now for only ${product.price}
                </h2>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default ProductCarousel;
