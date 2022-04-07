<template>
  <div class="eventlayout">
    <!-- Modal de event -->
    <EventModal
      @openModal="openModal"
      :openModalIsTrue="openModalIsTrue"
      :eventForModal="eventForModal"
    />

    <!-- Modal Create event -->
    <CreateEventModal
      v-if="showCreateModal"
      @openModalCreateEvent="openModalCreateEvent"
      :showCreateModal="showCreateModal"
      @createNewEvent="createNewEvent"
    />

    <!-- Modal Ver Evento del mes -->
    <ModalNameRegister
      v-if="modalNameIsTrue"
      @openModalName="openModalName"
      :modalNameIsTrue="modalNameIsTrue"
      :nameRegister="nameRegister"
      :events="events"
    />
    <!-- Header -->
    <div class="container-header">
      <Navbar
        :user="user"
        :events="events"
        @toggleInputSearch="toggleInputSearch"
        :toggleInputBoolean="toggleInputBoolean"
      />
    </div>

    <!-- Slider -->
    <div class="container-slider">
      <h2 class="title">
        Próximos Eventos en <span class="purple">{{ monthLetter }}</span>
      </h2>
      <CurrentEvent
        @openModal="openModal"
        @openModalName="openModalName"
        :modalNameIsTrue="modalNameIsTrue"
        :filterMonthEvent="filterMonthEvent"
        :currentEmail="currentEmail"
      />
    </div>
    <!-- Slider  -->
    <div class="container-slider">
      <h2 class="title">Eventos Populares</h2>
      <CurrentEvent
        @openModal="openModal"
        @openModalName="openModalName"
        :modalNameIsTrue="modalNameIsTrue"
        :filterMonthEvent="filterPopularEvent"
        :monthLetter="monthLetter"
        :currentEmail="currentEmail"
        :styleBackground="styleBackground"
      />
    </div>

    <div class="container-bar">
      <BarBotton
        @openModalCreateEvent="openModalCreateEvent"
        :showCreateModal="showCreateModal"
        :userLogin="user"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { defineAsyncComponent } from "vue";
import getDayMonthYear from "../helpers/getMonthYear";
import Swal from "sweetalert2";

export default {
  name: "eventlayout",
  components: {
    CurrentEvent: defineAsyncComponent(() =>
      import("../components/CurrentEvent.vue")
    ),
    BarBotton: defineAsyncComponent(() =>
      import("../components/BarBotton.vue")
    ),
    EventModal: defineAsyncComponent(() =>
      import("../components/EventModal.vue")
    ),
    CreateEventModal: defineAsyncComponent(() =>
      import("../components/CreateEventModal.vue")
    ),
    ModalNameRegister: defineAsyncComponent(() =>
      import("../components/ModalNameRegister.vue")
    ),
    ListEventsModal: defineAsyncComponent(() =>
      import("../components/ListEventsModal.vue")
    ),
    Navbar: defineAsyncComponent(() => import("../components/Navbar.vue")),
  },

  data() {
    return {
      openModalIsTrue: false,
      eventForModal: null,
      showCreateModal: false,
      filterMonthEvent: [],
      currentMonth: null,
      monthLetter: null,
      newEvent: null,
      filterPopularEvent: [],
      modalNameIsTrue: false,
      nameRegister: null,
      myEvents: [],
      currentEmail: "",
      styleBackground: {
        backgroundColor: "#fffdea",
      },
      textSearch: "",
      toggleInputBoolean: false,
    };
  },

  methods: {
    ...mapActions("event", [
      "loadEventAction",
      "loadEventUser",
      "loadEventAnonimous",
      "updateEventAnonimous",
    ]),

    openModal(event) {
      this.openModalIsTrue = !this.openModalIsTrue;
      this.eventForModal = event;
    },

    openModalCreateEvent() {
      this.showCreateModal = !this.showCreateModal;
    },

    async createNewEvent(events) {
      this.newEvent = events;
      const { ok, message } = await this.$store.dispatch(
        "event/createEvent",
        this.newEvent
      );

      if (ok) {
        Swal.fire({
          icon: "success",
          title: message,
          confirmButtonColor: "#B128C3",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: message,
          confirmButtonColor: "#B128C3",
        });
      }

      this.loadEvents();
    },

    month() {
      const { monthCurrent, year, month } = getDayMonthYear();
      this.monthLetter = month;

      this.currentMonth = `${year}-${
        monthCurrent.toString().length < 2 ? "0" + monthCurrent : monthCurrent
      }`;
    },

    async loadEvents() {
      await this.loadEventAction();

      this.month();

      this.filterForCurrentMonth();
    },

    filterForCurrentMonth() {
      if (this.events === null) {
        return;
      }
      const eventArray = Object.values(
        this.events
      ); /* Los paso array para eliminar el idToken que crea firebase */

      this.filterMonthEvent = eventArray.filter((e) =>
        e.date.includes(this.currentMonth)
      );
      this.sortEvents(this.filterMonthEvent);
    },

    sortEvents(event) {
      /* Buscar los que tienen más de 0 joined */
      const filterEventJoined = event.filter((e) => e.joined > 0);
      if (filterEventJoined.length > 0) {
        this.filterPopularEvent = filterEventJoined.sort(
          (a, b) => b.joined - a.joined
        );
        this.filterPopularEvent =
          filterEventJoined.length > 2
            ? this.filterPopularEvent.splice(0, 2)
            : this.filterPopularEvent;
      }
    },

    openModalName(name) {
      this.modalNameIsTrue = !this.modalNameIsTrue;
      this.nameRegister = name;
    },
    toggleInputSearch() {
      this.toggleInputBoolean = !this.toggleInputBoolean;
      console.log("ha entrado");
    },

    async loadEventFirebase() {
      if (this.eventRegister.length === 0) {
        if (this.user.email === undefined) {
          this.checkLocalStorage();
          return;
        }

        await this.loadEventUser(this.currentEmail);
      }
    },
    checkLocalStorage() {
      if (localStorage.getItem("myEvents") != null) {
        const eventsLocalStorage = JSON.parse(localStorage.getItem("myEvents"));
        return this.loadEventAnonimous(eventsLocalStorage);
      }
    },

    currentEmailUser() {
      if (this.user === null) {
        this.currentEmail = localStorage.getItem("currentUser");
      } else {
        const emailSplit = this.user.email.split("@").shift();
        localStorage.setItem("currentUser", emailSplit);
        this.currentEmail = emailSplit;
        this.loadEventFirebase();
      }
    },
  },

  created() {
    this.loadEvents();
    this.currentEmailUser();
  },

  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("event", ["events", "eventRegister"]),
  },
};
</script>

<style scoped>
.purple {
  color: #b128c3;
}
.title {
  font-size: 1.5em;
}

.eventlayout {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.container-header {
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: space-between;
  padding: 0.3em 0;
  z-index: 3;
  position: relative;
}

.container-slider {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.container-bar {
  width: 100%;
  height: min-content;
}

@media screen and (min-width: 1800px) {
  .container-header {
    height: 70px;
  }
}
</style>
