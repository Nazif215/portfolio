function Mark({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-10 block h-3 w-3 ${className}`}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-mist-dim/60" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-mist-dim/60" />
    </span>
  );
}

export function RegistrationMarks() {
  return (
    <>
      <Mark className="left-4 top-4 sm:left-6 sm:top-6" />
      <Mark className="right-4 top-4 sm:right-6 sm:top-6" />
      <Mark className="bottom-4 left-4 sm:bottom-6 sm:left-6" />
      <Mark className="bottom-4 right-4 sm:bottom-6 sm:right-6" />
    </>
  );
}
