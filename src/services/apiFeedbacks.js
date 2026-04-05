import { baseUrl } from "./baseUrl";
import Cookies from "js-cookie";

export async function getFeedbacks({ category_id, sort }) {
  let url = baseUrl + "/api/v1/feedback";

  const params = new URLSearchParams();
  if (category_id) params.append("category_id", category_id);
  if (sort) {
    if (sort === "most_upvotes") {
      params.append("sort", "-upvote_count");
    } else if (sort === "least_upvotes") {
      params.append("sort", "upvote_count");
    } else if (sort === "most_comments") {
      params.append("sort", "-comment_count");
    } else {
      params.append("sort", "comment_count");
    }
  }

  if (params.toString()) url += "?" + params.toString();

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

  return data.data.feedbacks;
}

export async function postFeedback({ data }) {
  let url = baseUrl + "/api/v1/feedback";

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  const dataRes = await response.json();

  if (dataRes.status !== "success") {
    throw new Error(dataRes.message);
  }

  return dataRes;
}

export async function getFeedback({ feedbackId }) {
  let url = baseUrl + `/api/v1/feedback/${feedbackId}`;

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

  return data.data.feedback;
}

export async function updateFeedback({ feedbackId, data }) {
  let url = baseUrl + "/api/v1/feedback/" + feedbackId;

  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  const dataRes = await response.json();

  if (dataRes.status !== "success") {
    throw new Error(dataRes.message);
  }

  return dataRes;
}

export async function deleteFeedback({ feedbackId }) {
  const url = baseUrl + "/api/v1/feedback/" + feedbackId;

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  if (data.status !== "success") {
    throw new Error(data.status);
  }

  return data;
}

export async function postUpvote({ feedbackId }) {
  const url = baseUrl + "/api/v1/feedback/" + feedbackId + "/upvote";

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  };

  const response = await fetch(url, options);
  const data = await response.json();
  if (data.status !== "success") {
    throw new Error(data.status);
  }

  return data;
}

export async function deleteUpvote({ feedbackId }) {
  const url = baseUrl + "/api/v1/feedback/" + feedbackId + "/upvote";

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  if (data.status !== "success") {
    throw new Error(data.status);
  }

  return data;
}
