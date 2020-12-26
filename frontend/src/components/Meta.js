import React from "react";
import { Helmet } from "react-helmet";
function Meta({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: "Welcome To ProShop",
  keywords: "Electronics, cheap electronics, cameras, gaming consoles",
  description: "We sell the best electronics for the lowest price.",
};

export default Meta;
