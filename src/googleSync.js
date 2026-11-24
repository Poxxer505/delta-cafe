const CLIENT_ID = "940711799435-8l48248d51he0v7o6jvdeufid4osvqru.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
const DATA_FILENAME = "Delta_Cafe_Data.json";

let tokenClient = null;
let accessToken = localStorage.getItem("dc_google_token") || null;
let driveFileId = localStorage.getItem("dc_drive_file_id") || null;

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
      localStorage.setItem("dc_google_token", accessToken);
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const profile = await res.json();
        onSuccess?.({ email: profile.email, name: profile.name, picture: profile.picture });
      } catch (err) {
        onError?.("Gagal ambil profil.");
      }
    },
  });
}

export function triggerGoogleLogin() {
  if (!tokenClient) return false;
  tokenClient.requestAccessToken({ prompt: "consent" });
  return true;
}

async function getOrCreateDriveFile() {
  if (!accessToken) throw new Error("Belum login");
  if (driveFileId) {
    const check = await fetch(`https://www.googleapis.com/drive/v3/files/${driveFileId}?fields=id,trashed`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (check.ok) {
      const meta = await check.json();
      if (!meta.trashed) return driveFileId;
    }
  }
  const query = encodeURIComponent(`name='${DATA_FILENAME}' and trashed=false`);
  const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    driveFileId = searchData.files[0].id;
    localStorage.setItem("dc_drive_file_id", driveFileId);
    return driveFileId;
  }
  const createRes = await fetch("https://www.googleapis.com/drive/v3/files", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ name: DATA_FILENAME, mimeType: "application/json" }),
  });
  const created = await createRes.json();
  driveFileId = created.id;
  localStorage.setItem("dc_drive_file_id", driveFileId);
  return driveFileId;
}

export async function loadFromGoogleDrive() {
  if (!accessToken || !navigator.onLine) return null;
  const fileId = await getOrCreateDriveFile();
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function saveToGoogleDrive(appData) {
  if (!accessToken) throw new Error("Belum login");
  const fileId = await getOrCreateDriveFile();
  const res = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(appData),
  });
  if (!res.ok) throw new Error("Gagal simpan ke Drive");
  return true;
}

export function logoutGoogle() {
  accessToken = null;
  driveFileId = null;
  localStorage.removeItem("dc_google_token");
  localStorage.removeItem("dc_drive_file_id");
}