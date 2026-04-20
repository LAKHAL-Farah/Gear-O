'use client'

import { ArrowDownIcon, ChevronRightIcon, CoinIcon } from './MonoIcons'

interface BudgetStage {
  stage: string
  amount: string
  mods: string[]
}

function parseBudgetStages(raw: string): BudgetStage[] {
  const stages: BudgetStage[] = []

  // Look for stage patterns like "Stage 1: £500", "Phase 1: £1,000" etc
  const stageRegex = /(?:Stage|Phase)\s+(\d+)[:\s]+(?:£|\$)?(\d+(?:,\d+)?)/gi
  const matches = Array.from(raw.matchAll(stageRegex))

  if (matches.length === 0) {
    return []
  }

  matches.forEach((match, idx) => {
    const stageNum = match[1]
    const amount = match[2]

    // Extract mods for this stage by looking at text between this stage and next
    const stageStart = match.index || 0
    const nextMatch = matches[idx + 1]
    const stageEnd = nextMatch ? nextMatch.index : raw.length
    const stageText = raw.substring(stageStart, stageEnd)

    // Find mod names (usually after dashes, pipes, or bullets)
    const modMatches = Array.from(stageText.matchAll(/[-•\d.]\s*([A-Z][^.\n]*?)(?=[-•\d.]|$)/g))
    const mods = modMatches.map(m => m[1].trim()).filter(m => m.length > 5 && m.length < 100)

    stages.push({
      stage: `Stage ${stageNum}`,
      amount: `£${amount}`,
      mods: mods.length > 0 ? mods : ['Foundational upgrades']
    })
  })

  return stages
}

export function BudgetStages({ raw }: { raw: string }) {
  const stages = parseBudgetStages(raw)

  if (stages.length === 0) {
    return null
  }

  return (
    <div className='space-y-4 animate-slide-up'>
      <h2 className='text-white font-bold text-lg flex items-center gap-2'>
        <CoinIcon className='h-5 w-5 text-[#C6C6C6]' />
        Budget Roadmap
      </h2>
      <div className='grid gap-3'>
        {stages.map((stage, idx) => (
          <div
            key={idx}
            className={`
              relative group rounded-2xl p-4 border transition-all duration-300
              backdrop-blur-sm overflow-hidden
              ${
                idx === 0
                  ? 'border-purple-300/55 bg-gradient-to-r from-purple-700/35 to-fuchsia-700/25'
                  : idx === stages.length - 1
                    ? 'border-purple-500/55 bg-gradient-to-r from-purple-900/35 to-fuchsia-900/30'
                    : 'border-purple-300/25 bg-gradient-to-b from-[#1e1e1e]/80 to-[#121212]/80 hover:border-purple-300/50'
              }
            `}
          >
            {/* Glow effect */}
            {idx !== 0 && (
              <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500 to-fuchsia-500 blur-xl -z-10 rounded-2xl' />
            )}

            <div className='flex items-center gap-3 mb-3'>
              {/* Stage badge */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                  transition-all duration-300
                  ${
                    idx === 0
                      ? 'bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/50'
                      : idx === stages.length - 1
                        ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-600/40'
                        : 'bg-purple-950/70 border border-purple-300/30 text-purple-200'
                  }
                `}
              >
                {idx + 1}
              </div>

              <div className='flex-1'>
                <p className='text-white font-semibold'>{stage.stage}</p>
                <p
                  className={`text-sm font-bold ${idx === 0 ? 'text-fuchsia-200' : idx === stages.length - 1 ? 'text-purple-300' : 'text-teal'}`}
                >
                  {stage.amount}
                </p>
              </div>

              {/* Stage indicator */}
              {idx === 0 && (
                <span className='text-xs bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white px-2 py-1 rounded-full font-semibold'>
                  FIRST
                </span>
              )}
              {idx === stages.length - 1 && (
                <span className='text-xs bg-gradient-to-r from-purple-600 to-purple-800 text-white px-2 py-1 rounded-full font-semibold'>
                  FINAL
                </span>
              )}
            </div>

            {/* Mods list */}
            {stage.mods.length > 0 && (
              <div className='ml-6 space-y-2 border-l-2 border-purple-300/25 pl-3'>
                {stage.mods.slice(0, 3).map((mod, i) => (
                  <div key={i} className='flex items-start gap-2'>
                    <ChevronRightIcon className='h-3.5 w-3.5 text-purple-300 mt-0.5 flex-shrink-0' />
                    <p className='text-purple-100/85 text-sm line-clamp-1 hover:line-clamp-none transition-all'>
                      {mod}
                    </p>
                  </div>
                ))}
                {stage.mods.length > 3 && (
                  <p className='text-purple-100/55 text-xs italic pl-4 pt-1'>
                    +{stage.mods.length - 3} more modifications
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Timeline connector */}
      <div className='flex justify-center pt-2'>
        <div className='flex items-center gap-1 text-purple-100/60 text-xs font-semibold'>
          <ArrowDownIcon className='h-3.5 w-3.5' />
          <span>Follow this roadmap for optimal results</span>
        </div>
      </div>
    </div>
  )
}
