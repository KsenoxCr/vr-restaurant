import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function navigateBack(router: AppRouterInstance, fallbackHref?: string) {
  //FIX: Needs conditional logic for handling edge cases where user navigatred from outside the app

  history.length > 0 ? router.back() : router.push(fallbackHref ?? "/menu");
}
