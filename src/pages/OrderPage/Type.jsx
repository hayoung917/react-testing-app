import React, { useState, useEffect } from "react";
import axios from "axios";
import Products from "./Products";
import ErrorBanner from "../../component/ErrorBanner";
import Options from "./Options";

function Type({ orderType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType) => {
    try {
      let response = await axios.get(`http://localhost:4000/${orderType}`);
      setItems(response.data);
    } catch (error) {
      setError(true);
    }
  };

  const ItemComponents = orderType === "products" ? Products : Options;

  const optionItems = items.map((item) => (
    <ItemComponents
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  return <div>{optionItems}</div>;
}

export default Type;
