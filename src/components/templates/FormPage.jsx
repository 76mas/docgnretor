import "./form.module.css"
import { useLocation } from "react-router-dom";
import { useState } from "react";



export default function FormPage() {
  const location = useLocation();
  const template = location.state?.template;

  // استخراج الحقول من أول صفحة
  const [fields, setFields] = useState(template.pages[0].fields);

  // تحديث قيمة حقل
  const handleChange = (id, newValue) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, value: newValue } : field
      )
    );
  };

  return (

    <div className="perant">
    <div className="form-page-container">
      <h2 className="form-title">املأ الحقول التالية:</h2>

      {fields.map((field) => (
        <div key={field.id} className="form-field-group">
          <label className="form-label">{field.name}</label>
          <input
            className="form-input"
            type={field.type || "text"}
            value={field.value}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        </div>
      ))}

      <button
        className="form-submit-btn"
        onClick={() => {
          console.log("البيانات:", fields);
          // تقدر ترسلها للباك إند هنا
        }}
      >
        إرسال البيانات
      </button>
    </div>
    </div>
  );
}

