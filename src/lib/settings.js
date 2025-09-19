// Utility function untuk mengambil API settings dari database
export const getApiSettings = async () => {
  try {
    const response = await fetch("/api/settings");
    const result = await response.json();

    if (result.success) {
      const settings = result.data;
      return {
        apikey: settings.api_vip_reseller_key || "",
        apiId: settings.api_vip_reseller_id || "",
        sign: settings.api_vip_reseller_sign || "",
        baseUrl: "https://vip-reseller.co.id/api/game-feature",
        enabled: settings.api_enabled || false,
      };
    } else {
      console.warn("Failed to load API settings:", result.error);
      return null;
    }
  } catch (error) {
    console.error("Error fetching API settings:", error);
    return null;
  }
};

// Function untuk mengupdate settings API
export const updateApiSettings = async (settings) => {
  try {
    const response = await fetch("/api/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ settings }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating API settings:", error);
    return { success: false, error: error.message };
  }
};

// Function untuk mendapatkan setting spesifik
export const getSetting = async (key) => {
  try {
    const response = await fetch("/api/settings");
    const result = await response.json();

    if (result.success) {
      return result.data[key];
    } else {
      console.warn("Failed to load setting:", result.error);
      return null;
    }
  } catch (error) {
    console.error("Error fetching setting:", error);
    return null;
  }
};

// Function untuk mengupdate setting spesifik
export const updateSetting = async (key, value, type = "string") => {
  try {
    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, value, type }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating setting:", error);
    return { success: false, error: error.message };
  }
};
