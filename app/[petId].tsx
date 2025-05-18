import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import pets from "@/data/pets";
import { fetchOnePet } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

const PetDetails = () => {
  const { petId } = useLocalSearchParams();
  const [pet, setPet] = useState({
    name: "",
    image: "",
    type: "",
    description: "",
  });

  // create a button to call the api request to get pet details (done)
  // function to call getOnePet(petId)
  // const getOnePet = async () => {
  //   const fetchOnePetData = await fetchOnePet(Number(petId));
  //   setPet(fetchOnePetData);
  // };
  // state -> no data -> call the api -> reset the state for the new data

  //solution for the useQuery get one pet task

  const { data, isLoading } = useQuery({
    queryKey: ["getonepet"],
    queryFn: () => fetchOnePet(Number(petId)),
  });

  // used useQuery to fetch the data from the api then useState to
  // handle my onpress button to set the state to fetched data and render it
  // if (isLoading) {
  //   <ActivityIndicator size={"large"} />;
  // }
  console.log(data);
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{pet.name}</Text>
      <Image source={{ uri: pet.image }} style={styles.image} />
      <Text style={styles.description}> {pet.description}</Text>
      <Text style={styles.type}>Type: {pet.type}</Text>

      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            setPet(data);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Fetch Pet Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  type: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
