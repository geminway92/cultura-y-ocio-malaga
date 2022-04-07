<template>
  <button
    @click="openSearchModal"
    class="container-search"
    data-testid="lupa-icon"
  >
    <span class="fas fa-search"></span>
  </button>
  <div class="container-img-logout">
    <div v-if="this.toggleInputBoolean" class="container-form">
      <form class="search-input">
        <input
          placeholder="Escribe el nombre del evento"
          type="search"
          v-model="this.textSearch"
        />
      </form>
      <!-- Modal for search Events -->
      <ListEventsModal
        class="listEventModal"
        :openModalSearch="openModalSearch"
        :eventFilter="eventFilter"
        :searchEventFilter="searchEventFilter"
      />
    </div>

    <img :src="user.profilePicture" alt="Foto perfil" />
    <button @click="onLogout" class="container-logout">
      <span class="fas fa-sign-out-alt"></span>
    </button>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions } from "vuex";

export default {
  emits: ["toggleInputSearch"],
  components: {
    ListEventsModal: defineAsyncComponent(() =>
      import("../components/ListEventsModal.vue")
    ),
  },
  data() {
    return {
      textSearch: "",
      openModalSearch: false,
      eventFilter: [],
    };
  },
  props: {
    searchEvent: {
      type: Boolean,
    },
    user: {
      type: Object,
    },
    toggleInputBoolean: {
      type: Boolean,
    },
    events: {
      type: Object,
    },
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    ...mapActions("event", ["resetState"]),

    openSearchModal() {
      this.$emit("toggleInputSearch");
      if (this.searchEvent) {
        if (this.openModalSearch && !this.searchEvent) {
          this.toggleModalSearch = true;
        } else {
          this.textInput = "";
        }
      } else {
        this.textInput = "";
      }
    },

    onLogout() {
      this.logout();
      this.resetState();
      this.$router.push({ name: "login" });
    },
  },

  computed: {
    searchEventFilter() {
      if (this.textSearch.length >= 1) {
        this.openModalSearch = true;
        const eventArray = Object.values(this.events); //* Convert to array to remove id

        this.eventFilter = eventArray.filter((e) =>
          e.name.toLowerCase().includes(this.textSearch.toLocaleLowerCase())
        );
      } else if (this.textSearch == 0) {
        this.openModalSearch = false;
        return (this.eventFilter = []);
      }

      return this.eventFilter;
    },
  },
};
</script>

<style scoped>
span {
  font-size: 1.3em;
}

button {
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

img {
  width: 40px;
  object-fit: cover;
  border-radius: 100%;
}

.container-form {
  display: flex;
  min-width: 300px;
  flex-direction: column;
  align-items: center;
  position: absolute;
}

.container-search,
.container-logout {
  background-color: #f3f3f4;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.container-search {
  margin-left: 0.5em;
}

.container-logout {
  margin-right: 0.5em;
}

.search-input {
  display: flex;
  height: 40px;
}

.search-input input {
  min-width: 300px;
  border-radius: 5px;
  border: 2px solid #a4a3a1;
  padding: 0.5em;
}

.search-input input:focus {
  outline: 1px solid #b128c3;
}

.container-img-logout {
  display: flex;
  width: 53%;
  justify-content: space-between;
}

@media screen and (min-width: 320px) {
  .container-form {
    top: 3.1em;
    left: 0;
    right: 0;
  }

  .search-input {
    width: 100%;
    left: 0;
    right: 0;
  }

  .search-input input {
    width: 100%;
    border-radius: 5px;
    border: 2px solid #a4a3a1;
    padding: 0.5em;
  }
}

@media screen and (min-width: 620px) {
  .container-form {
    top: 3.1em;
    width: 50%;
    left: 0.5em;
    background: red;
  }

  .search-input input {
    width: 100%;
    border-radius: 5px;
    border: 2px solid #a4a3a1;
    padding: 0.5em;
  }
}

@media screen and (min-width: 1800px) {
  span {
    font-size: 2em;
  }

  img {
    width: 60px;
  }

  .container-search,
  .container-logout {
    width: 50px;
    height: 50px;
  }
}
</style>
