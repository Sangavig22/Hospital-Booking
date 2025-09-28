const defaultSlots = ["09:00 am", "10:00 am", "11:00 am", "12:00 pm", "02:00 pm", "04:00 pm"];
let doctorDetails = [
  {
    id: 1,
    name: "Dr. Samantha Perera",
    specialty: "General Medicine",
    qualification: "MBBS - General Physician",
    experience: 8,
    photo: "id 1.jpeg",
    about: "Dr. Samantha Perera is committed to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    appointmentFee: 50,
    bookingDates: {
      "01 Mon": ["05:00 pm", "06:00 pm", "06:30 pm"],
      "02 Tue": ["07:00 pm", "07:30 pm", "08:00 pm"],
      "03 Wed": ["08:00 pm", "06:00 pm", "06:30 pm"],
      "04 Thu": ["11:00 pm", "06:00 pm", "06:30 pm"],
      "05 Fri": ["01:00 pm", "06:00 pm", "06:30 pm"]
    }
  },
  {
    id: 2,
    name: "Dr. Rajesh Jayawardene",
    specialty: "Dermatology",
    qualification: "MD - Dermatology",
    experience: 12,
    photo: "id 2.jpg",
    about: "Dr. Rajesh specializes in skin care, cosmetic dermatology, and treating chronic skin conditions using modern techniques.",
    appointmentFee: 60,
    bookingDates: {
      "01 Mon": ["10:00 am", "11:00 am"],
      "02 Tue": ["02:00 pm", "03:00 pm", "04:00 pm"],
      "03 Wed": ["09:00 am", "10:00 am"],
      "04 Thu": ["01:00 pm", "03:00 pm"],
      "05 Fri": ["11:00 am", "12:00 pm"]
    }
  },
  {
    id: 3,
    name: "Dr. Priya Fernando",
    specialty: "Pediatrics",
    qualification: "MD - Pediatrics",
    experience: 10,
    photo: "id 3.jpeg",
    about: "Dr. Priya is dedicated to children’s health, preventive care, and developmental guidance for infants and young children.",
    appointmentFee: 55,
    bookingDates: {
      "01 Mon": ["09:30 am", "11:30 am"],
      "02 Tue": ["01:30 pm", "03:30 pm"],
      "03 Wed": ["05:30 pm"],
      "04 Thu": ["10:00 am", "12:00 pm"],
      "05 Fri": ["02:00 pm", "04:00 pm"]
    }
  },
  {
    id: 4,
    name: "Dr. Rohan Silva",
    specialty: "Cardiology",
    qualification: "MD - Cardiology",
    experience: 15,
    photo: "id 4.jpeg",
    about: "Dr. Rohan specializes in treating heart conditions, preventive cardiology, and holistic cardiac care.",
    appointmentFee: 80,
    bookingDates: {
      "01 Mon": ["08:30 am", "09:30 am", "10:30 am"],
      "02 Tue": ["01:00 pm", "03:00 pm"],
      "03 Wed": ["09:00 am", "10:00 am"],
      "04 Thu": ["11:00 am", "12:00 pm"],
      "05 Fri": ["02:00 pm", "04:00 pm"]
    }
  },
  {
    id: 5,
    name: "Dr. Nuwan Gunawardena",
    specialty: "Orthopedics",
    qualification: "MS - Orthopedics",
    experience: 11,
    photo: "id 1.jpeg",
    about: "Dr. Nuwan focuses on bone, joint, and spine disorders with both surgical and non-surgical treatments.",
    appointmentFee: 65,
    bookingDates: {
      "01 Mon": ["09:00 am", "10:30 am", "12:00 pm"],
      "02 Tue": ["02:00 pm", "04:00 pm"],
      "03 Wed": ["01:00 pm", "03:00 pm"],
      "04 Thu": ["09:00 am", "10:00 am"],
      "05 Fri": ["11:00 am", "12:00 pm"]
    }
  },
  {
    id: 6,
    name: "Dr. Kavitha Mendis",
    specialty: "Gynecology",
    qualification: "MD - Gynecology",
    experience: 14,
    photo: "id 2.jpg",
    about: "Dr. Kavitha specializes in women’s health, prenatal and postnatal care, and gynecological surgeries.",
    appointmentFee: 70,
    bookingDates: {
      "01 Mon": ["10:00 am", "12:00 pm"],
      "02 Tue": ["03:00 pm", "05:00 pm"],
      "03 Wed": ["09:00 am", "10:00 am"],
      "04 Thu": ["01:00 pm", "03:00 pm"],
      "05 Fri": ["11:00 am", "12:00 pm"]
    }
  },
  {
    id: 7,
    name: "Dr. Michael Fernando",
    specialty: "Neurology",
    qualification: "MD - Neurology",
    experience: 13,
    photo: "id 3.jpeg",
    about: "Dr. Michael treats neurological disorders including epilepsy, stroke, and migraines with advanced therapies.",
    appointmentFee: 85,
    bookingDates: {
      "01 Mon": ["08:00 am", "09:30 am"],
      "02 Tue": ["11:00 am", "02:00 pm", "03:30 pm"],
      "03 Wed": ["09:00 am", "10:00 am"],
      "04 Thu": ["01:00 pm", "03:00 pm"],
      "05 Fri": ["11:00 am", "12:00 pm"]
    }
  },
  {
    id: 8,
    name: "Dr. Ayesha Jayasuriya",
    specialty: "Gastroenterology",
    qualification: "MD - Gastroenterology",
    experience: 9,
    photo: "id 4.jpeg",
    about: "Dr. Ayesha specializes in digestive system disorders, liver diseases, and preventive gastroenterology.",
    appointmentFee: 75,
    bookingDates: {
      "01 Mon": ["09:00 am", "10:30 am"],
      "02 Tue": ["01:00 pm", "03:00 pm"],
      "03 Wed": ["09:00 am", "10:00 am"],
      "04 Thu": ["01:00 pm", "03:00 pm"],
      "05 Fri": ["11:00 am", "12:00 pm"]
    }
  },
  {
    id: 9,
    name: "Dr. Sunil Perera",
    specialty: "Endocrinology",
    qualification: "MD - Endocrinology",
    experience: 16,
    photo: "id 1.jpeg",
    about: "Dr. Sunil manages diabetes, thyroid, and other hormonal disorders with patient-focused treatments.",
    appointmentFee: 90,
    bookingDates: {
      "01 Mon": ["08:30 am", "09:30 am", "11:00 am"],
      "02 Tue": ["01:00 pm", "02:30 pm"],
      "03 Wed": ["09:00 am", "10:00 am"],
      "04 Thu": ["01:00 pm", "03:00 pm"],
      "05 Fri": ["11:00 am", "12:00 pm"]
    }
  },
  {
    id: 10,
    name: "Dr. Nadeesha Silva",
    specialty: "Rheumatology",
    qualification: "MD - Rheumatology",
    experience: 10,
    photo: "id 2.jpg",
    about: "Dr. Nadeesha is an expert in arthritis, autoimmune disorders, and musculoskeletal diseases.",
    appointmentFee: 65,
    bookingDates: {
      "01 Mon": ["10:00 am", "11:30 am"],
      "02 Tue": ["01:00 pm", "03:00 pm", "04:30 pm"],
      "03 Wed": ["09:00 am", "10:00 am"],
      "04 Thu": ["01:00 pm", "03:00 pm"],
      "05 Fri": ["11:00 am", "12:00 pm"]
    }
  },
  {
    id: 11,
    name: "Dr. Harsha Weerasinghe",
    specialty: "Pulmonology",
    qualification: "MD - Pulmonology",
    experience: 12,
    photo: "id 3.jpeg",
    about: "Dr. Harsha specializes in treating lung and respiratory diseases including asthma and COPD.",
    appointmentFee: 70,
    bookingDates: {
      "01 Mon": ["09:00 am", "10:30 am"],
      "02 Tue": ["12:00 pm", "02:00 pm", "04:00 pm"],
      "03 Wed": ["09:00 am", "10:00 am"],
      "04 Thu": ["01:00 pm", "03:00 pm"],
      "05 Fri": ["11:00 am", "12:00 pm"]
    }
  },
  {
    id: 12,
    name: "Dr. Ishara Dissanayake",
    specialty: "Nephrology",
    qualification: "MD - Nephrology",
    experience: 14,
    photo: "id 4.jpeg",
    about: "Dr. Ishara focuses on kidney diseases, dialysis care, and kidney transplantation.",
    appointmentFee: 85,
    bookingDates: {
      "01 Mon": ["08:30 am", "09:30 am"],
      "02 Tue": ["11:00 am", "01:00 pm", "03:00 pm"],
      "03 Wed": ["09:00 am", "10:00 am"],
      "04 Thu": ["01:00 pm", "03:00 pm"],
      "05 Fri": ["11:00 am", "12:00 pm"]
    }
  },
  {
    id: 13,
    name: "Dr. Chamara Gunasekara",
    specialty: "Urology",
    qualification: "MS - Urology",
    experience: 11,
    photo: "id 1.jpeg",
    about: "Dr. Chamara specializes in urinary tract and male reproductive health, offering surgical and non-surgical treatments.",
    appointmentFee: 75,
    bookingDates: {
      "01 Mon": ["09:00 am", "10:30 am"],
      "02 Tue": ["12:00 pm", "02:00 pm", "04:00 pm"],
      "03 Wed": ["09:00 am", "10:00 am"],
      "04 Thu": ["01:00 pm", "03:00 pm"],
      "05 Fri": ["11:00 am", "12:00 pm"]
    }
  },
  {
    id: 14,
    name: "Dr. Malini Jayawardena",
    specialty: "Ophthalmology",
    qualification: "MS - Ophthalmology",
    experience: 9,
    photo: "id 2.jpg",
    about: "Dr. Malini provides treatments for vision problems, cataracts, and advanced eye care.",
    appointmentFee: 55,
    bookingDates: {
      "01 Mon": ["08:30 am", "10:00 am", "11:30 am"],
      "02 Tue": ["01:30 pm", "03:00 pm"],
      "03 Wed": ["09:00 am", "10:00 am"],
      "04 Thu": ["01:00 pm", "03:00 pm"],
      "05 Fri": ["11:00 am", "12:00 pm"]
    }
  },
  {
    id: 15,
    name: "Dr. Suresh Pathirana",
    specialty: "ENT",
    qualification: "MS - ENT",
    experience: 10,
    photo: "id 3.jpeg",
    about: "Dr. Suresh specializes in ear, nose, and throat treatments with both medical and surgical expertise.",
    appointmentFee: 60,
    bookingDates: {
      "01 Mon": ["09:00 am", "10:30 am"],
      "02 Tue": ["12:00 pm", "02:00 pm", "04:00 pm"],
      "03 Wed": ["09:00 am", "10:00 am"],
      "04 Thu": ["01:00 pm", "03:00 pm"],
      "05 Fri": ["11:00 am", "12:00 pm"]
    }
  }
];

// Ensure all doctors have a bookingSlots array


export default doctorDetails;
