export const getCurrentEventTypeIcon = (type) => {
  switch (type) {
    case "bus":
      return "bus";

    case "check-in":
      return "check-in";

    case "drive":
      return "drive";

    case "flight":
      return "flight";

    case "restaurant":
      return "restaurant";

    case "ship":
      return "ship";

    case "sightseeing":
      return "sightseeing";

    case "taxi":
      return "taxi";

    case "train":
      return "train";

    case "transport":
      return "transport";

    default:
      return "check-in";
  }
};
