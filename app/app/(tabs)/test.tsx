import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function Test() {
  return (
    <ThemedView>
      <ThemedText>Test Screen</ThemedText>
      <IconSymbol name="checkmark" size={24} color="#000" />
    </ThemedView>
  );
}