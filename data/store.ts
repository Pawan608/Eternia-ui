// import { text } from "stream/consumers";
import { create } from "zustand";
import { Subscription } from "./../context/SubsContext";
interface searchStore {
  searchedText: string;
  isSearched: boolean;
  setSearchedText: (text: string) => void;
}
export const useSearchStore = create<searchStore>((set) => ({
  searchedText: "",
  isSearched: false,
  setSearchedText: (text) =>
    set(() => ({ searchedText: text, isSearched: true })),
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
