import { bookService } from "../services/book.service.js";

export default {
  template: `
        <section class="add-book">
            <input @input="searchBooks" type="text" placeholder="Add a new book">
            <div v-if="haveResults" class="search-results">
                <div class="book-res d-flex justify-content-between" v-for="book in resBooks">
                    <div class="res-text">{{book.volumeInfo.title}}</div>
                    <button @click="addBook(book)" class="res-btn align-self-center btn btn-warning btn-sm" title="Add book to website.">+</button>
                </div>
            </div>
        </section>
    `,
  methods: {
    searchBooks(ev) {
      var searchKey = ev.target.value;
      
      if (!searchKey) {
        this.resBooks = null;
        this.haveResults = false;
        return;
      }

      var prmBooks = bookService.loadBooks(searchKey);
      prmBooks.then(books => {
        this.haveResults = books ? true : false;
        this.resBooks = books.items
      });
    },
    addBook(book) {
        bookService.addGoogleBook(book)
        eventBus.$emit(SHOW_USER_MSG, { txt: "List filtered.", type: "success", link: book.id });

        // show message book added successfully
    }
  },
  data() {
    return {
      haveResults: false,
      resBooks: null
    };
  }
};
