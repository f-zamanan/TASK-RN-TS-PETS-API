import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import pets from "@/data/pets";
import PetItem from "./PetItem";
import { fetchAllPets } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

const PetList = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [displayPets, setDisplayPets] = useState(pets);

  // this is to handle displaying pets from the backend
  // the function is coming from api.ts
  // const handleGetPets = async () => {
  //   const FetchedPetsData = await fetchAllPets();
  //   return setDisplayPets(FetchedPetsData);
  // };
  // the whole issue was to call the function :)
  // handleGetPets();

  // fetching all the pets using useQuery

  const { data, isLoading } = useQuery({
    queryKey: ["getallpets"],
    queryFn: () => fetchAllPets(),
  });
  // if (isLoading) {
  //   <ActivityIndicator size={"large"} />;
  // }
  const petList = data
    ?.filter((d: { name: string }) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((d: { type: string }) =>
      d.type.toLowerCase().includes(type.toLowerCase())
    )
    .map((d: any) => (
      <PetItem
        key={d.id}
        pet={d}
        setDisplayPets={setDisplayPets} // the set function here doesn't do anything but I kept it to not break the code, otherwise I would've done too many changes
        displayPets={data}
      />
    ));

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerStyle}
    >
      {/* Search Input */}
      <TextInput
        placeholder="Search for a pet"
        style={styles.searchInput}
        onChangeText={(value) => setSearch(value)}
      />

      {/* Filter by type */}
      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("")}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Cat")}
        >
          <Text>Cat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Dog")}
        >
          <Text>Dog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Rabbit")}
        >
          <Text>Rabbit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Pet List */}
      {petList}
    </ScrollView>
  );
};

export default PetList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "#f9e3be",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
