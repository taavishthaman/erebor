import { baseUrl } from "./baseUrl";
import Cookies from "js-cookie";

export async function getCategories() {
  const url = baseUrl + "/api/v1/category";
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data.data.categories;
}
