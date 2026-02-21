import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { ScrollView, View } from "react-native";
import { Header } from "@/components/shared/header";
import { Report } from "@/components/shared/report";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

export default function Reports() {
  return (
    <>
      <Stack.Screen options={{ header: () => <Header title="My Reports" /> }} />
      <ScrollView
        contentContainerStyle={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 20,
          paddingBottom: 40,
        }}
      >
        <View className="flex h-[100px] w-full flex-col items-start justify-center gap-3 rounded-lg border border-border bg-card p-3">
          <View className="flex h-fit w-full flex-row items-center justify-between">
            <Text className="font-medium">Daily Limit</Text>
            <View className="rounded-lg bg-primary/10 px-2 py-1">
              <Text className="text-primary text-xs">3 of 4 used</Text>
            </View>
          </View>
          <View className="flex h-3 w-full items-start justify-start rounded-lg bg-background">
            <View className="flex h-full w-[70%] items-center justify-start rounded-lg bg-primary"></View>
          </View>

          <Text variant="muted" className="text-xs">
            Resets in 4 hours 12 minutes
          </Text>
        </View>
        <AlertDialog className="w-full">
          <AlertDialogTrigger asChild>
            <Button className="h-fit w-full py-3">
              <MaterialIcons name="add-circle" size={18} color="white" />
              <Text>Create New Report</Text>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-full">
            <AlertDialogHeader>
              <AlertDialogTitle>Create Report</AlertDialogTitle>
              <AlertDialogDescription>
                Create a new report on things around your surroundings
              </AlertDialogDescription>
            </AlertDialogHeader>
            <View className="flex flex-col items-center justify-center gap-2">
              <View className="flex h-fit w-full flex-col items-start justify-center gap-1">
                <Text className="font-light text-muted-foreground text-sm tracking-tighter">
                  Report Name
                </Text>
                <Input className="w-full" />
              </View>
              <View className="flex h-fit w-full flex-col items-start justify-center gap-1">
                <Text className="font-light text-muted-foreground text-sm tracking-tighter">
                  Report Description
                </Text>
                <Input className="w-full" />
              </View>
              <View className="flex h-fit w-full flex-col items-start justify-center gap-1">
                <Text className="font-light text-muted-foreground text-sm tracking-tighter">
                  Report Image
                </Text>
                <Button size={"sm"} className="h-fit w-full py-3">
                  <MaterialIcons
                    name="camera-enhance"
                    size={18}
                    color="white"
                  />
                  <Text>Open Camera</Text>
                </Button>
              </View>
            </View>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Text>Cancel</Text>
              </AlertDialogCancel>
              <AlertDialogAction>
                <Text>Create</Text>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <View className="flex h-fit w-full flex-col items-center justify-center gap-4">
          <View className="flex h-fit w-full flex-row items-center justify-between">
            <Text variant={"muted"} className="font-medium">
              ACTIVE REPORTS
            </Text>
          </View>
          <View className="flex h-fit w-full flex-col items-center justify-center gap-2">
            <Report />
            <Report />
            <Report />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
