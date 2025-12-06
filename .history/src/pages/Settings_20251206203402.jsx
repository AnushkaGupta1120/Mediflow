import React, { useEffect, useState } from "react";

// All settings categories
const categories = [
  {
    title: "User Profile",
    description: "Basic user info to update and manage",
    options: [
      { label: "Username", type: "text", name: "username" },
      { label: "Email", type: "email", name: "email" },
      { label: "Phone number", type: "tel", name: "phone" },
    ],
  },

  {
    title: "Password & Security",
    description: "Control how your account is protected.",
    options: [
      { label: "Change password", type: "password", name: "password" },
      { label: "Two-factor authentication (2FA)", type: "checkbox", name: "twoFactorAuth" },
    ],
  },

  {
    title: "Notifications",
    description: "Choose which alerts you want to receive.",
    options: [
      { label: "Email alerts", type: "checkbox", name: "emailAlerts" },
      { label: "SMS alerts", type: "checkbox", name: "smsAlerts" },
      { label: "Push notifications", type: "checkbox", name: "pushNotifications" },
    ],
  },

  {
    title: "Theme & Display",
    description: "Customize how the application looks.",
    options: [
      { label: "Theme", type: "select", name: "theme", choices: ["Light", "Dark"] },
      {
        label: "Font Size",
        type: "select",
        name: "fontSize",
        choices: ["Small", "Medium", "Large"],
      },
    ],
  },

  {
    title: "Language",
    description: "Choose the language for the application.",
    options: [
      { label: "Language", type: "select", name: "language", choices: ["English", "Spanish", "French", "German"] },
    ],
  },

  {
    title: "Inventory Settings",
    description: "Defaults for faster data entry",
    options: [
      { label: "Default Reorder Level", type: "number", name: "reorderLevel" },
      { label: "Default Supplier", type: "text", name: "defaultSupplier" },
      { label: "Currency Format", type: "text", name: "currencyFormat" },
    ],
  },

  {
    title: "Integration Settings",
    description: "Connect external services and APIs.",
    options: [
      { label: "External API Key", type: "text", name: "externalAPIs" },
      { label: "Webhook URL", type: "text", name: "webhooks" },
    ],
  },

  {
    title: "Data & Privacy",
    description: "Control your data inside this platform.",
    options: [
      { label: "Export Data", type: "button", action: () => alert("Exporting data...") },
      {
        label: "Delete Account",
        type: "button",
        className: "text-red-600",
        action: () =>
          window.confirm("Are you sure? This action is irreversible!") &&
          alert("Account deleted."),
      },
    ],
  },
];

export default function Settings() {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const [saved, setSaved] = useState(false);

  // Load saved settings on startup
  useEffect(() => {
    const stored = localStorage.getItem("settings");
    if (stored) {
      const parsed = JSON.parse(stored);
      setFormData(parsed);
      applyTheme(parsed);
    }
  }, []);

  // Apply theme + font size
  function applyTheme(settings) {
    const theme = settings.theme || "Light";
    const fontSize = settings.fontSize || "Medium";

    // Toggle dark mode
    document.documentElement.classList.toggle("dark", theme === "Dark");

    // font size
    const sizeMap = { Small: "14px", Medium: "16px", Large: "18px" };
    document.documentElement.style.fontSize = sizeMap[fontSize];
  }

  // Handle change
  function handleChange(e) {
    const { name, value, checked, type } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFormData((prev) => {
      const updated = { ...prev, [name]: updatedValue };
      applyTheme(updated);
      setSaved(false);
      return updated;
    });
  }

  // Save Settings
  function handleSave() {
    localStorage.setItem("settings", JSON.stringify(formData));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  // Accordion toggle
  function toggleIndex(i) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {categories.map((cat, i) => (
        <div key={cat.title} className="border rounded mb-4 overflow-hidden shadow-sm">
          {/* Title */}
          <button
            onClick={() => toggleIndex(i)}
            className="w-full bg-gray-100 px-4 py-3 flex justify-between items-center font-semibold text-left"
          >
            {cat.title}
            <span>{openIndex === i ? "−" : "+"}</span>
          </button>

          {/* Expanded Content */}
          {openIndex === i && (
            <div className="p-4 bg-white space-y-4">
              <p className="text-gray-600">{cat.description}</p>

              {cat.options.map((opt, idx) => {
                if (opt.type === "button")
                  return (
                    <button
                      key={idx}
                      onClick={opt.action}
                      className={`px-3 py-2 rounded ${opt.className || "bg-blue-600 text-white"}`}
                    >
                      {opt.label}
                    </button>
                  );

                if (opt.type === "select")
                  return (
                    <label key={idx} className="block">
                      {opt.label}
                      <select
                        name={opt.name}
                        value={formData[opt.name] || opt.choices[0]}
                        onChange={handleChange}
                        className="mt-1 block w-full border px-2 py-1 rounded"
                      >
                        {opt.choices.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </label>
                  );

                return (
                  <label key={idx} className="block">
                    {opt.label}
                    <input
                      type={opt.type}
                      name={opt.name}
                      value={opt.type !== "checkbox" ? formData[opt.name] || "" : undefined}
                      checked={opt.type === "checkbox" ? formData[opt.name] || false : undefined}
                      onChange={handleChange}
                      placeholder={opt.placeholder || ""}
                      className="mt-1 block w-full border px-2 py-1 rounded"
                    />
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Save Changes
      </button>

      {saved && <p className="text-green-600 mt-2">✓ Settings saved successfully</p>}
    </div>
  );
}
