import { router, Stack } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useUserProfile } from "@/lib/useUserProfile";

export default function Onboarding() {
  const { setUser } = useUserProfile();

  const [step, setStep] = useState<"select" | "citizen">("select");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medications, setMedications] = useState("");

  const handleCitizenSubmit = async () => {
    if (!name.trim() || !age.trim()) return;

    await setUser({
      role: "citizen",
      name: name.trim(),
      age: Number(age),
      aadharNumber: aadharNumber || null,
      allergies: allergies || null,
      medications: medications || null,
    });

    router.replace("/"); // go to main app
  };

  return (
    <>
      <Stack.Screen options={{ header: () => <Header title="Onboarding" /> }} />

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
        {step === "select" && (
          <>
            <Text className="font-bold text-lg">Who are you?</Text>

            <Button className="w-full " onPress={() => setStep("citizen")}>
              <Text>Citizen</Text>
            </Button>

            <Button className="w-full " disabled>
              <Text>Volunteer (Coming Soon)</Text>
            </Button>
          </>
        )}

        {step === "citizen" && (
          <>
            <Text className="font-bold text-lg">Citizen Details</Text>

            {/* Name */}
            <View className="flex w-full flex-col gap-2">
              <Text className="text-muted-foreground text-sm">Full Name *</Text>
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Enter full name"
              />
            </View>

            {/* Age */}
            <View className="flex w-full flex-col gap-2">
              <Text className="text-muted-foreground text-sm">Age *</Text>
              <Input
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                placeholder="Enter age"
              />
            </View>

            {/* Aadhar */}
            <View className="flex w-full flex-col gap-2">
              <Text className="text-muted-foreground text-sm">
                Aadhar Number (optional)
              </Text>
              <Input
                value={aadharNumber}
                onChangeText={setAadharNumber}
                keyboardType="numeric"
                placeholder="12 digit Aadhar"
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

            <Button className="w-full py-3" onPress={handleCitizenSubmit}>
              <Text>Continue</Text>
            </Button>
          </>
        )}
      </ScrollView>
    </>
  );
}
