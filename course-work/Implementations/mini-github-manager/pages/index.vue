<script setup lang="ts">
// Imports
import { useDisplay } from "vuetify";
import type { VForm } from "vuetify/components";

// ===== Responsive Design =====
// Destructure `smAndDown` to detect screen sizes
const { smAndDown } = useDisplay();

// ===== Reactive States =====
const tab = ref<number>(1);

// ===== Tab Configuration =====
// Tabs for left and right sections
const leftTabs = [
  { value: 1, icon: "mdi-account-multiple-outline", label: "Users" },
  { value: 2, icon: "mdi-source-repository-multiple", label: "Repositories" },
  { value: 3, icon: "mdi-source-commit", label: "Commits" },
];

const rightTabs = [
  {
    icon: "mdi-code-json",
    label: "Swagger",
    link: "https://example.com/swagger",
  },
  {
    icon: "mdi-github",
    label: "Source Code",
    link: "https://github.com/JustAlex-WebDev/distributed-applications-se/tree/master/course-work/Implementations/mini-github-manager",
  },
];

// Number of items displayed per page
const itemsPerPage = 5;

// Editing mode state
const isEditing = ref<boolean>(false);

// Fake loading state
const isLoading = ref<boolean>(true);

// User Logic
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

// Current page for pagination
const currentPage = ref(1);

// ===== User Data =====
const userForm = ref<VForm | null>(null);

// Dummy user data
const users = ref<User[]>([
  { id: 1748537979756, username: "john_doe", email: "john.doe@example.com" },
  { id: 1748537979757, username: "jane_smith", email: "jane.smith@example.com" },
  { id: 1748537979758, username: "alice_brown", email: "alice.brown@example.com" },
  { id: 1748537979759, username: "bob_white", email: "bob.white@example.com" },
  { id: 1748537979760, username: "charlie_gray", email: "charlie.gray@example.com" },
  { id: 1748537979761, username: "david_black", email: "david.black@example.com" },
  { id: 1748537979762, username: "emma_green", email: "emma.green@example.com" },
  { id: 1748537979763, username: "frank_blue", email: "frank.blue@example.com" },
]);

// ===== Table Configuration =====
// Table headers
const headers = ref([
  { text: "ID", value: "id", icon: "", sortable: true },
  { text: "Username", value: "username", icon: "mdi-account-outline" },
  { text: "Email", value: "email", icon: "mdi-email-outline" },
  { text: "Actions", value: "actions", icon: "" },
]);

// Repository Logic
// Define types for clarity and consistency
interface Repository {
  id: number;
  name: string;
  description: string;
  user_id: number | null;
}

// Default structure for user records
const DEFAULT_REPOSITORY_RECORD: Omit<Repository, "id"> = {
  name: "",
  description: "",
  user_id: null,
};

// Active repo record
const repositoryRecord = ref<Repository | null>(null);

// Dialog visibility state
const repositoryDialog = ref<boolean>(false);

// Current page for pagination
const currentRepositoryPage = ref(1);

// ===== Computed Properties =====
// Total number of pages
const pageCount = computed(() => Math.ceil(users.value.length / itemsPerPage));

// Paginated users for the current page
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return users.value.slice(start, start + itemsPerPage);
});

// ===== Methods =====
/**
 * Open the dialog for adding a new user.
 */
const add = () => {
  isEditing.value = false;
  record.value = {
    id: Date.now(),
    ...DEFAULT_RECORD,
  };
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
const save = async () => {
  const isValid = await userForm.value?.validate();
  if (!isValid?.valid || !record.value) return;

  if (isEditing.value) {
    const index = users.value.findIndex((u) => u.id === record.value!.id);
    if (index !== -1) {
      users.value[index] = { ...record.value };
    }
  } else {
    users.value.push({ ...record.value });
  }

  dialog.value = false;
  record.value = null;
};

// ===== Repositories Data =====
const repositoryForm = ref<VForm | null>(null);

// Dummy repositories data
const repositories = ref<Repository[]>([
  {
    id: 1748537989756,
    name: "project_alpha",
    description: "Initial commit of Project Alpha",
    user_id: 1748537979756,
  },
  {
    id: 1748537989757,
    name: "website_beta",
    description: "Website Beta development",
    user_id: 1748537979757,
  },
  {
    id: 1748537989758,
    name: "api_gamma",
    description: "API Gamma service",
    user_id: 1748537979758,
  },
  {
    id: 1748537989759,
    name: "mobile_delta",
    description: "Mobile Delta application",
    user_id: 1748537979759,
  },
  {
    id: 1748537989760,
    name: "library_epsilon",
    description: "Reusable Library Epsilon",
    user_id: 1748537979760,
  },
  {
    id: 1748537989761,
    name: "toolset_zeta",
    description: "Zeta toolset utilities",
    user_id: 1748537979761,
  },
  {
    id: 1748537989762,
    name: "framework_eta",
    description: "Development framework Eta",
    user_id: 1748537979762,
  },
  {
    id: 1748537989763,
    name: "cms_theta",
    description: "Content Management System Theta",
    user_id: 1748537979763,
  },
]);

// ===== Table Configuration =====
// Table headers
const repositoriesHeaders = ref([
  { text: "ID", value: "id", icon: "", sortable: true },
  { text: "Name", value: "name", icon: "" },
  { text: "Description", value: "description", icon: "" },
  { text: "User ID", value: "user_id", icon: "" },
  { text: "Actions", value: "actions", icon: "" },
]);

// ===== Computed Properties =====
// Total number of pages
const repositoriesPageCount = computed(() => Math.ceil(repositories.value.length / itemsPerPage));

// Paginated repositories for the current page
const paginatedRepositories = computed(() => {
  const start = (currentRepositoryPage.value - 1) * itemsPerPage;
  return repositories.value.slice(start, start + itemsPerPage);
});

// ===== Methods =====
/**
 * Open the dialog for adding a new user.
 */
const addRepository = () => {
  isEditing.value = false;
  repositoryRecord.value = { id: Date.now(), ...DEFAULT_REPOSITORY_RECORD };
  repositoryDialog.value = true;
};

/**
 * Open the dialog for editing an existing user.
 * @param id - ID of the user to edit.
 */
const editRepository = (id: number) => {
  const repository = repositories.value.find((r) => r.id === id);
  if (repository) {
    repositoryRecord.value = { ...repository };
    isEditing.value = true;
    repositoryDialog.value = true;
  }
};

/**
 * Remove a user by their ID.
 * @param id - ID of the user to remove.
 */
const removeRepository = (id: number) => {
  repositories.value = repositories.value.filter((repository) => repository.id !== id);
};

/**
 * Save the current record (add or update).
 */
const saveRepository = async () => {
  const isValid = await repositoryForm.value?.validate();
  if (!isValid?.valid || !repositoryRecord.value) return;

  if (isEditing.value) {
    const index = repositories.value.findIndex((r) => r.id === repositoryRecord.value?.id);
    if (index !== -1) {
      repositories.value[index] = { ...repositoryRecord.value };
    }
  } else {
    repositories.value.push({ ...repositoryRecord.value });
  }

  repositoryDialog.value = false;
  repositoryRecord.value = null;
};

// Commit Logic
const commitForm = ref<VForm | null>(null);

// Define types for clarity and consistency
interface Commit {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  repository_id: number | null;
}

// Default structure for user records
const DEFAULT_COMMIT_RECORD: Omit<Commit, "id"> = {
  title: "",
  message: "",
  timestamp: "",
  repository_id: null,
};

// Active commit record
const commitRecord = ref<Commit | null>(null);

// Dialog visibility state
const commitDialog = ref<boolean>(false);

// Current page for pagination
const currentCommitPage = ref(1);

// ===== Commits Data =====
// Dummy commits data
const commits = ref<Commit[]>([
  {
    id: 1748537999756,
    title: "Initialize repository",
    message: "Added README and basic project structure.",
    timestamp: "2025-05-28T12:34:56Z",
    repository_id: 1748537989756,
  },
  {
    id: 1748537999757,
    title: "Add login feature",
    message: "Implemented user login functionality.",
    timestamp: "2025-05-27T09:22:41Z",
    repository_id: 1748537989757,
  },
  {
    id: 1748537999758,
    title: "Fix bug in API response",
    message: "Corrected status codes and response structure.",
    timestamp: "2025-05-26T15:11:23Z",
    repository_id: 1748537989758,
  },
  {
    id: 1748537999759,
    title: "Update UI components",
    message: "Improved styling and responsiveness.",
    timestamp: "2025-05-25T18:47:05Z",
    repository_id: 1748537989759,
  },
  {
    id: 1748537999760,
    title: "Add unit tests",
    message: "Increased coverage for core functions.",
    timestamp: "2025-05-24T13:00:00Z",
    repository_id: 1748537989760,
  },
  {
    id: 1748537999761,
    title: "Optimize database queries",
    message: "Reduced query execution time by 30%.",
    timestamp: "2025-05-23T10:29:18Z",
    repository_id: 1748537989761,
  },
  {
    id: 1748537999762,
    title: "Improve documentation",
    message: "Added examples and explanations.",
    timestamp: "2025-05-22T14:15:39Z",
    repository_id: 1748537989762,
  },
  {
    id: 1748537999763,
    title: "Deploy to production",
    message: "Released version 1.0.0 to live environment.",
    timestamp: "2025-05-21T16:45:00Z",
    repository_id: 1748537989763,
  },
]);

// ===== Table Configuration =====
// Table headers
const commitsHeaders = ref([
  { text: "ID", value: "id", icon: "", sortable: true },
  { text: "Title", value: "title", icon: "" },
  { text: "Message", value: "message", icon: "" },
  { text: "Date", value: "timestamp", icon: "" },
  { text: "Repository ID", value: "repository_id", icon: "" },
  { text: "Actions", value: "actions", icon: "" },
]);

// ===== Computed Properties =====
// Total number of pages
const commitsPageCount = computed(() => Math.ceil(commits.value.length / itemsPerPage));

// Paginated repositories for the current page
const paginatedCommits = computed(() => {
  const start = (currentCommitPage.value - 1) * itemsPerPage;
  return commits.value.slice(start, start + itemsPerPage);
});

// ===== Methods =====
/**
 * Open the dialog for adding a new user.
 */
const addCommit = () => {
  isEditing.value = false;
  commitRecord.value = { id: Date.now(), ...DEFAULT_COMMIT_RECORD };
  commitDialog.value = true;
};

/**
 * Open the dialog for editing an existing user.
 * @param id - ID of the user to edit.
 */
const editCommit = (id: number) => {
  const commit = commits.value.find((r) => r.id === id);
  if (commit) {
    commitRecord.value = { ...commit };
    isEditing.value = true;
    commitDialog.value = true;
  }
};

/**
 * Remove a user by their ID.
 * @param id - ID of the user to remove.
 */
const removeCommit = (id: number) => {
  commits.value = commits.value.filter((commit) => commit.id !== id);
};

/**
 * Save the current record (add or update).
 */
const saveCommit = async () => {
  const isValid = await commitForm.value?.validate();
  if (!isValid?.valid || !commitRecord.value) return;

  if (isEditing.value) {
    // Update an existing user
    const index = commits.value.findIndex((c) => c.id === commitRecord.value?.id);
    if (index !== -1) {
      commits.value[index] = { ...commitRecord.value };
    }
  } else {
    // Add a new user
    commits.value.push({ ...commitRecord.value });
  }

  // Close the dialog
  commitDialog.value = false;
  commitRecord.value = null;
};

// ===== Methods =====
const simulateLoading = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
};

/**
 * Initialize the tab value from localStorage if it exists.
 */
const initializeTab = () => {
  if (typeof window !== "undefined") {
    // Check if we are in the browser
    const savedTab = parseInt(localStorage.getItem("currentTab") || "1", 10);
    if (!isNaN(savedTab)) {
      tab.value = savedTab;
    }
  }
};

// ===== Lifecycle Hooks =====
// Simulate loading when the page loads
onMounted(simulateLoading);

// ===== Lifecycle Hooks =====
onMounted(() => {
  simulateLoading();
  initializeTab();
});
// Watch for tab changes and save to localStorage
watch(tab, (newValue) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("currentTab", newValue.toString());
  }
});
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
            v-model="tab"
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
            <template v-for="tab in rightTabs" :key="tab.label">
              <v-tooltip open-delay="300" location="bottom">
                <template #activator="{ props: tooltipProps }">
                  <v-hover>
                    <template #default="{ isHovering, props: hoverProps }">
                      <a
                        :href="tab.link"
                        target="_blank"
                        class="text-decoration-none"
                        @click.stop
                        v-bind="tooltipProps"
                      >
                        <div
                          v-bind="hoverProps"
                          style="height: 100%"
                          :class="[
                            'py-3 px-4 text-body-2 text-black d-flex align-center',
                            isHovering ? 'bg-grey-lighten-4' : '',
                          ]"
                        >
                          <v-icon :icon="tab.icon" class="me-2" />
                          {{ tab.label }}
                        </div>
                      </a>
                    </template>
                  </v-hover>
                </template>

                <span>{{ tab.label }}</span>
              </v-tooltip>
            </template>
          </v-tabs>
        </client-only>
      </div>
    </div>

    <v-tabs-window v-model="tab">
      <!-- Users Container -->
      <v-tabs-window-item v-if="tab === 1" :value="1">
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
                    <!-- Loading -->
                    <div v-if="isLoading" class="d-flex justify-center py-6">
                      <v-skeleton-loader
                        class="bg-white pb-2 w-100"
                        type="table-row-divider, table-row-divider, table-row-divider, table-row"
                      ></v-skeleton-loader>
                    </div>

                    <!-- Table -->
                    <v-data-table
                      v-else
                      :headers="headers"
                      :items="paginatedUsers"
                      :mobile="smAndDown"
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
                        <div
                          class="d-flex ga-0"
                          :class="smAndDown ? 'justify-end' : 'justify-center'"
                        >
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
                      class="bg-white"
                      :prepend-icon="`${
                        isEditing ? 'mdi-pencil-outline' : 'mdi-account-plus-outline'
                      }`"
                      :title="`${isEditing ? 'Edit' : 'Add'} a user`"
                    >
                      <template v-slot:text v-if="record">
                        <v-form ref="userForm">
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="record.username"
                                label="Username"
                                :hide-details="true"
                                :rules="[(v) => !!v]"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                              <v-text-field
                                v-model="record.email"
                                label="Email"
                                :hide-details="true"
                                :rules="[(v) => !!v]"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-form>
                      </template>

                      <v-divider></v-divider>

                      <v-card-actions class="bg-white px-4">
                        <v-btn
                          text="Cancel"
                          variant="plain"
                          color=""
                          @click="dialog = false"
                        ></v-btn>

                        <v-spacer></v-spacer>

                        <v-btn variant="outlined" rounded="lg" text="Save" @click="save"></v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-tabs-window-item>

      <!-- Repositories Container -->
      <v-tabs-window-item v-if="tab === 2" :value="2">
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
                      <span class="font-weight-bold text-h6">Repositories</span>
                      <small>List of all the repositories</small>
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
                              prepend-icon="mdi-folder-plus-outline"
                              text="Add repository"
                              @click="addRepository"
                            ></v-btn>
                          </template>
                          <span>Add repository</span>
                        </v-tooltip>
                      </client-only>
                    </div>
                  </div>

                  <!-- Body -->
                  <client-only>
                    <!-- Loading -->
                    <div v-if="isLoading" class="d-flex justify-center py-6">
                      <v-skeleton-loader
                        class="bg-white pb-2 w-100"
                        type="table-row-divider, table-row-divider, table-row-divider, table-row"
                      ></v-skeleton-loader>
                    </div>

                    <!-- Table -->
                    <v-data-table
                      v-else
                      :headers="repositoriesHeaders"
                      :items="paginatedRepositories"
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
                        v-for="header in repositoriesHeaders"
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

                      <!-- Name -->
                      <template v-slot:[`item.name`]="{ item }">
                        <span>{{ item.name }}</span>
                      </template>

                      <!-- Description -->
                      <template v-slot:[`item.description`]="{ item }">
                        <span>{{ item.description }}</span>
                      </template>

                      <!-- User ID -->
                      <template v-slot:[`item.user_id`]="{ item }">
                        <span>{{ item.user_id }}</span>
                      </template>

                      <!-- Actions -->
                      <template v-slot:[`item.actions`]="{ item }">
                        <!-- Actions -->
                        <div
                          class="d-flex ga-0"
                          :class="smAndDown ? 'justify-end' : 'justify-center'"
                        >
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
                                  @click="editRepository(item.id)"
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
                                  @click="removeRepository(item.id)"
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
                          v-model="currentRepositoryPage"
                          :length="repositoriesPageCount"
                          class="mt-4"
                          size="small"
                        />
                      </template>
                    </v-data-table>
                  </client-only>

                  <v-dialog v-model="repositoryDialog" max-width="500">
                    <v-card
                      class="bg-white"
                      :prepend-icon="`${
                        isEditing ? 'mdi-pencil-outline' : 'mdi-folder-plus-outline'
                      }`"
                      :title="`${isEditing ? 'Edit' : 'Add'} a repository`"
                    >
                      <template v-slot:text v-if="repositoryRecord">
                        <v-form ref="repositoryForm">
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="repositoryRecord.name"
                                label="Name"
                                :hide-details="true"
                                :rules="[(v) => !!v]"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                              <v-text-field
                                v-model="repositoryRecord.description"
                                label="Description"
                                :hide-details="true"
                                :rules="[(v) => !!v]"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                              <!-- Dropdown to select user -->
                              <v-select
                                v-model="repositoryRecord.user_id"
                                :items="users"
                                item-title="id"
                                item-value="id"
                                label="Select User"
                                :hide-details="true"
                                :rules="[(v) => !!v]"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-form>
                      </template>

                      <v-divider></v-divider>

                      <v-card-actions class="bg-white">
                        <v-btn
                          text="Cancel"
                          color=""
                          variant="plain"
                          @click="repositoryDialog = false"
                        ></v-btn>

                        <v-spacer></v-spacer>

                        <v-btn
                          variant="outlined"
                          rounded="lg"
                          text="Save"
                          @click="saveRepository"
                        ></v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-tabs-window-item>

      <!-- Commits Container -->
      <v-tabs-window-item v-if="tab === 3" :value="3">
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
                      <span class="font-weight-bold text-h6">Commits</span>
                      <small>List of all the commits</small>
                    </div>

                    <!-- Actions -->
                    <div class="d-flex ga-0">
                      <!-- Add commit -->
                      <client-only>
                        <v-tooltip open-delay="300" location="bottom">
                          <template #activator="{ props }">
                            <v-btn
                              v-bind="props"
                              variant="outlined"
                              color=""
                              rounded="lg"
                              v-ripple
                              prepend-icon="mdi-note-plus-outline"
                              text="Add commit"
                              @click="addCommit"
                            ></v-btn>
                          </template>
                          <span>Add commit</span>
                        </v-tooltip>
                      </client-only>
                    </div>
                  </div>

                  <!-- Body -->
                  <client-only>
                    <!-- Loading -->
                    <div v-if="isLoading" class="d-flex justify-center py-6">
                      <v-skeleton-loader
                        class="bg-white pb-2 w-100"
                        type="table-row-divider, table-row-divider, table-row-divider, table-row"
                      ></v-skeleton-loader>
                    </div>

                    <!-- Table -->
                    <v-data-table
                      v-else
                      :headers="commitsHeaders"
                      :items="paginatedCommits"
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
                        v-for="header in commitsHeaders"
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

                      <!-- Title -->
                      <template v-slot:[`item.title`]="{ item }">
                        <span>{{ item.title }}</span>
                      </template>

                      <!-- Message -->
                      <template v-slot:[`item.message`]="{ item }">
                        <span>{{ item.message }}</span>
                      </template>

                      <!-- Date -->
                      <template v-slot:[`item.timestamp`]="{ item }">
                        <span>{{ item.timestamp }}</span>
                      </template>

                      <!-- Repo ID -->
                      <template v-slot:[`item.repository_id`]="{ item }">
                        <span>{{ item.repository_id }}</span>
                      </template>

                      <!-- Actions -->
                      <template v-slot:[`item.actions`]="{ item }">
                        <!-- Actions -->
                        <div
                          class="d-flex ga-0"
                          :class="smAndDown ? 'justify-end' : 'justify-center'"
                        >
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
                                  @click="editCommit(item.id)"
                                />
                              </template>
                              <span>Edit commit</span>
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
                                  @click="removeCommit(item.id)"
                                />
                              </template>
                              <span>Delete commit</span>
                            </v-tooltip>
                          </client-only>
                        </div>
                      </template>

                      <!-- Pagination -->
                      <template v-slot:bottom>
                        <v-pagination
                          v-model="currentCommitPage"
                          :length="commitsPageCount"
                          class="mt-4"
                          size="small"
                        />
                      </template>
                    </v-data-table>
                  </client-only>

                  <v-dialog v-model="commitDialog" max-width="500">
                    <v-card
                      class="bg-white"
                      :prepend-icon="`${
                        isEditing ? 'mdi-pencil-outline' : 'mdi-note-plus-outline'
                      }`"
                      :title="`${isEditing ? 'Edit' : 'Add'} a commit`"
                    >
                      <template v-slot:text v-if="commitRecord">
                        <v-form ref="commitForm">
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="commitRecord.title"
                                label="Title"
                                :hide-details="true"
                                :rules="[(v) => !!v]"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                              <v-text-field
                                v-model="commitRecord.message"
                                label="Message"
                                :hide-details="true"
                                :rules="[(v) => !!v]"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                              <!-- Dropdown to select repository -->
                              <v-select
                                v-model="commitRecord.repository_id"
                                :items="repositories"
                                item-title="id"
                                item-value="id"
                                label="Select Repository"
                                :hide-details="true"
                                :rules="[(v) => !!v]"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-form>
                      </template>

                      <v-divider></v-divider>

                      <v-card-actions class="bg-white">
                        <v-btn
                          text="Cancel"
                          color=""
                          variant="plain"
                          @click="commitDialog = false"
                        ></v-btn>

                        <v-spacer></v-spacer>

                        <v-btn
                          variant="outlined"
                          rounded="lg"
                          text="Save"
                          @click="saveCommit"
                        ></v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>
