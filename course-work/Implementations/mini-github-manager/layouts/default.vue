<script setup lang="ts"></script>

<template>
  <v-app>
    <v-main>
      <slot />
    </v-main>

    <v-footer
      app
      class="flex-column bg-white py-4 text-center text-medium-emphasis"
      style="position: relative"
    >
      <!-- Copyright Section -->
      <v-row class="pt-2 d-flex justify-end align-end text-body-2">
        <v-col class="d-flex ga-1" align="center">
          <v-icon icon="mdi-github" size="small"></v-icon>

          <span>Mini Github Manager © {{ new Date().getFullYear() }}. Всички права запазени.</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
