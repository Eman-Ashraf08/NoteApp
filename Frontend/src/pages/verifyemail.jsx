import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmailVerification = ({ user, setCurrentPage }) => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [verificationError, setVerificationError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const verificationInputRefs = useRef([]);
  const navigate = useNavigate(); // <-- Initialize navigation

  // Countdown for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerificationCodeChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Move to next input if digit entered
    if (value && index < 5) {
      verificationInputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerificationKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      verificationInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyEmail = () => {
    setIsVerifying(true);
    setVerificationError("");

    const code = verificationCode.join("");

    // Simulate async verification
    setTimeout(() => {
      setIsVerifying(false);
      if (code === "123456") {
        // Navigate to login page if verification is successful
        navigate("/login");
      } else {
        setVerificationError("Invalid verification code.");
      }
    }, 1500);
  };

  const handleResendCode = () => {
    setResendCooldown(30); // 30 second cooldown
    alert("Verification code resent!");
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
            <p className="text-gray-600 mb-2">We've sent a 6-digit verification code to</p>
            <p className="font-medium text-gray-900">{user?.email}</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Enter verification code
              </label>
              <div className="flex justify-center space-x-3">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (verificationInputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleVerificationCodeChange(index, e.target.value)
                    }
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
              className={`w-full px-4 py-3 font-medium rounded-lg cursor-pointer transition-colors ${
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

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm mb-3">Didn't receive the code?</p>
            <button
              onClick={handleResendCode}
              disabled={resendCooldown > 0}
              className={`text-sm font-medium cursor-pointer transition-colors ${
                resendCooldown > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-green-600 hover:text-green-700"
              }`}
            >
              {resendCooldown > 0
                ? `Resend code in ${resendCooldown}s`
                : "Resend verification code"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <Link to="/register">
              <button
                onClick={() => {
                  setCurrentPage("register");
                  setVerificationCode(["", "", "", "", "", ""]);
                  setVerificationError("");
                }}
                className="text-gray-500 hover:text-gray-700 text-sm cursor-pointer"
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
