const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fetch all road defects from the backend API.
 */
export async function fetchDefects() {
  const response = await fetch(`${API_BASE_URL}/defects`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

/**
 * Create a new road defect record on the backend API.
 */
export async function addDefect(defectData) {
  const response = await fetch(`${API_BASE_URL}/defects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(defectData)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

/**
 * Send image to backend prototype detection service.
 */
export async function detectDefect(formData) {
  const response = await fetch(`${API_BASE_URL}/detect`, {
    method: 'POST',
    body: formData
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
