import React, { useEffect, useState } from "react";

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
    description: "Security-related settings",
    options: [
      { label: "Change password", type: "password", name: "password" },
      { label: "Two-factor authentication (2FA)", type: "checkbox", name: "twoFactorAuth" },
    ],
  },
  {
    title: "Notification Preferences",
    description: "Control when and how users receive alerts",
    options: [
      { label: "Email alerts on low stock", type: "checkbox", name: "emailAlerts" },
      { label: "SMS alerts", type: "checkbox", name: "smsAlerts" },
      { label: "Push notifications", type: "checkbox", name: "pushNotifications" },
    ],
  },
  {
    title: "Theme & Display",
    description: "UI customization for better UX",
    options: [
      { label: "Theme", type: "select", name: "theme", choices: ["Light", "Dark"] },
      { label: "Font size", type: "select", name: "fontSize", choices: ["Small", "Medium", "Large"] },
    ],
  },
  {
    title: "Language",
    description: "Multilingual support",
    options: [
      { label: "Language", type: "select", name: "language", choices: ["English", "Spanish", "French", "German"] },
    ],
  },
  {
    title: "Inventory Settings",
    description: "Defaults for faster data entry",
    options: [
      { label: "Default reorder level", type: "number", name: "reorderLevel" },
      { label: "Default supplier", type: "text", name: "defaultSupplier" },
      { label: "Currency format", type: "text", name: "currencyFormat" },
    ],
  },
  {
    title: "Integration Settings",
    description: "Connect with other apps or automate workflows",
    options: [
      { label: "Connect to external APIs", type: "text", name: "externalAPIs" },
      { label: "Webhooks", type: "text", name: "webhooks" },
    ],
  },
  {
    title: "Data & Privacy",
    description: "Control over user data",
    options: [
      { label: "Export data", type: "button", action: () => alert("Exporting data...") },
      {
        label: "Delete account",
        type: "button",
        action: () => window.confirm("Are you sure? This action is irreversible!") && alert("Account deleted."),
        className: "text-red-600",
      },
    ],
  },
];

export default function Settings() {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const [saved, setSaved] = useState(false);

  // Load saved settings
  useEffect(() => {
    const stored = localStorage.getItem("settings");
    if (stored) setFormData(JSON.parse(stored));
  }, []);

  function toggleIndex(i) {
    setOpenIndex(openIndex === i ? null : i);
  }

  function handleChange(e) {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setSaved(false);
  }

  function handleSave() {
    localStorage.setItem("settings", JSON.stringify(formData));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {categories.map((cat, i) => (
        <div key={cat.title} className="border rounded mb-4 overflow-hidden">
          <button
            onClick={() => toggleIndex(i)}
            className="w-full bg-gray-100 px-4 py-3 text-left flex justify-between items-center font-semibold"
          >
            {cat.title}
            <span>{openIndex === i ? "−" : "+"}</span>
          </button>

          {openIndex === i && (
            <div className="p-4 bg-white space-y-4">
              <p className="text-gray-600">{cat.description}</p>

              {cat.options.map((opt, idx) => {
                if (opt.type === "button")
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={opt.action}
                      className={`px-3 py-2 rounded ${
                        opt.className || "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
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
                        className="mt-1 block w-full border rounded px-2 py-1"
                      >
                        {opt.choices.map((c) => (
                          <option key={c} value={c}>{c}</option>
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
                      placeholder={opt.placeholder}
                      className="mt-1 block w-full border rounded px-2 py-1"
                    />
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleSave}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Save Changes
      </button>

      {saved && <p className="text-green-600 mt-2">✓ Settings saved successfully</p>}
    </div>
  );
}
