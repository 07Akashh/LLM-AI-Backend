import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ==========================
// Helper Functions
// ==========================
const successResponse = (data) => ({ status: "success", data });
const errorResponse = (message, code = 500) => ({ status: "error", error: { message, code } });

// ==========================
// Validation Middleware
// ==========================
const validateChat = (req, res, next) => {
  const body = req.body || {};
  if (!body.chat || typeof body.chat !== "string") {
    return res.status(400).json(errorResponse("Field 'chat' is required and must be a string", 400));
  }
  next();
};

// ==========================
// Routes
// ==========================

// GET / => Explain API usage
app.all("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "index.html"));
  });

// Health check
app.get("/health", (req, res) => {
  res.status(200).json(successResponse({ status: "Server is healthy" }));
});

// POST /chat endpoint
app.post("/chat", validateChat, async (req, res) => {
  const { chat } = req.body;

  try {
    // Google Gemini API call
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [
          {
            parts: [{ text: chat }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY
        }
      }
    );

    const response_from_llm = response.data?.candidates?.[0]?.content?.parts[0]?.text || "No response from Gemini";
    return res.status(200).json(successResponse({ response: response_from_llm }));

  } catch (error) {
    console.error("Google Gemini API error:", error?.response?.data || error.message || error);
    return res.status(500).json(errorResponse("Internal Server Error", 500));
  }
});

// ==========================
// Global Error Handler
// ==========================
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json(errorResponse("Unexpected error occurred", 500));
});

// ==========================
// Start Server
// ==========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`LLM server running on port ${PORT}`));