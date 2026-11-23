import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings.js";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckinOut } = useMutation({
    mutationFn: (bookingIdOrObj) => {
      const id = typeof bookingIdOrObj === "object" ? bookingIdOrObj.bookingId : bookingIdOrObj;
      return updateBooking(id, {
        status: "checked-out",
      });
    },

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error(`There was an error while checking out`);
    },
  });

  return { checkout, isCheckinOut };
}
