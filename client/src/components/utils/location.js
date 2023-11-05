import React from "react";

const Location = () => {
  return (
    <div style={{ width: "100%", display: "flex" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3200.6611602107423!2d-0.2062516261601995!3d5.552941833682807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf90984ba34e99%3A0xe2244cc1bebeab3f!2sAccra%20City%20Hotel!5e1!3m2!1sen!2sgh!4v1696986848573!5m2!1sen!2sgh"
        width="600"
        height="450"
        style={{border:0,width:"100%",minHeight:"650px"}}
        allowfullscreen="true"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Location;
