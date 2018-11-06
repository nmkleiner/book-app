"use strict";
import bookApp from "./pages/book-app.cmp.js";
import bookDetails from "./pages/book-details.cmp.js";
import homePage from "./pages/home-page.cmp.js";
import about from "./pages/about-page.cmp.js";

const routes = [
  { path: "/books", component: bookApp },
  { path: "/book/:bookId", component: bookDetails },
  { path: "/", component: homePage },
  { path: "/about", component: about }
];

export default routes;
