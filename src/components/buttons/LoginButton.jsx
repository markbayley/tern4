import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import "./buttons.scss";

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function LoginButton() {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <>
      <Button
        style={{ borderRadius: "10px" }}
        color="login"
        size="md"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        <span style={{ paddingRight: "5px" }}>
          <i className="fa fa-user"> </i>
        </span>
        {isLoading ? "Loading" : "Login"}
      </Button>
    </>
  );
}

export default LoginButton;
