// app/my-list.tsx
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useBookStore } from "../store/bookstore";
import BookCard from "./components/BookCard"; // 

export default function MyList() {
  const { toRead, removeFromRead } = useBookStore();
console.log("toRead:", toRead);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        📖 My List
      </Text>

      {toRead.length === 0 ? (
        <Text>No books added yet.</Text>
      ) : (
        <FlatList
          data={toRead}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              
              <BookCard book={item} />

              <TouchableOpacity
                onPress={() => removeFromRead(item.id)}
                style={{
                  marginTop: 8,
                  backgroundColor: "#FF3B30",
                  padding: 10,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
