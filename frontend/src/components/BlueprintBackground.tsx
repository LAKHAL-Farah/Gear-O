'use client'

export function BlueprintBackground() {
  return (
    <>
      <svg
        className='absolute inset-0 h-full w-full pointer-events-none'
        viewBox='0 0 1000 1000'
        preserveAspectRatio='xMidYMid slice'
      >
        <defs>
          <pattern id='grid' width='36' height='36' patternUnits='userSpaceOnUse'>
            <path d='M 36 0 L 0 0 0 36' fill='none' stroke='url(#gridGradient)' strokeWidth='0.75' />
          </pattern>
          <linearGradient id='gridGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#00A19C' stopOpacity='0.1' />
            <stop offset='50%' stopColor='#00514E' stopOpacity='0.08' />
            <stop offset='100%' stopColor='#C6C6C6' stopOpacity='0.1' />
          </linearGradient>
        </defs>

        <rect width='1000' height='1000' fill='url(#grid)' />

        <g opacity='0.12' stroke='#00A19C' strokeWidth='1' fill='none'>
          <line x1='60' y1='90' x2='180' y2='90' />
          <line x1='60' y1='90' x2='60' y2='210' />
          <line x1='820' y1='90' x2='940' y2='90' />
          <line x1='940' y1='90' x2='940' y2='210' />
          <line x1='60' y1='790' x2='60' y2='910' />
          <line x1='60' y1='910' x2='180' y2='910' />
          <line x1='820' y1='910' x2='940' y2='910' />
          <line x1='940' y1='790' x2='940' y2='910' />
        </g>

        <g opacity='0.11' stroke='#00514E' strokeWidth='1.1' fill='none'>
          <circle cx='790' cy='180' r='82' />
          <circle cx='790' cy='180' r='62' />
          <rect x='730' y='125' width='120' height='110' />
          <line x1='745' y1='178' x2='718' y2='210' />
          <line x1='835' y1='178' x2='862' y2='210' />
        </g>

        <g opacity='0.11' stroke='#C6C6C6' strokeWidth='1' fill='none'>
          <circle cx='210' cy='720' r='58' />
          <circle cx='210' cy='720' r='42' />
          <line x1='150' y1='720' x2='120' y2='720' />
          <line x1='270' y1='720' x2='300' y2='720' />
          <line x1='210' y1='660' x2='210' y2='630' />
          <line x1='210' y1='780' x2='210' y2='810' />
        </g>

        <g opacity='0.09' stroke='#00A19C' strokeWidth='1' fill='none'>
          <rect x='670' y='470' width='220' height='170' />
          <circle cx='725' cy='520' r='14' />
          <circle cx='780' cy='560' r='14' />
          <circle cx='840' cy='520' r='14' />
          <line x1='725' y1='534' x2='725' y2='547' />
          <line x1='780' y1='574' x2='780' y2='587' />
          <line x1='840' y1='534' x2='840' y2='547' />
        </g>
      </svg>

      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none' />
      <div className='absolute left-[12%] top-[14%] h-72 w-72 rounded-full bg-accent/10 blur-3xl pointer-events-none' />
      <div className='absolute bottom-[10%] right-[10%] h-80 w-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none' />
    </>
  )
}
