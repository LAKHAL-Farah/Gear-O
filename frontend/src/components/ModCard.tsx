import type { ModItem } from '@/lib/types'
import { useSession } from '@/store/sessionStore'
import { AlertIcon, BoltIcon, CheckIcon, DiamondIcon, ShieldIcon } from './MonoIcons'

const TIER_STYLES = {
  low: 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/50',
  mid: 'bg-amber-900/30 text-amber-300 border border-amber-700/50',
  high: 'bg-gradient-to-r from-purple-900/35 to-fuchsia-900/30 text-purple-200 border border-purple-500/45',
}

const TIER_ICONS = {
  low: CheckIcon,
  mid: BoltIcon,
  high: DiamondIcon,
}

export function ModCard({ mod, index }: { mod: ModItem; index: number }) {
  const { checkedMods, toggleMod } = useSession()
  const checked = checkedMods.includes(mod.name)
  const TierIcon = TIER_ICONS[mod.budget_tier]

  return (
    <div
      className={`
        relative group rounded-2xl p-4 border transition-all duration-300
        hover:shadow-lg backdrop-blur-sm
        ${
          checked
            ? 'border-purple-300/45 bg-gradient-to-br from-purple-800/30 to-fuchsia-900/25 opacity-70'
            : 'border-purple-400/25 bg-gradient-to-b from-[#1e1e1e]/85 to-[#121212]/80 hover:border-purple-300/55 hover:shadow-purple-500/25'
        }
      `}
    >
      {/* Glow effect on hover */}
      {!checked && (
        <div className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500 to-fuchsia-500 blur-xl -z-10' />
      )}

      <div className='flex gap-4'>
        {/* Checkbox */}
        <button
          onClick={() => toggleMod(mod.name)}
          className={`
            mt-1 w-6 h-6 rounded border-2 flex-shrink-0 flex items-center justify-center
            transition-all duration-200 font-bold
            ${
              checked
                ? 'bg-gradient-to-br from-purple-500 to-fuchsia-500 border-purple-300 text-white shadow-lg shadow-purple-500/40'
                : 'bg-purple-950/65 border-purple-400/35 hover:border-purple-300 text-purple-200'
            }
          `}
        >
          {checked && <CheckIcon className='h-3.5 w-3.5' />}
        </button>

        <div className='flex-1 min-w-0'>
          {/* Header row */}
          <div className='flex items-start gap-2 flex-wrap mb-2'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 to-purple-300 font-bold text-sm'>
              {index + 1}.
            </span>
            <span className='text-white font-semibold flex-1'>{mod.name}</span>
            <span
              className={`text-xs px-2 py-1 rounded font-bold flex items-center gap-1 ${TIER_STYLES[mod.budget_tier]}`}
            >
              <TierIcon className='h-3.5 w-3.5' />
              {mod.budget_tier.toUpperCase()}
            </span>
          </div>

          {/* Cost */}
          <p className='text-teal text-sm font-semibold mb-2'>{mod.cost_range}</p>

          {/* Why */}
          <p className='text-sm text-purple-100/85 mb-2'>
            <span className='text-purple-200 font-semibold'>Why: </span>
            {mod.reason}
          </p>

          {/* Watch out */}
          <p className='text-sm text-purple-100/70 mb-2'>
            <span className='font-semibold inline-flex items-center gap-1'>
              <AlertIcon className='h-3.5 w-3.5' />
              Watch out:
            </span>{' '}
            {mod.watch_out}
          </p>

          {/* Insurance flag */}
          {mod.insurance_flag && (
            <div className='inline-flex items-center gap-1 bg-gradient-to-r from-[#003735]/55 to-[#00514e]/55 text-[#b8ecea] border border-[#00A19C]/45 text-xs px-2 py-1 rounded font-bold'>
              <ShieldIcon className='h-3.5 w-3.5' />
              Insurance / Warranty Impact
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
