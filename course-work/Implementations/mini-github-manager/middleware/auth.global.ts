import { useAuthClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to) => {
  const { initAuth, logIn, getUserInfo, isAuthenticated } = useAuthClient();
  const config = useRuntimeConfig();

  // Initialize auth
  const authenticated = await initAuth("check-sso", {
    kcUrl: config.public.PORTAL_FE_KC_URL || "https://kc-dev.skyware-group.com/",
    kcRealm: config.public.PORTAL_FE_KC_REALM || "portal-static",
    kcClientId: config.public.PORTAL_FE_KC_CLIENT_ID || "portal-static",
  });

  // Redirect to login if not authenticated and the route requires authentication
  if (!authenticated && to.meta.requiresAuth) {
    if (import.meta.client) {
      await logIn(window.location.origin + to.fullPath);
    }
  }
});
