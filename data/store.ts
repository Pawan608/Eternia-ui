// import { text } from "stream/consumers";
import { create } from "zustand";
import { Subscription } from "./../context/SubsContext";
interface searchStore {
  searchedText: string;
  isSearched: boolean;
  searchQuery: string;
  showMic: boolean;
  setSearchedText: (text: string) => void;
  setSearchQuery: (text: string) => void;
  setShowMic: (text: boolean) => void;
}
export const useSearchStore = create<searchStore>((set) => ({
  searchedText: "",
  searchQuery: "",
  isSearched: false,
  showMic: false,
  setSearchedText: (text) =>
    set((state) => ({ ...state, searchedText: text, isSearched: true })),
  setSearchQuery: (text) => set((state) => ({ ...state, searchQuery: text })),
  setShowMic: (text) => set((state) => ({ ...state, showMic: text })),
}));

interface SubscriptionStoreState {
  selectedSubscription: Subscription | null;
  setSelectedSubscription: (subscription: Subscription | null) => void;
  clearSelectedSubscription: () => void;
}

const useSubscriptionStore = create<SubscriptionStoreState>((set) => ({
  selectedSubscription: null, // Initial state is no subscription selected

  // Method to set the selected subscription
  setSelectedSubscription: (subscription) =>
    set({ selectedSubscription: subscription }),

  // Method to clear the selected subscription
  clearSelectedSubscription: () => set({ selectedSubscription: null }),
}));

export default useSubscriptionStore;
