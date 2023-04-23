import React from "react";

function NotFound() {
  return (
    <div className="wrapper">
      <h1 id="animation">404</h1>
      <p>Page not found</p>
          <style>
            {`
              body {
                background-color: #f9f9f9;
                font-family: Arial, sans-serif;
              }

              .wrapper {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
              }

              #animation {
                font-size: 60px;
                margin-bottom: 50px;
                display: inline-block;
                position: relative;
                animation-name: draw;
                animation-duration: 2s;
                animation-timing-function: ease;
                animation-fill-mode: forwards;
              }

              @keyframes draw {
                from {
                  width: 0;
                }
                to {
                  width: 220px;
                  text-align: center;
                }
              }

              p {
                margin: 0;
                font-size: 30px;
                text-align: center;
              }
            `}
          </style>
          </div>

  );
}

export default NotFound;
