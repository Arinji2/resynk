import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export type PersonType = {
  id: string | number;
  name: string;
  role?: string;
  age: number;
  bloodType: string;
  aadharNumber: string;
  allergies?: string | null;
  medications?: string | null;
  otherInfo?: string | null;
};

function displayValue(value?: string | null) {
  if (!value || value.trim() === "") return "None";
  return value;
}

export function Person({ person }: { person: PersonType }) {
  const {
    id,
    name,
    role,
    age,
    bloodType,
    aadharNumber,
    allergies,
    medications,
    otherInfo,
  } = person;

  return (
    <View className="w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
        <View className="flex-row items-center gap-2">
          <MaterialIcons
            name={age > 18 ? "person" : "child-care"}
            size={20}
            color="#94a3b8"
          />
          <Text className="font-semibold text-slate-700">
            {name}
            {role ? ` (${role})` : ""}
          </Text>
        </View>

        <View className="rounded border border-slate-200 bg-white px-2 py-0.5">
          <Text className="font-mono text-xs text-slate-400">ID: {id}</Text>
        </View>
      </View>

      {/* Body */}
      <View className="flex flex-col gap-4 p-4">
        {/* Age + Blood */}
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Text className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
              Age
            </Text>
            <Text className="font-medium text-slate-900">{age}</Text>
          </View>

          <View className="flex-1">
            <Text className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
              Blood Type
            </Text>
            <Text className="font-medium text-slate-900">{bloodType}</Text>
          </View>
        </View>

        {/* Aadhar */}
        <View>
          <Text className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
            Aadhar Number
          </Text>
          <Text className="font-medium text-slate-900">{aadharNumber}</Text>
        </View>

        {/* Allergies */}
        <View>
          <Text className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
            Allergies
          </Text>
          <Text
            className={`text-sm ${
              displayValue(allergies) === "None"
                ? "italic text-slate-500"
                : "text-slate-900"
            }`}
          >
            {displayValue(allergies)}
          </Text>
        </View>

        {/* Medications */}
        <View>
          <Text className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
            Medications
          </Text>
          <Text
            className={`text-sm ${
              displayValue(medications) === "None"
                ? "italic text-slate-500"
                : "text-slate-900"
            }`}
          >
            {displayValue(medications)}
          </Text>
        </View>

        {/* Other Info */}
        <View>
          <Text className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
            Other Info
          </Text>
          <Text
            className={`text-sm ${
              displayValue(otherInfo) === "None"
                ? "italic text-slate-500"
                : "text-slate-900"
            }`}
          >
            {displayValue(otherInfo)}
          </Text>
        </View>
      </View>
    </View>
  );
}
