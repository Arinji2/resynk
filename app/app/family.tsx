import { MaterialIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { ScrollView, View } from "react-native";
import { Person } from "@/components/routes/family/person";
import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useRecoveryMode } from "@/lib/useRecoveryMode";

export default function Family() {
  const { recoveryMode, setRecoveryMode, loaded } = useRecoveryMode();
  if (!loaded) return null;
  return (
    <>
      <Stack.Screen
        options={{ header: () => <Header title="Family Dashboard" /> }}
      />
      <ScrollView
        contentContainerStyle={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 40,
          paddingBottom: 40,
          paddingTop: 40,
        }}
      >
        {recoveryMode && (
          <View className="flex h-fit w-full flex-row items-start justify-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-2 py-4">
            <MaterialIcons name="warning" size={34} color={"#f59e0b"} />
            <View className="flex flex-1 flex-col items-start justify-center">
              <Text className="font-bold text-amber-900 text-lg">
                Recovery Mode Active
              </Text>
              <Text className="text-left font-medium text-amber-800 text-sm">
                Family data cannot be changed after Recovery Mode is active to
                ensure data consistency during emergency
              </Text>
            </View>
          </View>
        )}
        <View className="flex h-fit w-full flex-col items-center justify-center gap-5">
          <Person
            person={{
              id: 8842,
              name: "John Doe",
              role: "Head",
              aadharNumber: "1234567890",
              age: 42,
              bloodType: "O+",
              allergies: "Penicillin, Peanuts",
              medications: "Lisinopril (10mg daily)",
              otherInfo: "Contact primary if unavailable.",
            }}
          />
          <Person
            person={{
              id: 8843,
              name: "Jane Doe",
              aadharNumber: "1234567890",
              age: 38,
              bloodType: "A-",
              allergies: "None known",
              medications: "None",
              otherInfo: "Certified First Responder.",
            }}
          />

          <Person
            person={{
              id: 8844,
              aadharNumber: "1234567890",
              name: "Timmy Doe",
              age: 8,
              bloodType: "Unknown",
              allergies: "Bee stings (Severe)",
              medications: "EpiPen carried at all times",
            }}
          />
          <Button
            disabled={recoveryMode}
            className="h-fit w-full py-3"
            onPress={() => {
              router.push("/family-add");
            }}
          >
            <MaterialIcons name="add-circle" size={18} color="white" />
            <Text>Add New Family Member</Text>
          </Button>
        </View>
      </ScrollView>
    </>
  );
}
