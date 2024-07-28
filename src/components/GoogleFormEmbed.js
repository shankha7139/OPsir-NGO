import React from "react";

const GoogleFormEmbed = ({ src, width = "640", height = "640" }) => {
  return (
    <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLScVo0-9ILs8rXTtbxYdC5YpuF80A7BoU6Uz1kaWJG_MOo7Reg/viewform?embedded=true"
      width="640"
      height="382"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
    >
      Loading…
    </iframe>
  );
};

export default GoogleFormEmbed;
