const QUIZ_BACKEND_DEPLOYED_URL = "https://quiz-backend-u6vp.onrender.com";

window.QUIZ_API_CONFIG = {
  baseUrl: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : QUIZ_BACKEND_DEPLOYED_URL,
  apiKey: "3jnDfg4nw0wSDkb4295NBJkdwhuf378S",
  answerEndpoints: ["/answers"]
};
