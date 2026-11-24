const CLIENT_ID = "940711799435-8l48248d51he0v7o6jvdeufid4osvqru.apps.googleusercontent.com";
const SCOPES =
  "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
const DATA_FILENAME = "Delta_Cafe_Data.json";

let tokenClient = null;
let accessToken = null;
let driveFileId = localStorage.getItem("dc_drive_file_id") || null;
let filePromise = null;

// Pulihkan token lama hanya jika belum kedaluwarsa
(() => {
  const t = localStorage.getItem("dc_google_token");
  const exp = Number(localStorage.getItem("dc_google_token_exp") || 0);
  if (t && Date.now() < exp) accessToken = t;
  else clearToken();
})();

function clearToken() {
  accessToken = null;
  localStorage.removeItem("dc_google_token");
  localStorage.removeItem("dc_google_token_exp");
}

export const hasValidToken = () =>
  !!accessToken && Date.now() < Number(localStorage.getItem("dc_google_token_exp") || 0);

export function initGoogleAuth(onSuccess, onError) {
  if (!window.google) {
    onError?.("Skrip Google belum termuat.");
    return;
  }
    tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: async (tokenResponse) => {
      if (tokenResponse.error) {
        onError?.("Login dibatalkan.");
        return;
      }
      accessToken = tokenResponse.access_token;
      const expiresAt = Date.now() + (Number(tokenResponse.expires_in || 3600) - 60) * 1000;
      localStorage.setItem("dc_google_token", accessToken);
      localStorage.setItem("dc_google_token_exp", String(expiresAt));
      localStorage.setItem("dc_google_seen", "1");
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const profile = await res.json();
        onSuccess?.({ email: profile.email, name: profile.name, picture: profile.picture });
      } catch {
        onError?.("Gagal ambil profil.");
      }
    },
    error_callback: (err) => {
      // popup ditutup / diblokir browser
      onError?.(err?.type || "popup_error");
    },
  });
}

export function triggerGoogleLogin() {
  if (!tokenClient) return false;
  tokenClient.requestAccessToken({
    prompt: localStorage.getItem("dc_google_seen") ? "" : "consent",
  });
  return true;
}

async function authFetch(url, options = {}) {
  if (!hasValidToken()) throw new Error("TOKEN_EXPIRED");
  const res = await fetch(url, {
    ...options,
    headers: { ...(options.headers || {}), Authorization: `Bearer ${accessToken}` },
  });
  if (res.status === 401) {
    clearToken();
    throw new Error("TOKEN_EXPIRED");
  }
  return res;
}

function getOrCreateDriveFile() {
  if (!filePromise) {
    filePromise = findOrCreate().catch((e) => {
      filePromise = null;
      throw e;
    });
  }
  return filePromise;
}

async function findOrCreate() {
  if (driveFileId) {
    const check = await authFetch(
      `https://www.googleapis.com/drive/v3/files/${driveFileId}?fields=id,trashed`
    );
    if (check.ok) {
      const meta = await check.json();
      if (!meta.trashed) return driveFileId;
    }
  }
  const query = encodeURIComponent(`name='${DATA_FILENAME}' and trashed=false`);
  const searchRes = await authFetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`
  );
  const searchData = await searchRes.json();
  if (searchData.files?.length > 0) {
    driveFileId = searchData.files[0].id;
  } else {
    const createRes = await authFetch("https://www.googleapis.com/drive/v3/files", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: DATA_FILENAME, mimeType: "application/json" }),
    });
    driveFileId = (await createRes.json()).id;
  }
  localStorage.setItem("dc_drive_file_id", driveFileId);
  return driveFileId;
}

export async function loadFromGoogleDrive() {
  if (!navigator.onLine) return null;
  const fileId = await getOrCreateDriveFile();
  const res = await authFetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`);
  if (!res.ok) throw new Error("LOAD_FAILED");
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export async function saveToGoogleDrive(appData) {
  const fileId = await getOrCreateDriveFile();
  const res = await authFetch(
    `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appData),
    }
  );
  if (!res.ok) throw new Error("Gagal simpan ke Drive");
  return true;
}

export function logoutGoogle() {
  if (accessToken) window.google?.accounts.oauth2.revoke(accessToken);
  clearToken();
  driveFileId = null;
  filePromise = null;
  localStorage.removeItem("dc_drive_file_id");
}