export type IconName = "search" | "user" | "heart" | "bag" | "menu" | "close" | "arrow" | "arrow-left" | "whatsapp" | "share" | "dashboard" | "helmet" | "bike" | "activity" | "mountain" | "sun" | "temperature" | "wind" | "shield" | "lock" | "truck" | "spark" | "message" | "instagram" | "facebook";

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const paths: Record<IconName, React.ReactNode> = {
    "arrow-left": <path d="M19 12H5m5-5-5 5 5 5" />,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" /></>,
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    whatsapp: <><path d="M20.5 11.7a8.7 8.7 0 0 1-12.8 7.6L3 20.6l1.3-4.5a8.7 8.7 0 1 1 16.2-4.4Z" /><path d="M8.4 7.4c-.7 0-1.4.8-1.4 1.8 0 2.7 3.9 6.6 6.8 7 .9.1 2-.6 2.3-1.3l.1-.8-2.5-1.2-.9 1c-1.5-.6-2.7-1.8-3.4-3.2l.9-1-1.1-2.3h-.8Z" strokeWidth="1.4" /></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>, user: <><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20c.8-4 3.3-6 7.5-6s6.7 2 7.5 6"/></>,
    heart: <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.4 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>, bag: <><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>, close: <path d="m6 6 12 12M18 6 6 18"/>, arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    helmet: <><path d="M4 14a8 8 0 0 1 16 0v2H9"/><path d="M9 16v3H5l-1-5M12 6v8"/></>, bike: <><circle cx="6" cy="17" r="4"/><circle cx="18" cy="17" r="4"/><path d="m6 17 4-8 3 8h5l-4-7H9M15 6h3"/></>, activity: <path d="M3 12h4l2-6 4 12 2-6h6"/>, mountain: <><path d="m3 20 7-12 4 6 2-3 5 9H3Z"/><path d="m8 11 2 2 2-2"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>, temperature: <><path d="M14 14.8V5a4 4 0 0 0-8 0v9.8a6 6 0 1 0 8 0Z"/><path d="M10 11v6"/></>, wind: <><path d="M3 8h11c3 0 3-4 0-4-1 0-1.8.5-2.2 1.2M3 12h16c3 0 3 4 0 4-1 0-1.8-.5-2.2-1.2M3 16h8"/></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-5"/></>, lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>, truck: <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>, spark: <><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z"/><path d="m19 17 .7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z"/></>, message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></>, facebook: <path d="M14 21v-8h3l.5-4H14V7c0-1.2.5-2 2-2h2V1.5c-.7-.1-1.7-.2-3-.2-3 0-5 1.8-5 5.2V9H7v4h3v8"/>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}
