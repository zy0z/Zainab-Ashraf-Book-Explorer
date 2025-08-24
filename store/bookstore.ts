// store/bookstore.ts
import { create } from "zustand";

export type Book = {
  id: string;
  title: string;
  author: string;
  genre?: string;
  year?: number;
  cover: string;
  description?: string;
};

type Store = {
  toRead: Book[];
  addToRead: (book: Book) => void;
  removeFromRead: (id: string) => void;
};

export const useBookStore = create<Store>((set) => ({
  toRead: [],
  addToRead: (book) =>
    set((state) => ({
      toRead: [...state.toRead, book],
    })),
  removeFromRead: (id) =>
    set((state) => ({
      toRead: state.toRead.filter((b) => b.id !== id),
    })),
}));
