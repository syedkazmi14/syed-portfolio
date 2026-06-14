/**
 * One-way intent channel from the workshop hub to a destination page, carried
 * across a client-side navigation.
 *
 * It is deliberately module-level (not sessionStorage): the values reset on a
 * hard reload, so a direct hit or a shared link reads the defaults below. Those
 * defaults match the server render — so there is no hydration mismatch — and
 * they mean an externally-opened page never plays the hub's zoom flash or lets
 * "Back to Workshop" hijack the browser history.
 *
 * The hub sets BOTH values before every navigation (markZoom / markDirect), so
 * a destination page only ever reads freshly-written intent. There is no stale
 * state to clear, which keeps the reads pure and safe under React Strict Mode.
 */
let arrivedViaZoom = false;
let arrivedFromHub = false;

/** Desktop zoom navigation: the page should bridge in with the accent flash. */
export function markZoom() {
  arrivedViaZoom = true;
  arrivedFromHub = true;
}

/** Direct navigation (mobile tap / reduced motion): hub origin, but no flash. */
export function markDirect() {
  arrivedViaZoom = false;
  arrivedFromHub = true;
}

/** Did we arrive on this page via the hub's zoom transition? */
export const cameViaZoom = () => arrivedViaZoom;

/** Did we arrive from the hub, so Back can return to its preserved scroll? */
export const cameFromHub = () => arrivedFromHub;
