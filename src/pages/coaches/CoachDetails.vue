<template>
  <div>
    <div>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </div>
    <div>
      <base-card>
        <header>
          <h2>Interested? Reach Out Now</h2>
          <base-button :link="true" :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </div>
    <div>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    contactLink() {
      const currentPath = this.$route.path;
      // Check if the current path already ends with '/contact'
      if (currentPath.endsWith('/contact')) {
        return currentPath; // Return current path as it is
      } else {
        // Append '/contact' to the current path
        return currentPath + '/contact';
      }
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>
<style scoped></style>
