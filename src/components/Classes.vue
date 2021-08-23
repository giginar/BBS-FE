<template>
  <div class="vue-template">
    <div class="pizzas">
      <div>
        <div class="search-box">
          <input
            type="text"
            class="search-bar"
            placeholder="Search..."
            v-model="query"
            @keypress="fetchPizza"
          />
        </div>
        <div v-if="is_loading">
          <b-button variant="primary" disabled>
            <b-spinner small type="grow"></b-spinner>
            Loading...
          </b-button>
        </div>
        <div class= "cards" v-for="p in this.pizzas" :key="p.id">
          <b-card no-body class="overflow-hidden" style="max-width: 540px">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img
                  :src="p.image"
                  alt="Image"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body :title="p.name">
                  <b-card-text>
                    Name: {{ p.name }}<br />
                    Price: {{ p.price }} TRY<br />
                    Ingredients:
                    <ul id="ingredients">
                      <li v-for="p in p.ingredients" :key="p.id">
                        {{ p }}
                      </li>
                    </ul>
                  </b-card-text>
                  <b-button @click="showMessage" class="btn btn-primary" type="submit">Order</b-button>
                  <b-modal v-model="modalShow"> Your order is on the way to your address!</b-modal>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import axios from 'axios';

export default {
  name: 'Pizzas',
  data() {
    return {
      query: '',
      pizzas: [],
      is_loading: false,
      modalShow: false
    };
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  components: {},
  created() {
    this.is_loading = true;
    this.fetchAllPizzas();
  },
  methods: {
    /**
     * this method used for searching the pizzas.
     */
    async fetchPizza(e) {
      if (e.key == 'Enter') {
        this.is_loading = true;
        this.pizzas = [];
        if (this.query != '') {
          await axios
            .get(`http://localhost:9002/pizzas/all/ingredients/${this.query}`)
            .then((response) => (this.pizzas = response.data));
          this.is_loading = false;
        } else {
          this.fetchAllPizzas();
        }
      }
    },
    /**
     * This method gets all the pizzas from the database using BE.
     */
    async fetchAllPizzas() {
      UserService.getPublicContent().then(
        (response) => (this.pizzas = response.data)
      );
      this.is_loading = false;
    },
    showMessage() {
      this.modalShow = !this.modalShow;
    }
  },
};
</script>

<style scoped>

.body {
    background: #2554FF !important;
    min-height: 100vh;
    display: flex;
    font-weight: 400;
  }

.cards {
  border-color: black;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

</style>

