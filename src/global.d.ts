import type { Dispatch, SetStateAction } from "react";

declare global {
  interface UniversitySettings {
    hd: string;
    colors: string;
  }

  interface LoginPageInterface {
    setLoginStatus: Dispatch<SetStateAction<boolean>>;
  }

  interface ToxicityResponse {
    source: string;
    toxicity: number;
  }

  interface Message {
    author: string;
    content: string;
    createdAt: number;
  }

  type User = {
    name: string;
  };

  interface Room {
    professor: string;
    roomID: string;
    users: User[];
    totalMessageCount: number;
    currentUserCount: number;
    banner: string;
  }
}
