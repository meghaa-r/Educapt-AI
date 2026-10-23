const API_BASE_URL = "http://127.0.0.1:8000/api";

// Helper function to attach the JWT token to requests
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Authorization': token ? `Bearer ${token}` : ''
  };
}

// Fetch all documents from MongoDB through FastAPI
export async function getDocuments() {
  const response = await fetch(`${API_BASE_URL}/documents`, {
    method: 'GET',
    headers: getAuthHeaders(), // Added authentication
  });

  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }

  return response.json();
}

// Upload a PDF or DOCX file
export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/documents/upload`, {
    method: "POST",
    headers: getAuthHeaders(), // Added authentication (Browser automatically handles multipart boundaries)
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Document upload failed");
  }

  return response.json();
}

// Fetch one document, including its extracted text
export async function getDocument(documentId) {
  const response = await fetch(`${API_BASE_URL}/documents/${documentId}`, {
    method: 'GET',
    headers: getAuthHeaders(), // Added authentication
  });

  if (!response.ok) {
    throw new Error("Failed to fetch document details");
  }

  return response.json();
}

// Save reading progress in this browser
export function saveProgress(documentId, progress) {
  try {
    localStorage.setItem(
      `educapt-progress-${documentId}`,
      String(progress)
    );
  } catch (error) {
    console.error("Could not save reading progress:", error);
  }
}

// Restore reading progress from this browser
export function getSavedProgress(documentId) {
  try {
    const saved = localStorage.getItem(
      `educapt-progress-${documentId}`
    );

    return saved === null ? 0 : Number(saved);
  } catch (error) {
    console.error("Could not restore reading progress:", error);
    return 0;
  }
}
// Trigger the local Ollama AI to generate a mind map
export async function generateAIMindMap(text) {
  const response = await fetch(`${API_BASE_URL}/ai/generate-mindmap`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate mind map from AI");
  }

  return response.json();
}