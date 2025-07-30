import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [verificationError, setVerificationError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const verificationInputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Email from navigation state OR localStorage fallback (refresh safe)
  const userEmail = location?.state?.email || localStorage.getItem("verify_email") || "";

  useEffect(() => {
    // Agar email hi na ho to wapas registration par
    if (!userEmail) {
      navigate("/register");
    }
  }, [userEmail, navigate]);

  const handleVerificationCodeChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    if (value && index < 5) {
      verificationInputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerificationKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      verificationInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyEmail = async () => {
    setIsVerifying(true);
    setVerificationError("");

    const code = verificationCode.join("");

    try {
      // Backend yahan email + code expect karta hai (Postman jaisa)
      const res = await fetch("http://localhost:8000/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, code }),
      });

      const text = await res.text();
      let data = {};
      try { data = text ? JSON.parse(text) : {}; } catch {}

      if (!res.ok) {
        setVerificationError(data.message || "Invalid verification code.");
        return;
      }

      // Verification success
      localStorage.removeItem("verify_email");
      navigate("/login");

    } catch (error) {
      setVerificationError("Something went wrong. Try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-envelope-open-text text-3xl text-green-600"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Verify Your Email</h2>
            <p className="text-gray-600 mb-2">Enter the 6-digit code sent to</p>
            <p className="font-medium text-gray-900">{userEmail}</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Verification Code
              </label>
              <div className="flex justify-center space-x-3">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (verificationInputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleVerificationKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                ))}
              </div>
              {verificationError && (
                <p className="mt-3 text-sm text-red-600 text-center">
                  {verificationError}
                </p>
              )}
            </div>

            <button
              onClick={handleVerifyEmail}
              disabled={isVerifying || verificationCode.join("").length !== 6}
              className={`w-full px-4 py-3 font-medium rounded-lg transition-colors ${
                isVerifying || verificationCode.join("").length !== 6
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isVerifying ? (
                <div className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Verifying...
                </div>
              ) : (
                "Verify Email"
              )}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <Link to="/register">
              <button
                onClick={() => {
                  setVerificationCode(["", "", "", "", "", ""]);
                  setVerificationError("");
                }}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Change email address
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
