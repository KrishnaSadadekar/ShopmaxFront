import { useEffect } from "react";
import Product from "../Components/Product";

import { AllProducts } from "../Service/Service";
import { useProductContext } from "../Components/ProductContext";
import DIrection from "../Components/DIrection";
function Shop() {

  const { state, dispatch } = useProductContext();  // Call the hook as a function
  useEffect(() => {
    // Fetch products and set initial state (for simplicity, using a static list here)
    const fetchProducts = async () => {

      const products = await AllProducts();
      dispatch({ type: 'SET_PRODUCTS', payload: products });
    };
    fetchProducts();
  }, [dispatch]);

  const filterByCategory = (category) => {
    dispatch({ type: 'FILTER_BY_CATEGORY', payload: category });
    console.log(state.filteredProducts);
  };

  return (

    <div className="container">
      <DIrection title={"Shop"} />
      <div className="row">
        <div className="col-md-9">
          <section id="products" className="products">
            <div className="container aos-init aos-animate" data-aos="fade-up">
              <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
                {
                  state.filteredProducts.map((item) => (
                    <Product key={item.id} Product={item} />
                  ))
                }
              </div>
            </div>
          </section>
        </div>
        <div className="col-md-3">
          <div className="sticky-container">
            <div className="mt-4 order-2 mb-5 mb-md-0">
              <div className="border p-4 rounded mb-4">
                <h3 className="mb-3 h6 text-uppercase text-black d-block">Categories</h3>
                <ul className="list-unstyled mb-0">
                  <li className="mb-1"><div className="clickable-div d-flex" onClick={() => filterByCategory('All')}>All</div></li>
                  <li className="mb-1"><div className="clickable-div d-flex" onClick={() => filterByCategory('men')}>Men</div></li>
                  <li className="mb-1"><div className="clickable-div d-flex" onClick={() => filterByCategory('women')}>Women</div></li>

                </ul>
              </div>

              <div className="border p-4 rounded mb-4 image-container">
                <img
                  src={`./images/women.jpg`}
                  alt={Product.product_name}
                  className="img-fluid"
                />
                <div className="overlay">
                  <p>SHOPMAX!</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
