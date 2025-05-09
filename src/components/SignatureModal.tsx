import { useRef, useState, useEffect } from "react";
import SignaturePad from "react-signature-canvas";

interface SignatureModalProps {
    onClose: () => void;
}

const SignatureModal: React.FC<SignatureModalProps> = ({ onClose }) => {
    const sigPad = useRef<SignaturePad | null>(null);
    const [name, setName] = useState<string>("");
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isConfirmEnabled, setIsConfirmEnabled] = useState<boolean>(false);
    const [savedSignature, setSavedSignature] = useState<{ signatureData: string; name: string; date: string } | null>(null);

    // Load existing signature from localStorage on mount
    useEffect(() => {
        const storedSignature = localStorage.getItem("signature");
        if (storedSignature) {
            const parsedSignature = JSON.parse(storedSignature);
            setSavedSignature(parsedSignature);
            setName(parsedSignature.name);
        }
    }, []);

    // Enable Confirm button only when checkbox is checked, input is filled, and signature is present
    useEffect(() => {
        setIsConfirmEnabled(
            isChecked && name.trim() !== "" && sigPad.current !== null && !sigPad.current.isEmpty()
        );
    }, [isChecked, name]);

    const handleConfirm = () => {
        if (sigPad.current && !sigPad.current.isEmpty() && name.trim()) {
            const signatureData = sigPad.current.toDataURL();
            const signatureInfo = {
                signatureData,
                name,
                date: new Date().toLocaleString(),
            };

            // Save to localStorage
            localStorage.setItem("signature", JSON.stringify(signatureInfo));
            setSavedSignature(signatureInfo);
            onClose();
        } else {
            alert("Please provide a signature and enter your name.");
        }
    };

    const clearSignature = () => {
        sigPad.current?.clear();
        setName("");
        setIsChecked(false);
        setSavedSignature(null);
        localStorage.removeItem("signature");
    };

    return (
        <>
            {/* Overlay */}
            <div 
                className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" 
                style={{ backdropFilter: "blur(5px)", zIndex: 1040 }}
            ></div>
    
            <div 
                className="modal d-block" 
                tabIndex={-1} 
                style={{ zIndex: 1050 }}
            >
                <div 
                    className="modal-dialog modal-lg" 
                    style={{ maxWidth: "800px" }}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Signature</h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>
    
                        <div className="modal-body">
                            <div className="alert alert-warning mb-3">
                                <p>Please draw your signature in the box below.</p>
                                <p>
                                    A touch screen device is recommended for on-screen signatures, however, you may
                                    also sign using your mouse.
                                </p>
                                <p>
                                    Providing invalid, inaccurate, or incomplete signatures will require you to review and sign this form again.
                                </p>
                            </div>
    
                            {/* Signature Pad */}
                            <div 
                                className="border mb-3" 
                                style={{ width: "100%", height: "250px", overflow: "hidden" }}
                            >
                                <SignaturePad
                                    ref={sigPad}
                                    canvasProps={{
                                        width: 750,
                                        height: 250,
                                        style: { width: "100%", height: "100%" },
                                    }}
                                />
                            </div>
    
                            {/* Checkbox and Input */}
                            <div className="d-flex align-items-center mb-3">
                                <input
                                    type="checkbox"
                                    id="acknowledge"
                                    checked={isChecked}
                                    onChange={() => setIsChecked(!isChecked)}
                                    className="me-2"
                                />
                                <label htmlFor="acknowledge" className="form-check-label">
                                    I, 
                                    <input
                                        type="text"
                                        className="form-control d-inline-block ms-2 me-2"
                                        placeholder="Your name"
                                        style={{ width: "150px" }}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    acknowledge that the signature I have drawn above is an accurate representation of my signature and constitutes an electronic signature for the purpose of the <a href="https://www.legislation.govt.nz/act/public/2017/0005/latest/whole.html" target="_blank" rel="noopener noreferrer">Contracts and Commercial Law Act (2017)</a>.
                                </label>
                            </div>
    
                     
                        </div>
    
                        <div className="modal-footer">
                            <button className="btn btn-secondary me-2" onClick={clearSignature}>
                                Clear
                            </button>
                            <button 
                                className="btn btn-primary" 
                                onClick={handleConfirm} 
                                disabled={!isConfirmEnabled}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
};

export default SignatureModal;
