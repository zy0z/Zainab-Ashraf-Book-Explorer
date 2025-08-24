// app/index.tsx
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import BookCard from "./components/BookCard";
import { useBookStore } from "../store/bookstore";

type Book = {
  id: string;
  title: string;
  author: string;
  genre?: string;
  year?: number;
  cover: string;
  description?: string;
  
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("https://zain-training.vercel.app/api/books");
        const data = await res.json();
        console.log("Fetched books:", data);
        setBooks(data.books);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading books...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        📚 Book Explorer
      </Text>
      <Text>DEBUG: Loaded {books.length} books</Text>
<Link href="/my-list" asChild>
  <TouchableOpacity
    style={{
      backgroundColor: "#007AFF",
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
      alignItems: "center",
    }}
  >
    <Text style={{ color: "white", fontSize: 16 }}>📖 Go to My List</Text>
  </TouchableOpacity>
</Link>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/books/${item.id}`} asChild>
            <TouchableOpacity>
              <BookCard book={item} />
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}
