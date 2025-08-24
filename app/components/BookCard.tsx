// components/BookCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useBookStore } from "../../store/bookstore";
type Book = {
  id: string;
  title: string;
  author: string;
  genre?: string;
  year?: number;
  cover: string;
  description?: string;
};

export default function BookCard({ book }: { book: Book }) {
  const { addToRead } = useBookStore();

  return (
    <View style={styles.card}>
      <Image source={{ uri: book.cover }} style={styles.cover} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        {book.genre && <Text style={styles.genre}>Genre: {book.genre}</Text>}
        {book.year && <Text style={styles.year}>Year: {book.year}</Text>}
      </View>
    
    <TouchableOpacity
    onPress={() => addToRead(book)}
    style={styles.addButton}
  >
    <Text style={{color :"pink",textAlign:"center"}}>Add to My List</Text>
  </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    alignItems: "center",
  },
  cover: {
    width: 60,
    height: 90,
    borderRadius: 4,
    marginRight: 15,
  },
    addButton: {
  backgroundColor: "#007AFF",
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 6,
  marginTop: 8,
},

  
  info: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  author: {
    color: "#555",
    marginBottom: 2,
  },
  genre: {
    fontStyle: "italic",
    color: "#777",
  },
  year: {
    color: "#777",
  },
});
