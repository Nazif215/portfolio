"use client";

import { useEffect, useState } from "react";
import { STUDIO_LOCATION } from "@/lib/studio-info";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: STUDIO_LOCATION.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function StudioClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span suppressHydrationWarning>
      {STUDIO_LOCATION.city} {time ?? "--:--"} · {STUDIO_LOCATION.coords}
    </span>
  );
}
