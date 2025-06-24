import "./form.module.css"
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";



export default function FormPage() {
  const location = useLocation();
  const template = location.state?.template;

  // استخراج الحقول من أول صفحة
  const [fields, setFields] = useState(template.pages[0].fields);

    

    const fildInfo=fields.map((field)=>{
      return {nameofbox:field.name ,valueofbox:field.value}
    })
console.log(fildInfo , "new arry")
  // تحديث قيمة حقل
  const handleChange = (id, newValue) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, value: newValue } : field
      )
    );
  };

const handelFetch = async () => {
  try {
    const response = await axios.post("http://localhost:3000/api/submit", {
      valueofboxs: fildInfo,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("تم الإرسال بنجاح:", response.data);
    // ممكن تخلي تنبيه أو تنقله لصفحة ثانية حسب الحاجة
  } catch (error) {
    console.error("فشل الإرسال:", error);
    // ممكن تعرض رسالة خطأ للمستخدم
  }
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
          handelFetch();
        
          // تقدر ترسلها للباك إند هنا
        }}
      >
        إرسال البيانات
      </button>
    </div>
    </div>
  );
}

