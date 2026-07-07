export const carKeys = {
  all: ["cars"] as const,
  lists: () => [...carKeys.all, "list"] as const,
  list: (params: Record<string, unknown>) =>
    [...carKeys.lists(), params] as const,
  details: () => [...carKeys.all, "detail"] as const,
  detail: (id: number) => [...carKeys.details(), id] as const,
  stats: () => [...carKeys.all, "stats"] as const,
};
