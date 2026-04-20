import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdvisorResponse, ChatMessage } from "@/lib/types";

interface SessionState {
  sessionId: string | null;
  carSpec: string | null; // remembered for display
  initialAdvice: AdvisorResponse | null;
  messages: ChatMessage[];
  checkedMods: string[]; // mod names ticked off
  isLoading: boolean;

  // actions
  setSession: (id: string, car: string, advice: AdvisorResponse) => void;
  appendMessage: (msg: ChatMessage) => void;
  toggleMod: (name: string) => void;
  setLoading: (v: boolean) => void;
  reset: () => void;
}

const initial: SessionState = {
  sessionId: null,
  carSpec: null,
  initialAdvice: null,
  messages: [],
  checkedMods: [],
  isLoading: false,

  setSession: () => {},
  appendMessage: () => {},
  toggleMod: () => {},
  setLoading: () => {},
  reset: () => {},
};

export const useSession = create<SessionState>()(
  persist(
    (set, get) => ({
      ...initial,

      setSession: (id, car, advice) =>
        set({
          sessionId: id,
          carSpec: car,
          initialAdvice: advice,
        }),

      appendMessage: (msg) =>
        set((state) => ({
          messages: [...state.messages, msg],
        })),

      toggleMod: (name) =>
        set((state) => ({
          checkedMods: state.checkedMods.includes(name)
            ? state.checkedMods.filter((n) => n !== name)
            : [...state.checkedMods, name],
        })),

      setLoading: (v) => set({ isLoading: v }),

      reset: () => set({ ...initial }),
    }),
    {
      name: "ai-mechanic-session",
    }
  )
);