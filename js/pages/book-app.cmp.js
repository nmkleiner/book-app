import bookList from "../cmps/book-list.cmp.js";
import bookFilter from "../cmps/book-filter.cmp.js";
import bookDetails from "./book-details.cmp.js";
import addBook from "../cmps/add-book.cmp.js";

import { bookService } from "../services/book.service.js";

export default {
  template: `
    <section class="book-app">
      <button v-if="!isFilterOpen" class="btn btn-success" @click="isFilterOpen = !isFilterOpen">Filter the list</button>
      <book-filter v-if="!isBookSelected && isFilterOpen" v-on:filtered="setFilter" @close-filter="isFilterOpen = !isFilterOpen"></book-filter> 
      <add-book></add-book>
      <book-list v-if="!isBookSelected" v-bind:books="booksToShow" v-on:selected="selectBook"></book-list> 
      <book-details @go-back="goBack" v-if="isBookSelected" v-bind:book="selectedBook"></book-details>
        <!-- <footer v-if="!isBookSelected">Didn't find your book? Email me at <a>shubi@dubi.com</a></footer> -->
    </section>
    `,
  data() {
    return {
      books: null,
      isBookSelected: false,
      filter: {
        byTitle: "",
        minPrice: 0,
        maxPrice: Infinity
      },
      selectedBook: null,
      isFilterOpen: false
    };
  },
  computed: {
    booksToShow() {
      if (
        !this.filter.byTitle &&
        this.filter.maxPrice === Infinity &&
        !this.filter.minPrice
      )
        return this.books;
      return this.books
        .filter(book => book.listPrice.amount < this.filter.maxPrice)
        .filter(book => book.listPrice.amount > this.filter.minPrice)
        .filter(book => book.title.includes(this.filter.byTitle));
    },
    carsForDisplay() {
      if (!this.filter) return this.cars;
      return this.cars
        .filter(car => car.vendor.includes(this.filter.byVendor))
        .filter(
          car => !this.filter.maxPrice || car.price < this.filter.maxPrice
        );
    }
  },
  created() {
    var books = bookService.query();
    books.then(books => {
      this.books = books;
    });
  },
  methods: {
    selectBook(bookId) {
      this.isBookSelected = true;
      this.selectedBook = bookService.getBookById(bookId);
      document.querySelector("#app").scrollIntoView();
    },
    setFilter(filter) {
      if (!filter.minPrice) filter.minPrice = 0;
      if (!filter.maxPrice) filter.maxPrice = Infinity;
      this.filter.minPrice = filter.minPrice;
      this.filter.maxPrice = filter.maxPrice;
      this.filter.byTitle = filter.byTitle;
    },
    goBack() {
      this.isBookSelected = false;
    }
  },
  components: {
    bookList,
    bookFilter,
    bookDetails,
    addBook
  }
};
