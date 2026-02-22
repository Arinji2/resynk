import { router, Stack } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useUserProfile } from "@/lib/useUserProfile";

export default function Onboarding() {
  const { setUser } = useUserProfile();

  const [step, setStep] = useState<"select" | "citizen" | "volunteer">(
    "select",
  );

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medications, setMedications] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [password, setPassword] = useState("");

  // ---------------- CITIZEN ----------------

  const handleCitizenSubmit = async () => {
    if (!name.trim() || !age.trim() || !aadharNumber.trim() || !bloodGroup) {
      Alert.alert("Name, Age, Aadhar and Blood Group are required");
      return;
    }

    await setUser({
      role: "citizen",
      name: name.trim(),
      age: Number(age),
      aadharNumber: aadharNumber,
      allergies: allergies || null,
      medications: medications || null,
      bloodGroup: bloodGroup,
    });

    router.replace("/");
  };

  // ---------------- VOLUNTEER ----------------

  const handleVolunteerSubmit = async () => {
    if (!name.trim() || !age.trim() || !aadharNumber.trim() || !bloodGroup) {
      Alert.alert("Name, Age, Aadhar and Blood Group are required");
      return;
    }

    if (password !== "123456") {
      Alert.alert("Invalid volunteer password");
      return;
    }

    await setUser({
      role: "volunteer",
      name: name.trim(),
      age: Number(age),
      aadharNumber: aadharNumber.trim(),
      allergies: allergies || null,
      medications: medications || null,
      bloodGroup: bloodGroup,
    });

    router.replace("/");
  };

  return (
    <>
      <Stack.Screen options={{ header: () => <Header title="Onboarding" /> }} />

      <ScrollView
        contentContainerStyle={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 24,
          paddingBottom: 80,
          paddingTop: 40,
        }}
        className="px-4"
      >
        {/* ---------------- SELECT ROLE ---------------- */}
        {step === "select" && (
          <>
            <Text className="font-bold text-lg">Who are you?</Text>

            <Button className="w-full" onPress={() => setStep("citizen")}>
              <Text>Citizen</Text>
            </Button>

            <Button className="w-full" onPress={() => setStep("volunteer")}>
              <Text>Volunteer</Text>
            </Button>
          </>
        )}

        {/* ---------------- CITIZEN FORM ---------------- */}
        {step === "citizen" && (
          <>
            <Text className="font-bold text-lg">Citizen Details</Text>

            <FormFields
              name={name}
              setName={setName}
              age={age}
              setAge={setAge}
              aadharNumber={aadharNumber}
              setAadharNumber={setAadharNumber}
              allergies={allergies}
              setAllergies={setAllergies}
              medications={medications}
              setMedications={setMedications}
              bloodGroup={bloodGroup}
              setBloodGroup={setBloodGroup}
            />

            <Button className="w-full py-3" onPress={handleCitizenSubmit}>
              <Text>Continue</Text>
            </Button>
            <Button
              variant="ghost"
              className="self-start"
              onPress={() => setStep("select")}
            >
              <Text>← Back</Text>
            </Button>
          </>
        )}

        {/* ---------------- VOLUNTEER FORM ---------------- */}
        {step === "volunteer" && (
          <>
            <Text className="font-bold text-lg">Volunteer Details</Text>

            <FormFields
              name={name}
              setName={setName}
              age={age}
              setAge={setAge}
              aadharNumber={aadharNumber}
              setAadharNumber={setAadharNumber}
              allergies={allergies}
              setAllergies={setAllergies}
              medications={medications}
              setMedications={setMedications}
              bloodGroup={bloodGroup}
              setBloodGroup={setBloodGroup}
            />

            {/* Password */}
            <View className="flex w-full flex-col gap-2">
              <Text className="text-muted-foreground text-sm">
                Volunteer Password *
              </Text>
              <Input
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter volunteer password"
              />
            </View>

            <Button className="w-full py-3" onPress={handleVolunteerSubmit}>
              <Text>Continue</Text>
            </Button>
            <Button
              variant="ghost"
              className="self-start"
              onPress={() => setStep("select")}
            >
              <Text>← Back</Text>
            </Button>
          </>
        )}
      </ScrollView>
    </>
  );
}

/* ---------------- REUSABLE FORM FIELDS ---------------- */

function FormFields({
  name,
  setName,
  age,
  setAge,
  aadharNumber,
  setAadharNumber,
  allergies,
  setAllergies,
  medications,
  setMedications,
  bloodGroup,
  setBloodGroup,
}: any) {
  return (
    <>
      <View className="flex w-full flex-col gap-2">
        <Text className="text-muted-foreground text-sm">Full Name *</Text>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Enter full name"
        />
      </View>

      <View className="flex w-full flex-col gap-2">
        <Text className="text-muted-foreground text-sm">Age *</Text>
        <Input
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholder="Enter age"
        />
      </View>

      <View className="flex w-full flex-col gap-2">
        <Text className="text-muted-foreground text-sm">Aadhar Number *</Text>
        <Input
          value={aadharNumber}
          onChangeText={setAadharNumber}
          keyboardType="numeric"
          placeholder="12 digit Aadhar"
        />
      </View>

      <View className="flex w-full flex-col gap-2">
        <Text className="text-muted-foreground text-sm">
          Allergies (optional)
        </Text>
        <Input value={allergies} onChangeText={setAllergies} />
      </View>

      <View className="flex w-full flex-col gap-2">
        <Text className="text-muted-foreground text-sm">Blood Group *</Text>
        <Input value={bloodGroup} onChangeText={setBloodGroup} />
      </View>

      <View className="flex w-full flex-col gap-2">
        <Text className="text-muted-foreground text-sm">
          Medications (optional)
        </Text>
        <Input value={medications} onChangeText={setMedications} />
      </View>
    </>
  );
}
