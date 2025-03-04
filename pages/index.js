import { useState } from "react";

export default function Home() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [status, setStatus] = useState("");

    const makeCall = async () => {
        setStatus("📞 कॉलिंग... कृपया प्रतीक्षा करें!");

        const response = await fetch("/api/make-call", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recipient: phoneNumber }),
        });

        const data = await response.json();

        if (data.success) {
            setStatus(`✅ कॉल सफलतापूर्वक हो गई! कॉल ID: ${data.callSid}`);
        } else {
            setStatus(`❌ त्रुटि: ${data.error}`);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>📞 AI कॉल बॉट हिंदी में</h1>
            <p>कृपया फोन नंबर दर्ज करें और कॉल करें।</p>
            <input
                type="tel"
                placeholder="फोन नंबर दर्ज करें"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    marginRight: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                }}
            />
            <button
                onClick={makeCall}
                style={{
                    padding: "10px 15px",
                    fontSize: "16px",
                    backgroundColor: "#0070f3",
                    color: "white",
                    borderRadius: "5px",
                    cursor: "pointer",
                    border: "none",
                }}
            >
                📲 कॉल करें
            </button>
            <p style={{ marginTop: "20px", fontWeight: "bold" }}>{status}</p>
        </div>
    );
}
