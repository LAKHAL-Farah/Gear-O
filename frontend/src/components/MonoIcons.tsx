import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.8}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      {...props}
    >
      {children}
    </svg>
  )
}

export function GearIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx='12' cy='12' r='3.5' />
      <path d='M12 2.5v2.5M12 19v2.5M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2.5 12h2.5M19 12h2.5M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77' />
    </IconBase>
  )
}

export function TagIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d='M3 10V4h6l8 8-6 6-8-8z' />
      <circle cx='7.5' cy='7.5' r='1.1' />
    </IconBase>
  )
}

export function CalendarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x='3' y='4.5' width='18' height='16.5' rx='2' />
      <path d='M8 2.5v4M16 2.5v4M3 9h18' />
    </IconBase>
  )
}

export function CarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d='M5 12l1.2-3.6A2 2 0 0 1 8.1 7h7.8a2 2 0 0 1 1.9 1.4L19 12' />
      <path d='M4 12h16v4a1 1 0 0 1-1 1h-1.5M5.5 17H5a1 1 0 0 1-1-1v-4z' />
      <circle cx='7.5' cy='16.5' r='1.5' />
      <circle cx='16.5' cy='16.5' r='1.5' />
    </IconBase>
  )
}

export function WrenchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d='M15.5 6.5a3.5 3.5 0 0 1-4.8 4.8L4 18l-2-2 6.7-6.7a3.5 3.5 0 0 1 4.8-4.8l-2 2 .8 1.2 1.2.8 2-2z' />
    </IconBase>
  )
}

export function TargetIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx='12' cy='12' r='8' />
      <circle cx='12' cy='12' r='4' />
      <circle cx='12' cy='12' r='1.2' fill='currentColor' stroke='none' />
    </IconBase>
  )
}

export function CoinIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <ellipse cx='12' cy='8' rx='8.5' ry='3.5' />
      <path d='M3.5 8v7.5c0 2.2 3.8 4 8.5 4s8.5-1.8 8.5-4V8' />
      <path d='M12 10.5v6' />
    </IconBase>
  )
}

export function MessageIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d='M4 5h16v10H9l-5 4V5z' />
    </IconBase>
  )
}

export function AlertIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d='M12 3l9 16H3l9-16z' />
      <path d='M12 9v5M12 16.5h.01' />
    </IconBase>
  )
}

export function ShieldIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d='M12 3l7 3v5c0 5-3.5 8.7-7 10-3.5-1.3-7-5-7-10V6l7-3z' />
    </IconBase>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d='M5 12.5l4 4L19 6.5' />
    </IconBase>
  )
}

export function BoltIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d='M13 2L4 13h6l-1 9 9-11h-6l1-9z' />
    </IconBase>
  )
}

export function DiamondIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d='M12 3l8.5 9L12 21 3.5 12 12 3z' />
      <path d='M7 8.5h10' />
    </IconBase>
  )
}

export function ListIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d='M8 6h12M8 12h12M8 18h12' />
      <circle cx='4' cy='6' r='1' fill='currentColor' stroke='none' />
      <circle cx='4' cy='12' r='1' fill='currentColor' stroke='none' />
      <circle cx='4' cy='18' r='1' fill='currentColor' stroke='none' />
    </IconBase>
  )
}

export function PlugIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d='M9 3v5M15 3v5M7 8h10v2a5 5 0 0 1-5 5v6h-2v-6a5 5 0 0 1-5-5V8z' />
    </IconBase>
  )
}

export function RefreshIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d='M20 11a8 8 0 1 0 1.2 4.2' />
      <path d='M20 4v7h-7' />
    </IconBase>
  )
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d='M12 5v14M6 13l6 6 6-6' />
    </IconBase>
  )
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d='M9 6l6 6-6 6' />
    </IconBase>
  )
}

export function PoundIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d='M15.5 6.5c-.7-1.1-1.8-1.7-3.1-1.7-2.2 0-4 1.8-4 4v8.4h7.8' />
      <path d='M6.5 11.2h7.2M5.8 14.8h6.5' />
    </IconBase>
  )
}

export function XIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d='M6 6l12 12M18 6L6 18' />
    </IconBase>
  )
}
