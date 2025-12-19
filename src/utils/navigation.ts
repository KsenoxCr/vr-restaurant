import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Navigate back in history if available, otherwise push to fallback route
 * @param router - Next.js router instance
 * @param fallback - Route to navigate to if no history exists
 * @returns void
 */
export function navigateBack(router: AppRouterInstance, fallback: string) {
  window.history.length === 1 ? router.push(fallback) : router.back();
}
