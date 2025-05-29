<script setup lang="ts">
// Imports
import { useDisplay } from "vuetify";

// ===== Responsive Design =====
// Destructure `smAndDown` to detect screen sizes
const { smAndDown } = useDisplay();

// ===== Reactive States =====
// Current tab model
const model = ref<number>(1);

// Define types for clarity and consistency
interface User {
  id: number;
  username: string;
  email: string;
}

// Default structure for user records
const DEFAULT_RECORD: Omit<User, "id"> = {
  username: "",
  email: "",
};

// Active user record
const record = ref<User | null>(null);

// Dialog visibility state
const dialog = ref<boolean>(false);

// Editing mode state
const isEditing = ref<boolean>(false);

// Current page for pagination
const currentPage = ref(1);

// Number of items displayed per page
const itemsPerPage = 5;

// ===== Tab Configuration =====
// Tabs for left and right sections
const leftTabs = [
  { value: 1, icon: "mdi-account-multiple-outline", label: "Users" },
  { value: 2, icon: "mdi-source-repository-multiple", label: "Repositories" },
  { value: 3, icon: "mdi-source-commit", label: "Commits" },
];

const rightTabs = [
  { value: 4, icon: "mdi-code-json", label: "Swagger" },
  { value: 5, icon: "mdi-github", label: "Source Code" },
];

// ===== User Data =====
// Dummy user data
const users = ref<User[]>([
  { id: 1, username: "user1", email: "user1@example.com" },
  { id: 2, username: "user2", email: "user2@example.com" },
  { id: 3, username: "user3", email: "user3@example.com" },
  { id: 4, username: "user4", email: "user4@example.com" },
  { id: 5, username: "user5", email: "user5@example.com" },
  { id: 6, username: "user6", email: "user6@example.com" },
  { id: 7, username: "user7", email: "user7@example.com" },
  { id: 8, username: "user8", email: "user8@example.com" },
]);

// ===== Computed Properties =====
// Total number of pages
const pageCount = computed(() => Math.ceil(users.value.length / itemsPerPage));

// Paginated users for the current page
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return users.value.slice(start, start + itemsPerPage);
});

// ===== Table Configuration =====
// Table headers
const headers = ref([
  { text: "ID", value: "id", icon: "" },
  { text: "Username", value: "username", icon: "mdi-account-outline" },
  { text: "Email", value: "email", icon: "mdi-email-outline" },
  { text: "Actions", value: "actions", icon: "" },
]);

// ===== Methods =====
/**
 * Open the dialog for adding a new user.
 */
const add = () => {
  isEditing.value = false;
  record.value = { id: Date.now(), ...DEFAULT_RECORD };
  dialog.value = true;
};

/**
 * Open the dialog for editing an existing user.
 * @param id - ID of the user to edit.
 */
const edit = (id: number) => {
  const user = users.value.find((u) => u.id === id);
  if (user) {
    record.value = { ...user };
    isEditing.value = true;
    dialog.value = true;
  }
};

/**
 * Remove a user by their ID.
 * @param id - ID of the user to remove.
 */
const remove = (id: number) => {
  users.value = users.value.filter((user) => user.id !== id);
};

/**
 * Save the current record (add or update).
 */
const save = () => {
  if (!record.value) return;

  if (isEditing.value) {
    // Update an existing user
    const index = users.value.findIndex((u) => u.id === record.value?.id);
    if (index !== -1) {
      users.value[index] = { ...record.value };
    }
  } else {
    // Add a new user
    users.value.push({ ...record.value });
  }

  // Close the dialog
  dialog.value = false;
  record.value = null;
};
</script>

<template>
  <v-container fluid class="pa-0 d-flex flex-column" height="100%">
    <!-- Top Header -->
    <div class="border-b border-grey-lighten-2 py-4 px-4">
      <div class="mx-auto d-flex align-center ga-2" style="max-width: 1320px">
        <v-icon icon="mdi-github" size="x-large"></v-icon>
        <span class="text-h5 font-weight-bold">Mini GitHub Manager</span>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="border-b border-grey-lighten-2 px-4">
      <div class="mx-auto" style="max-width: 1320px">
        <client-only>
          <v-tabs
            v-model="model"
            align-tabs="center"
            active-color="primary"
            base-color="black"
            class="w-100"
          >
            <!-- Left-side tabs with tooltips -->
            <template v-for="tab in leftTabs" :key="tab.value">
              <v-tooltip open-delay="300" location="bottom">
                <template #activator="{ props }">
                  <v-tab
                    v-bind="props"
                    :value="tab.value"
                    :prepend-icon="tab.icon"
                    :text="tab.label"
                    rounded="none"
                    class="py-2 text-body-2 text-black"
                    slider-color="primary"
                  />
                </template>

                <span>{{ tab.label }}</span>
              </v-tooltip>
            </template>

            <v-spacer />

            <!-- Right-side tabs with tooltips -->
            <template v-for="tab in rightTabs" :key="tab.value">
              <v-tooltip open-delay="300" location="top">
                <template #activator="{ props }">
                  <v-tab
                    v-bind="props"
                    :value="tab.value"
                    :prepend-icon="tab.icon"
                    :text="tab.label"
                    rounded="none"
                    class="py-2 text-body-2 text-black"
                    slider-color="primary"
                  />
                </template>
                <span>{{ tab.label }}</span>
              </v-tooltip>
            </template>
          </v-tabs>
        </client-only>
      </div>
    </div>

    <!-- Users Container -->
    <v-sheet class="px-4 mt-6 bg-white">
      <v-container max-width="1320px" class="px-0 py-0 d-flex">
        <v-row class="w-100" align="start" justify="space-between">
          <v-col cols="12" class="d-flex flex-column ga-2">
            <v-sheet
              color="white"
              class="d-flex flex-column border border-grey-lighten-2"
              tile
              rounded
            >
              <!-- Header -->
              <div
                class="d-flex align-center justify-space-between flex-wrap py-4 px-6 border-b border-grey-lighten-2"
              >
                <!-- Title -->
                <div class="d-flex flex-column">
                  <span class="font-weight-bold text-h6">Users</span>
                  <small>List of all the users</small>
                </div>

                <!-- Actions -->
                <div class="d-flex ga-0">
                  <!-- Add user -->
                  <client-only>
                    <v-tooltip open-delay="300" location="bottom">
                      <template #activator="{ props }">
                        <v-btn
                          v-bind="props"
                          variant="outlined"
                          color=""
                          rounded="lg"
                          v-ripple
                          prepend-icon="mdi-account-plus-outline"
                          text="Add user"
                          @click="add"
                        ></v-btn>
                      </template>
                      <span>Add user</span>
                    </v-tooltip>
                  </client-only>
                </div>
              </div>

              <!-- Body -->
              <client-only>
                <v-data-table
                  :headers="headers"
                  :items="paginatedUsers"
                  :mobile="smAndDown"
                  :disable-sort="true"
                  :hide-default-header="smAndDown"
                  hide-default-footer
                  density="compact"
                  class="bg-white w-100 text-caption"
                >
                  <!-- Head Section -->
                  <template
                    v-slot:[`header.${header.value}`]
                    v-for="header in headers"
                    :key="header.value"
                  >
                    <div
                      class="d-flex align-center font-weight-bold"
                      :class="{
                        'pl-2': ['id'].includes(header.value) && !smAndDown,
                        'justify-center': ['actions'].includes(header.value) && !smAndDown,
                      }"
                    >
                      <v-icon v-if="header.icon" size="small" class="mr-2">
                        {{ header.icon }}
                      </v-icon>

                      <span>{{ header.text }}</span>
                    </div>
                  </template>

                  <!-- Body Section -->
                  <!-- ID -->
                  <template v-slot:[`item.id`]="{ item }">
                    <span class="pl-2">{{ item.id }}</span>
                  </template>

                  <!-- Username -->
                  <template v-slot:[`item.username`]="{ item }">
                    <span>{{ item.username }}</span>
                  </template>

                  <!-- Email -->
                  <template v-slot:[`item.email`]="{ item }">
                    <span>{{ item.email }}</span>
                  </template>

                  <!-- Actions -->
                  <template v-slot:[`item.actions`]="{ item }">
                    <!-- Actions -->
                    <div class="d-flex ga-0" :class="smAndDown ? 'justify-end' : 'justify-center'">
                      <!-- Edit -->
                      <client-only>
                        <v-tooltip open-delay="300" location="bottom">
                          <template #activator="{ props }">
                            <v-icon-btn
                              v-bind="props"
                              icon="mdi-pencil-outline"
                              variant="text"
                              color="grey-darken-1"
                              rounded="lg"
                              v-ripple
                              style="width: 40px; height: 40px; scale: 0.8"
                              @click="edit(item.id)"
                            />
                          </template>
                          <span>Edit user</span>
                        </v-tooltip>
                      </client-only>

                      <!-- Delete -->
                      <client-only>
                        <v-tooltip open-delay="300" location="bottom">
                          <template #activator="{ props }">
                            <v-icon-btn
                              v-bind="props"
                              icon="mdi-delete-outline"
                              variant="text"
                              color="grey-darken-1"
                              rounded="lg"
                              v-ripple
                              style="width: 40px; height: 40px; scale: 0.8"
                              @click="remove(item.id)"
                            />
                          </template>
                          <span>Delete user</span>
                        </v-tooltip>
                      </client-only>
                    </div>
                  </template>

                  <!-- Pagination -->
                  <template v-slot:bottom>
                    <v-pagination
                      v-model="currentPage"
                      :length="pageCount"
                      class="mt-4"
                      size="small"
                    />
                  </template>
                </v-data-table>
              </client-only>

              <v-dialog v-model="dialog" max-width="500">
                <v-card
                  :subtitle="`${isEditing ? 'Update' : 'Create'} your favorite book`"
                  :title="`${isEditing ? 'Edit' : 'Add'} a Book`"
                >
                  <template v-slot:text v-if="record">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="record.username" label="Username"></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field v-model="record.email" label="Email"></v-text-field>
                      </v-col>
                    </v-row>
                  </template>

                  <v-divider></v-divider>

                  <v-card-actions class="bg-surface-light">
                    <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

                    <v-spacer></v-spacer>

                    <v-btn text="Save" @click="save"></v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>
