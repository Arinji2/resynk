import { MaterialIcons } from "@expo/vector-icons";
import { Redirect, router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useRecoveryMode } from "@/lib/useRecoveryMode";

export default function CreateFamilyMember() {
  const { recoveryMode, loaded } = useRecoveryMode();
  const params = useLocalSearchParams();

  const isHead = params.head === "true";

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medications, setMedications] = useState("");
  const [otherInfo, setOtherInfo] = useState("");

  const role = isHead ? "Head" : params.role;

  if (!loaded) return null;
  if (recoveryMode) return <Redirect href="/family" />;

  const handleSubmit = () => {
    if (
      !name.trim() ||
      !age.trim() ||
      !bloodType.trim() ||
      !aadharNumber.trim()
    ) {
      return;
    }

    const payload = {
      name,
      role: isHead ? "Head" : role || undefined,
      age: Number(age),
      bloodType,
      aadharNumber,
      allergies: allergies || null,
      medications: medications || null,
      otherInfo: otherInfo || null,
    };

    console.log(payload);

    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <Header
              title={isHead ? "Create Family Head" : "Add Family Member"}
            />
          ),
        }}
      />

      <ScrollView
        contentContainerStyle={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 24,
          paddingBottom: 40,
          paddingTop: 40,
        }}
        className="px-4"
      >
        {/* Name */}
        <View className="flex w-full flex-col gap-2">
          <Text className="text-muted-foreground text-sm">Full Name</Text>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Enter full name"
          />
        </View>

        {/* Age */}
        <View className="flex w-full flex-col gap-2">
          <Text className="text-muted-foreground text-sm">Age</Text>
          <Input
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholder="Enter age"
          />
        </View>

        {/* Blood Type */}
        <View className="flex w-full flex-col gap-2">
          <Text className="text-muted-foreground text-sm">Blood Type</Text>
          <Input
            value={bloodType}
            onChangeText={setBloodType}
            placeholder="O+, A-, etc."
          />
        </View>

        {/* Aadhar */}
        <View className="flex w-full flex-col gap-2">
          <Text className="text-muted-foreground text-sm">Aadhar Number</Text>
          <Input
            value={aadharNumber}
            onChangeText={setAadharNumber}
            keyboardType="numeric"
            placeholder="12 digit Aadhar number"
          />
        </View>

        {/* Allergies */}
        <View className="flex w-full flex-col gap-2">
          <Text className="text-muted-foreground text-sm">
            Allergies (optional)
          </Text>
          <Input
            value={allergies}
            onChangeText={setAllergies}
            placeholder="Leave empty if none"
          />
        </View>

        {/* Medications */}
        <View className="flex w-full flex-col gap-2">
          <Text className="text-muted-foreground text-sm">
            Medications (optional)
          </Text>
          <Input
            value={medications}
            onChangeText={setMedications}
            placeholder="Leave empty if none"
          />
        </View>

        {/* Other Info */}
        <View className="flex w-full flex-col gap-2">
          <Text className="text-muted-foreground text-sm">
            Other Info (optional)
          </Text>
          <Input
            value={otherInfo}
            onChangeText={setOtherInfo}
            placeholder="Additional notes"
          />
        </View>

        <Button className="w-full " onPress={handleSubmit}>
          <MaterialIcons name="save" size={18} color="white" />
          <Text>{isHead ? "Save Family Head" : "Save Family Member"}</Text>
        </Button>
        {!isHead && (
          <Button
            variant={"outline"}
            className="w-full"
            onPress={() => {
              router.back();
            }}
          >
            <Text>Go Back</Text>
          </Button>
        )}
      </ScrollView>
    </>
  );
}
