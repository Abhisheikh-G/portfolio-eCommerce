import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function ProductListScreen({ history, match }) {
  const dispatch = useDispatch();
  const productList = useSelector((st) => st.productList);
  const pageNumber = match.params.pageNumber || 1;
  const { loading, products, error, page, pages } = productList;

  const userLogin = useSelector((st) => st.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((st) => st.productCreate);
  const {
    loading: productCreateLoading,
    success: productCreateSuccess,
    error: productCreateError,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((st) => st.productDelete);
  const {
    loading: productDelLoading,
    success: productDelSuccess,
    message: productDelMessage,
    error: productDelError,
  } = productDelete;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    dispatch(listProducts());

    if (productCreateSuccess) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    productDelete,
    productCreateSuccess,
    createdProduct,
    pageNumber,
  ]);

  const handleDeleteProduct = (product) => {
    if (
      window.confirm(`Are you sure you want to delete product: ${product.name}`)
    ) {
      dispatch(deleteProduct(product._id));
    }
  };

  const handleCreateProduct = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={handleCreateProduct}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {productDelLoading && <Loader />}
      {productDelError && <Message variant="error">{productDelError}</Message>}
      {productDelSuccess && (
        <Message variant="success">{productDelMessage}</Message>
      )}
      {productCreateLoading && <Loader />}
      {productCreateError && (
        <Message variant="error">{productCreateError}</Message>
      )}
      {productCreateSuccess && (
        <Message variant="success">Product successfully created.</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDeleteProduct(product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={userInfo.isAdmin} />
        </>
      )}
    </>
  );
}

export default ProductListScreen;
