import { jsx } from "react/jsx-runtime";

export default function NotFound() {
  return DOM.Jsx(
    "div",
    { className: "container" },
    jsx(
      "div",
      { className: "error-content" },
      jsx("h1", {}, "404"),
      jsx("p", {}, "Oops! The page you are looking for does not exist"),
      jsx("Link", { href: "/" }, "Go to Homepage")
    )
  );
}