export type BuildStyle = 'street' | 'track' | 'drift' | 'show'
export interface ChatRequest {
car: string; goal: string; budget: string
existing_mods?: string; follow_up?: string
session_id: string; build_style?: BuildStyle
}
export interface ModItem {
name: string; budget_tier: 'low' | 'mid' | 'high'
cost_range: string; reason: string
watch_out: string; insurance_flag: boolean}
export interface AdvisorResponse {
raw_feedback: string; assessment: string | null
mods: ModItem[]; verdict: string | null; model_used: string
}
export interface ChatMessage {
role: 'user' | 'mechanic'; content: string; timestamp: number
}