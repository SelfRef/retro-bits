import type { ThemeDefaults } from 'retro-bits/ssr';

// The playground starts light instead of following the OS, the way an app with
// its own theme list would. Shared by the server hook and the layout load.
export const defaults: ThemeDefaults = { scheme: 'light' };
