import type { ContentValue } from "./types";

export function approvedValue<T>(field: ContentValue<T>): T | undefined {
  if (field.status === "approved" && field.approvalReference.trim()) return field.value;
}
