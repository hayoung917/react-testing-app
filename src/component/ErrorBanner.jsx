import React from "react";

export default function ErrorBanner({ message }) {
  return (
    <div
      data-testid="error-banner"
      style={{ backgroundColor: "red", color: "white" }}
    >
      {message}
    </div>
  );
}
