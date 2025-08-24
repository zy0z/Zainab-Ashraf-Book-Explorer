// app/books/[id].tsx
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, Button, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useBookStore } from "../../store/bookstore";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  genre?: string;
  year?: number;
};

export default function BookDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);

  const { toRead, addToRead, removeFromRead } = useBookStore();
  const isInList = toRead.some((b) => b.id === id);

  useEffect(() => {
    fetch(`https://zain-training.vercel.app/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  if (!book) return <Text>Loading...</Text>;

  return (
    <ScrollView className="flex-1 p-4">
      <Image source={{ uri: book.cover }} className="w-full h-64 rounded-xl mb-4" />
      <Text className="text-2xl font-bold mb-2">{book.title}</Text>
      <Text className="text-lg text-gray-600 mb-4">by {book.author}</Text>
      <Text className="mb-6">{book.description}</Text>
      {isInList ? (
        <Button title="Remove from My List" onPress={() => removeFromRead(book.id)} />
      ) : (
        <Button title="Add to My List" onPress={() => addToRead(book)} />
      )}
    </ScrollView>
  );
}