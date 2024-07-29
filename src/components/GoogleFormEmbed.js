import React from "react";

const GoogleFormEmbed = ({ src }) => {
  return (
    <iframe
      src={src}
      width="100%"
      height="100%"
      style={{ minHeight: "80vh" }}
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
    >
      Loading…
    </iframe>
  );
};

export default GoogleFormEmbed;