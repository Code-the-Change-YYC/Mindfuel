import { User } from "./User";

export type AppState = {
  displayedUsers: User[];
  liveUsers: User[];
  newUser: User | null;
  mapCenter: { lat: number; lng: number };
  loading: boolean;
};
