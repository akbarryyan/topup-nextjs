import { NextResponse } from "next/server";
import database from "@/lib/database";

// GET - Mengambil semua settings
export async function GET() {
  try {
    const connection = await database.getConnection();

    const [settings] = await connection.execute(
      "SELECT setting_key, setting_value, setting_type FROM settings"
    );

    connection.release();

    // Convert array of settings to object
    const settingsObject = {};
    settings.forEach((setting) => {
      let value = setting.setting_value;

      // Convert value based on type
      switch (setting.setting_type) {
        case "boolean":
          value = value === "true";
          break;
        case "number":
          value = parseFloat(value);
          break;
        case "json":
          try {
            value = JSON.parse(value);
          } catch (e) {
            value = setting.setting_value;
          }
          break;
        default:
          value = setting.setting_value;
      }

      settingsObject[setting.setting_key] = value;
    });

    return NextResponse.json({
      success: true,
      data: settingsObject,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// POST - Menyimpan atau mengupdate settings
export async function POST(request) {
  try {
    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid settings data" },
        { status: 400 }
      );
    }

    const connection = await database.getConnection();

    // Begin transaction
    await connection.beginTransaction();

    try {
      for (const [key, value] of Object.entries(settings)) {
        let settingValue = value;
        let settingType = "string";

        // Determine type and convert value
        if (typeof value === "boolean") {
          settingType = "boolean";
          settingValue = value.toString();
        } else if (typeof value === "number") {
          settingType = "number";
          settingValue = value.toString();
        } else if (typeof value === "object") {
          settingType = "json";
          settingValue = JSON.stringify(value);
        } else {
          settingType = "string";
          settingValue = value.toString();
        }

        // Insert or update setting
        await connection.execute(
          `INSERT INTO settings (setting_key, setting_value, setting_type) 
           VALUES (?, ?, ?) 
           ON DUPLICATE KEY UPDATE 
           setting_value = VALUES(setting_value), 
           setting_type = VALUES(setting_type),
           updated_at = CURRENT_TIMESTAMP`,
          [key, settingValue, settingType]
        );
      }

      // Commit transaction
      await connection.commit();
      connection.release();

      return NextResponse.json({
        success: true,
        message: "Settings saved successfully",
      });
    } catch (error) {
      // Rollback transaction on error
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save settings" },
      { status: 500 }
    );
  }
}

// PUT - Update specific setting
export async function PUT(request) {
  try {
    const body = await request.json();
    const { key, value, type } = body;

    if (!key) {
      return NextResponse.json(
        { success: false, error: "Setting key is required" },
        { status: 400 }
      );
    }

    const connection = await database.getConnection();

    let settingValue = value;
    let settingType = type || "string";

    // Auto-detect type if not provided
    if (!type) {
      if (typeof value === "boolean") {
        settingType = "boolean";
        settingValue = value.toString();
      } else if (typeof value === "number") {
        settingType = "number";
        settingValue = value.toString();
      } else if (typeof value === "object") {
        settingType = "json";
        settingValue = JSON.stringify(value);
      } else {
        settingType = "string";
        settingValue = value.toString();
      }
    }

    await connection.execute(
      `INSERT INTO settings (setting_key, setting_value, setting_type) 
       VALUES (?, ?, ?) 
       ON DUPLICATE KEY UPDATE 
       setting_value = VALUES(setting_value), 
       setting_type = VALUES(setting_type),
       updated_at = CURRENT_TIMESTAMP`,
      [key, settingValue, settingType]
    );

    connection.release();

    return NextResponse.json({
      success: true,
      message: "Setting updated successfully",
    });
  } catch (error) {
    console.error("Error updating setting:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update setting" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus setting
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json(
        { success: false, error: "Setting key is required" },
        { status: 400 }
      );
    }

    const connection = await database.getConnection();

    await connection.execute("DELETE FROM settings WHERE setting_key = ?", [
      key,
    ]);

    connection.release();

    return NextResponse.json({
      success: true,
      message: "Setting deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting setting:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete setting" },
      { status: 500 }
    );
  }
}
