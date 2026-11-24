// Logo original e fictícia (folha estilizada) — sem uso de marcas de terceiros
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="16" fill="var(--cor-primaria)" />
      <path d="M9 21c0-7 5-11 14-12-1 9-5 14-12 14" fill="#fff" />
      <path d="M10 22c3-4 6-7 10-9" stroke="var(--cor-primaria)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  )
}
