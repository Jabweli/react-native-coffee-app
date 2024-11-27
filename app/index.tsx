import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18 }}>
          Edit app/index.tsx to edit this screen.
        </Text>
        <Link href="/(tabs)/main">Go Home</Link>
      </SafeAreaView>
    </>
  );
}
