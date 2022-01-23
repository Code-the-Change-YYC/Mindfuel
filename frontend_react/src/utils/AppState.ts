import { AlertModel } from "./Alert.model";
import { User } from "./User";

export type AppState = {
  liveUsers: User[];
  historicalUsers: User[] | null;
  historicalCounts: { [id: string]: number };
  liveCounts: LiveCounts;
  newUser: User | null;
  loading: boolean;
  alert: AlertModel | null;
};

export type LiveCounts = {
  sessions: number;
  countries: Set<string>;
  cities: Set<string>;
}
