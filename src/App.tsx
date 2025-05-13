import AgreementForm from "./components/AgreementForm";
import DeclarationForm from "./components/DeclarationForm";
import EnrolmentForm from "./components/EnrolmentForm";
import HealthForm from "./components/HealthForm";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

function App() {
  const [currentForm, setCurrentForm] = useState(0);

  const forms = [
    <EnrolmentForm key="enrolment" />,
    <DeclarationForm key="declaration" />,
    <AgreementForm key="agreement" />,
    <HealthForm key="health" />,
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentForm === forms.length - 1) {
      handleSubmit();
    } else {
      setCurrentForm((prev) => (prev < forms.length - 1 ? prev + 1 : prev));
    }
  };

  const handleBack = () => {
    setCurrentForm((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleSubmit = () => {
    console.log("Form submission complete.");
    // Implement your final submission logic here
    alert("Form submitted successfully!");
  };

  return (
    <div className="container mx-auto px-3 mt-3">
      <form onSubmit={handleNext}>
        {forms[currentForm]}
        <div className="mt-3">
          {/* Next/Submit Button - Full Width */}
          <div className="mb-2">
            <button type="submit" className="btn btn-primary w-100">
              {currentForm < forms.length - 1 ? "Next" : "Submit"}
            </button>
          </div>

          {/* Back Button - Full Width */}
          {currentForm > 0 && (
            <div>
              <button type="button" className="btn btn-secondary w-100 mb-4" onClick={handleBack}>
                Back
              </button>
            </div>
          )}
        </div>

      </form>
    </div>
  );
}

export default App;
