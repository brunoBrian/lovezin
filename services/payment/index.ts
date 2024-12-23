import * as types from "./types";

export async function getPaymentDataRequest(body: types.SpecialMomentBody) {
  const response = await fetch(`http://localhost:3000/pagamento/pix`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data as types.PaymentResponse;
}
