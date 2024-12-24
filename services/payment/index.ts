import * as types from "./types";

export async function getPaymentDataRequest(body: types.SpecialMomentBody) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RECORDAR_API_URL}/pagamento/pix`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  return data as types.PaymentResponse;
}
